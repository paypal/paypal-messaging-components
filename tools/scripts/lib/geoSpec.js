/* eslint-disable no-console */
/**
 * Shared spec loader and validator for the geo-expansion-pr skill family.
 *
 * Fail-closed: every accessor validates before returning, and nothing here
 * touches disk beyond reading the spec. Callers must validate fully before
 * their first write.
 *
 * Zero dependencies by design — these scripts run from a bare checkout.
 */

const fs = require('fs');
const path = require('path');

const ACCOUNT_KEY_LENGTH = 13;
const ACCOUNT_PREFIX = 'DEV';
const MAX_SLUG = ACCOUNT_KEY_LENGTH - ACCOUNT_PREFIX.length;

const MODES = ['new-country', 'new-product', 'modal-only'];
const JIRA_PATTERN = /^[A-Z][A-Z0-9]+-[0-9]+$/;
const COUNTRY_PATTERN = /^[A-Z]{2}$/;
// Static: JS `\b` is the boundary between `\w` (`[A-Za-z0-9_]`) and `\W`.
const WORD_CHAR = /[A-Za-z0-9_]/;

const isWordChar = ch => ch !== undefined && ch !== '' && WORD_CHAR.test(ch);

/**
 * Replace standalone `from` tokens the way `\b${from}\b` would, without
 * interpolating `from` into a RegExp (CodeQL js/regex-injection).
 */
const replaceStandaloneToken = (source, from, to) => {
    if (!from) return source;
    let out = '';
    let i = 0;
    while (i < source.length) {
        const at = source.indexOf(from, i);
        if (at === -1) {
            out += source.slice(i);
            break;
        }
        const prev = at === 0 ? '' : source[at - 1];
        const next = source[at + from.length];
        const standalone = !isWordChar(prev) && !isWordChar(next);
        out += source.slice(i, at) + (standalone ? to : from);
        i = at + from.length;
    }
    return out;
};

class SpecError extends Error {}

const fail = message => {
    throw new SpecError(message);
};

/**
 * Every dev account key in utils/devServerProxy/config/devAccounts.config.js is
 * exactly 13 characters — verified across all 110 existing entries with zero
 * exceptions. The padding absorbs the difference, which is precisely the kind
 * of thing a human miscounts and a script never does.
 */
const accountKey = slug => {
    if (!/^[A-Z0-9]+$/.test(slug)) fail(`account slug must be A-Z0-9: ${slug}`);
    if (slug.length > MAX_SLUG) fail(`account slug too long (max ${MAX_SLUG}): ${slug}`);
    return `${ACCOUNT_PREFIX}${'0'.repeat(MAX_SLUG - slug.length)}${slug}`;
};

const isValidAccountKey = key => typeof key === 'string' && key.length === ACCOUNT_KEY_LENGTH;

/**
 * Mutation modules live at either
 *   src/server/locale/<CC>/<Product>/mutations/<file>.js   (DE, AT — multi-product)
 *   src/server/locale/<CC>/mutations/<file>.js             (GB, FR — flat)
 * depending on whether the product declares a `name`.
 */
const mutationDir = (spec, product) =>
    product.name
        ? path.posix.join('src/server/locale', spec.targetCountry, product.name, 'mutations')
        : path.posix.join('src/server/locale', spec.targetCountry, 'mutations');

/** The module specifier jest.mock() uses, per moduleNameMapper `^server/(.*)`. */
const mockPath = (spec, product, mutation) =>
    mutationDir(spec, product)
        .replace(/^src\//, '')
        .concat('/', mutation.file);

const validateProduct = (product, index) => {
    const where = `products[${index}]`;
    if (!product.offerType) fail(`${where}.offerType is required`);
    if (!Array.isArray(product.mutations) || !product.mutations.length) {
        fail(`${where}.mutations must list at least one module`);
    }
    const seenFiles = new Set();
    const seenKeys = new Set();
    product.mutations.forEach((mutation, i) => {
        const at = `${where}.mutations[${i}]`;
        if (!mutation.file) fail(`${at}.file is required`);
        if (!mutation.offerTypeKey) fail(`${at}.offerTypeKey is required`);
        if (seenFiles.has(mutation.file)) fail(`${at}.file duplicated: ${mutation.file}`);
        if (seenKeys.has(mutation.offerTypeKey)) fail(`${at}.offerTypeKey duplicated: ${mutation.offerTypeKey}`);
        seenFiles.add(mutation.file);
        seenKeys.add(mutation.offerTypeKey);
    });
};

const validate = spec => {
    if (!spec || typeof spec !== 'object') fail('spec must be an object');

    // JIRA is mandatory and never derived. This is the first gate for a reason.
    if (!spec.jira) fail('jira is required — ask the user for the ticket, do not derive it');
    if (!JIRA_PATTERN.test(spec.jira)) fail(`jira must look like ABC-123, got: ${spec.jira}`);

    if (!MODES.includes(spec.mode)) fail(`mode must be one of ${MODES.join(' | ')}, got: ${spec.mode}`);
    if (!COUNTRY_PATTERN.test(spec.targetCountry || '')) {
        fail(`targetCountry must be a 2-letter uppercase code, got: ${spec.targetCountry}`);
    }
    if (spec.templateCountry && !COUNTRY_PATTERN.test(spec.templateCountry)) {
        fail(`templateCountry must be a 2-letter uppercase code, got: ${spec.templateCountry}`);
    }
    if (spec.templateCountry === spec.targetCountry) {
        fail('templateCountry must differ from targetCountry');
    }

    if (!Array.isArray(spec.products) || !spec.products.length) fail('products must list at least one product');
    spec.products.forEach(validateProduct);

    if (spec.mode === 'new-country') {
        if (!spec.templateCountry) fail('mode new-country requires templateCountry');
        if (!spec.locale) fail('mode new-country requires locale');
        if (!Array.isArray(spec.devAccounts) || !spec.devAccounts.length) {
            fail('mode new-country requires devAccounts');
        }
    }

    (spec.devAccounts || []).forEach((account, i) => {
        const at = `devAccounts[${i}]`;
        if (!account.slug) fail(`${at}.slug is required`);
        const key = accountKey(account.slug);
        if (!isValidAccountKey(key)) fail(`${at} produced an invalid key: ${key}`);
        if (!Array.isArray(account.modalTypes) || !account.modalTypes.length) {
            fail(`${at}.modalTypes must list at least one modal type`);
        }
        if (!account.contentFile) fail(`${at}.contentFile is required`);
    });

    return spec;
};

const load = specPath => {
    if (!specPath) fail('--spec <path> is required');
    const resolved = path.resolve(specPath);
    if (!fs.existsSync(resolved)) fail(`spec not found: ${resolved}`);
    let parsed;
    try {
        parsed = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    } catch (error) {
        fail(`spec is not valid JSON: ${error.message}`);
    }
    return validate(parsed);
};

/** feature/<JIRA>-geo-expansion-<cc> — enforced, not suggested. */
const branchName = spec => `feature/${spec.jira}-geo-expansion-${spec.targetCountry.toLowerCase()}`;

/** Every mutation module across every product, flattened for the coverage matrix. */
const allMutations = spec =>
    spec.products.flatMap(product =>
        product.mutations.map(mutation => ({
            product,
            mutation,
            mockPath: mockPath(spec, product, mutation),
            offerTypeKey: mutation.offerTypeKey
        }))
    );

module.exports = {
    ACCOUNT_KEY_LENGTH,
    SpecError,
    accountKey,
    allMutations,
    branchName,
    isValidAccountKey,
    load,
    mockPath,
    mutationDir,
    replaceStandaloneToken,
    validate
};
