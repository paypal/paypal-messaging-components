#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * SOURCE mutator for the geo-expansion-pr skill family.
 *
 * Covers the three mechanical layers of a geo-expansion. The two judgment-heavy
 * layers are deliberately NOT here — content copy comes from the PRD/Figma via
 * the LLM, and shared modal UI is cross-market and handed to a human.
 *
 *   layer 2  clone src/server/locale/<TEMPLATE>/** -> <TARGET>/**, substituting
 *            the country token (44 files for AT; 27 were byte-identical to DE
 *            after substitution, so the clone is real work a script does exactly)
 *   layer 3  register in src/server/locale/index.js — import + switch case,
 *            mirroring the TEMPLATE's call signature rather than assuming one
 *   layer 4  dev accounts in utils/devServerProxy/config/, keys generated to the
 *            13-character rule
 *
 *   node tools/scripts/apply-geo-source.js --spec <path> [--dry-run]
 *
 * Never writes a *.test.js / *.spec.js / __tests__ path — asserted before every
 * write, not merely intended. Exits 0 on success or no-op, 2 on validation or
 * anchor failure.
 */

const fs = require('fs');
const path = require('path');
const geoSpec = require('./lib/geoSpec');

const LOCALE_INDEX = 'src/server/locale/index.js';
const DEV_ACCOUNTS = 'utils/devServerProxy/config/devAccounts.config.js';

const argv = process.argv.slice(2);
const flag = name => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? undefined : argv[i + 1];
};
const isDryRun = argv.includes('--dry-run');

const die = (message, code = 2) => {
    console.error(`ERROR=${message}`);
    process.exit(code);
};

const repoRoot = process.cwd();
const planned = [];

/** Scope filter, enforced rather than assumed: the source skill never authors tests. */
const TEST_PATH = /(\.test\.|\.spec\.|__tests__|__snapshots__|^tests\/)/;

const plan = (relPath, contents, note) => {
    if (TEST_PATH.test(relPath)) die(`refusing to write a test path from the source skill: ${relPath}`);
    planned.push({ relPath, contents, note });
};

const commit = () => {
    planned.forEach(item => {
        const abs = path.join(repoRoot, item.relPath);
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, item.contents);
    });
};

// -------------------------------------------------------- layer 2: locale tree

const walk = dir =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });

/**
 * Substitute the country token everywhere it appears as a standalone word —
 * 'DE' -> 'AT', 'NON-DE' -> 'NON-AT', locale--de -> locale--at. Word-boundary
 * anchored so DEFAULT and DEV are never touched. Implemented without building a
 * RegExp from the country code (js/regex-injection).
 */
const substituteCountry = (source, from, to) =>
    geoSpec.replaceStandaloneToken(
        geoSpec.replaceStandaloneToken(source, from, to),
        from.toLowerCase(),
        to.toLowerCase()
    );

const cloneLocaleTree = spec => {
    const fromDir = path.join(repoRoot, 'src/server/locale', spec.templateCountry);
    if (!fs.existsSync(fromDir)) die(`template locale tree not found: ${path.relative(repoRoot, fromDir)}`);

    const files = walk(fromDir);
    const results = files.map(file => {
        const rel = path.relative(fromDir, file);
        const destRel = path.posix.join(
            'src/server/locale',
            spec.targetCountry,
            rel
                .split(path.sep)
                .map(part => substituteCountry(part, spec.templateCountry, spec.targetCountry))
                .join('/')
        );
        const dest = path.join(repoRoot, destRel);
        const body = substituteCountry(fs.readFileSync(file, 'utf8'), spec.templateCountry, spec.targetCountry);
        const exists = fs.existsSync(dest);
        // Idempotency at file granularity: never clobber a file a human has since edited.
        if (!exists) plan(destRel, body, 'clone');
        return { destRel, exists, localized: /['"][^'"]*[a-zäöüßàéè][^'"]{12,}['"]/i.test(body) };
    });

    return results;
};

// ------------------------------------------------------ layer 3: registration

const importLine = cc => `import ${cc} from './${cc}';`;

const hasExactLine = (source, line) => source.split('\n').includes(line);

/** Locate `case 'DE':\n            return DE(...);\n` without interpolating the country into a RegExp. */
const findSwitchCase = (source, country) => {
    const needle = `case '${country}':`;
    const lines = source.split('\n');
    let offset = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.endsWith(needle)) {
            const caseIndent = line.slice(0, line.length - needle.length);
            if (/^[ \t]*$/.test(caseIndent)) {
                const next = lines[i + 1];
                const returnMatch = next && next.match(/^([ \t]*)return (.+);$/);
                if (returnMatch && returnMatch[2].startsWith(country)) {
                    return {
                        caseIndent,
                        returnIndent: returnMatch[1],
                        templateReturn: returnMatch[2],
                        blockEnd: offset + line.length + 1 + next.length + 1
                    };
                }
            }
        }
        offset += line.length + 1;
    }
    return null;
};

const registerLocale = spec => {
    const abs = path.join(repoRoot, LOCALE_INDEX);
    if (!fs.existsSync(abs)) die(`${LOCALE_INDEX} not found — run from the repo root`);
    const original = fs.readFileSync(abs, 'utf8');
    const cc = spec.targetCountry;

    const hasImport = hasExactLine(original, importLine(cc));
    const hasCase = original.includes(`case '${cc}':`);
    if (hasImport && hasCase) return { changed: false, source: original };

    // Mirror the template's call signature instead of guessing: DE(offerType),
    // bare GB, CA(language) all coexist in this switch. Capture both indents
    // separately — `case` and `return` sit at different levels.
    const match = findSwitchCase(original, spec.templateCountry);
    if (!match)
        die(`could not read the ${spec.templateCountry} switch case in ${LOCALE_INDEX} to mirror its signature`);

    const { caseIndent, returnIndent, templateReturn } = match;
    if (!templateReturn.startsWith(spec.templateCountry)) {
        die(`unexpected return expression for ${spec.templateCountry} in ${LOCALE_INDEX}`);
    }
    const returnExpr = cc + templateReturn.slice(spec.templateCountry.length);

    let updated = original;
    if (!hasImport) {
        if (!hasExactLine(updated, importLine(spec.templateCountry)))
            die(`could not locate the ${spec.templateCountry} import anchor in ${LOCALE_INDEX}`);
        // Append after the final import so the block stays contiguous.
        // Static regex: [A-Z]{2} is a character class, not CLI input.
        const imports = [...updated.matchAll(/^import .+ from '\.\/[A-Z]{2}';$/gm)];
        const last = imports[imports.length - 1];
        const at = last.index + last[0].length;
        updated = `${updated.slice(0, at)}\nimport ${cc} from './${cc}';${updated.slice(at)}`;
    }
    if (!hasCase) {
        const anchor = findSwitchCase(updated, spec.templateCountry);
        const block = `${caseIndent}case '${cc}':\n${returnIndent}return ${returnExpr};\n`;
        updated = updated.slice(0, anchor.blockEnd) + block + updated.slice(anchor.blockEnd);
    }
    return { changed: true, source: updated };
};

// ------------------------------------------------------- layer 4: dev accounts

/**
 * The on-disk shape is a positional tuple, not an object:
 *   DEV000ATPLEQZ: ['AT', ['long_term'], 'gpl_eqz'],
 * with an optional fourth element naming the v2 content file when it differs.
 */
const devAccountEntry = (spec, account) => {
    const key = geoSpec.accountKey(account.slug);
    const modals = account.modalTypes.map(type => `'${type}'`).join(', ');
    const v2 = account.v2ContentFile ? `, '${account.v2ContentFile}'` : '';
    return { key, line: `    ${key}: ['${spec.targetCountry}', [${modals}], '${account.contentFile}'${v2}],` };
};

const addDevAccounts = spec => {
    const abs = path.join(repoRoot, DEV_ACCOUNTS);
    if (!fs.existsSync(abs)) return { changed: false, added: [], source: null };

    const original = fs.readFileSync(abs, 'utf8');
    const entries = (spec.devAccounts || []).map(account => devAccountEntry(spec, account));
    // Idempotency per key, so a partially-applied file completes rather than duplicates.
    const hasDevKey = (source, key) => source.split('\n').some(line => line.trimStart().startsWith(`${key}:`));
    const missing = entries.filter(entry => !hasDevKey(original, entry.key));
    if (!missing.length) return { changed: false, added: [], source: original };

    // Append inside the default-export object, before its closing brace.
    const close = original.lastIndexOf('};');
    if (close === -1) die(`could not locate the closing brace of the export in ${DEV_ACCOUNTS}`);

    const banner = `    // ${spec.targetCountry}${spec.countryName ? ` - ${spec.countryName}` : ''}\n`;
    const bannerPrefix = `// ${spec.targetCountry}`;
    const hasBanner = original.split('\n').some(line => {
        const trimmed = line.trimStart();
        if (!trimmed.startsWith(bannerPrefix)) return false;
        const after = trimmed.slice(bannerPrefix.length);
        return after.length === 0 || !/[A-Za-z0-9_]/.test(after[0]);
    });

    // This repo formats with trailingComma: none, so the final entry in the
    // object carries no comma. Appending after it therefore has to add one, and
    // the new final entry must not have one. Getting this wrong yields a file
    // that parses nowhere — exactly the fragility that argues for a script.
    const head = original.slice(0, close).replace(/\s*$/, '');
    const lead = /[,{]$/.test(head) ? '' : ',';
    const lines = missing.map(entry => entry.line);
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');

    const block = `${lead}\n\n${hasBanner ? '' : banner}${lines.join('\n')}\n`;
    return { changed: true, added: missing, source: head + block + original.slice(close) };
};

// ---------------------------------------------------------------------- main

let spec;
try {
    spec = geoSpec.load(flag('spec'));
} catch (error) {
    die(error.message);
}

if (spec.mode === 'modal-only') {
    console.log('mode modal-only: no locale tree or registration changes.');
    console.log('Content and dev-server config are authored by the skill; shared modal UI is handed to a human.');
    process.exit(0);
}

const cloned = spec.templateCountry ? cloneLocaleTree(spec) : [];
const registration = registerLocale(spec);
const accounts = addDevAccounts(spec);

if (registration.changed) plan(LOCALE_INDEX, registration.source, 'register');
if (accounts.changed) plan(DEV_ACCOUNTS, accounts.source, 'dev accounts');

const fresh = cloned.filter(file => !file.exists);
const localized = fresh.filter(file => file.localized);

console.log(`spec        : ${spec.jira}  ${spec.templateCountry || '-'} -> ${spec.targetCountry}  (${spec.mode})`);
console.log(`branch      : ${geoSpec.branchName(spec)}`);
console.log(`locale tree : ${fresh.length} new file(s), ${cloned.length - fresh.length} already present`);
console.log(`registration: ${registration.changed ? 'import + switch case to add' : 'already registered'}`);
console.log(
    `dev accounts: ${accounts.added.length} to add, ${
        (spec.devAccounts || []).length - accounts.added.length
    } already present`
);

if (accounts.added.length) {
    console.log('\ndev account keys (all 13 chars, generated — confirm the semantics in the PR body):');
    accounts.added.forEach(entry => console.log(`    ${entry.key}`));
}

if (localized.length) {
    console.log(`\nREVIEW — ${localized.length} cloned file(s) carry ${spec.templateCountry} copy that must be`);
    console.log('replaced with target-market copy from the PRD or Figma. The clone gives you the');
    console.log('structure; it does not give you the language.');
    localized.slice(0, 12).forEach(file => console.log(`    ${file.destRel}`));
    if (localized.length > 12) console.log(`    ... and ${localized.length - 12} more`);
}

if (!planned.length) {
    console.log('\nno-op: everything already applied');
    process.exit(0);
}

if (isDryRun) {
    console.log(`\nDRY RUN — no files written (${planned.length} would be)`);
    process.exit(0);
}

commit();
console.log(`\nOK=${planned.length} file(s) written`);
console.log('devAccountsV2.config.js uses a different shape and is edited by the skill, not this script.');
process.exit(0);
