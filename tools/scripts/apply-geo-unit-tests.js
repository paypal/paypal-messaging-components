#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * UNIT companion for the geo-expansion-pr skill family.
 *
 * Derives the unit coverage for a geo-expansion from the spec and applies it to
 * tests/unit/spec/server/locale/index.test.js. Two edits per mutation module:
 *
 *   jest.mock('server/locale/AT/GPL/mutations/gpl_eqz', () => ({
 *       'layout:text': ['text', 'AT', 'GPL:EQZ'],
 *       'layout:flex': ['flex', 'AT', 'GPL:EQZ']
 *   }));
 *
 * and a row ['AT', 'GPL:EQZ'] in the test.each table. The second element is not
 * a free-form label — the assertion is
 *   expect(getMutations(locale, offerType, 'layout:text')).toEqual(['text', locale, offerType])
 * so it must be a real dispatch key from that product's mutations/index.js.
 *
 *   node tools/scripts/apply-geo-unit-tests.js --spec <path> [--dry-run] [--check]
 *
 * Exits 0 on success or no-op, 1 on a coverage gap under --check, 2 on
 * validation or anchor failure. Touches only the one test file.
 */

const fs = require('fs');
const path = require('path');
const geoSpec = require('./lib/geoSpec');

const TARGET = 'tests/unit/spec/server/locale/index.test.js';
const INDENT = ' '.repeat(4);

const argv = process.argv.slice(2);
const flag = name => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? undefined : argv[i + 1];
};
const has = name => argv.includes(`--${name}`);

const die = (message, code = 2) => {
    console.error(`ERROR=${message}`);
    process.exit(code);
};

const repoRoot = process.cwd();
const targetPath = path.join(repoRoot, TARGET);

// ------------------------------------------------------------------ emitters

const mockBlock = (country, entry) =>
    `jest.mock('${entry.mockPath}', () => ({\n` +
    `${INDENT}'layout:text': ['text', '${country}', '${entry.offerTypeKey}'],\n` +
    `${INDENT}'layout:flex': ['flex', '${country}', '${entry.offerTypeKey}']\n` +
    `}));\n`;

const tableRow = (country, entry) => `${INDENT.repeat(3)}['${country}', '${entry.offerTypeKey}'],\n`;

// ------------------------------------------------------------------- anchors

/**
 * Region-scoped rather than line-numbered: find the end of the last jest.mock
 * block belonging to `country`, so new blocks land beside their siblings and
 * the diff stays local.
 */
const lastMockEnd = (source, country) => {
    const prefix = `jest.mock('server/locale/${country}/`;
    let end = -1;
    let from = 0;
    while (from < source.length) {
        const idx = source.indexOf(prefix, from);
        if (idx === -1) break;
        if (idx > 0 && source[idx - 1] !== '\n') {
            from = idx + prefix.length;
            continue;
        }
        const close = source.indexOf('\n}));\n', idx);
        if (close === -1) {
            from = idx + prefix.length;
            continue;
        }
        end = close + '\n}));\n'.length;
        from = end;
    }
    return end;
};

const hasMock = (source, entry) => source.includes(`jest.mock('${entry.mockPath}'`);

const hasRow = (source, country, entry) => source.includes(`['${country}', '${entry.offerTypeKey}']`);

/** End offset of the last row in the test.each table for `country`. */
const lastRowEnd = (source, country) => {
    const prefix = `${INDENT.repeat(3)}['${country}', '`;
    let end = -1;
    let from = 0;
    while (from < source.length) {
        const idx = source.indexOf(prefix, from);
        if (idx === -1) break;
        if (idx > 0 && source[idx - 1] !== '\n') {
            from = idx + prefix.length;
            continue;
        }
        const close = source.indexOf("']", idx + prefix.length);
        if (close === -1) break;
        let cursor = close + 2;
        if (source[cursor] === ',') cursor += 1;
        if (source[cursor] !== '\n') {
            from = idx + prefix.length;
            continue;
        }
        end = cursor + 1;
        from = end;
    }
    return end;
};

// --------------------------------------------------------- presence checkpoint

/**
 * Diff-independent, per the skill contract: assert the source change is present
 * in the CURRENT tree. Works after the source branch is merged or deleted, and
 * never consults git.
 */
const presenceCheckpoint = (spec, entries) => {
    const missing = entries
        .map(entry => path.join(repoRoot, geoSpec.mutationDir(spec, entry.product), `${entry.mutation.file}.js`))
        .filter(file => !fs.existsSync(file));

    if (missing.length) {
        console.error('source change not present — run the source skill first. Missing modules:');
        missing.forEach(file => console.error(`  ${path.relative(repoRoot, file)}`));
        die(`source change not present (${missing.length} module(s) missing)`);
    }
};

// ---------------------------------------------------------------------- main

let spec;
try {
    spec = geoSpec.load(flag('spec'));
} catch (error) {
    die(error.message);
}

if (!fs.existsSync(targetPath)) die(`${TARGET} not found — run from the repo root`);

const country = spec.targetCountry;
const entries = geoSpec.allMutations(spec);

presenceCheckpoint(spec, entries);

const original = fs.readFileSync(targetPath, 'utf8');

// The coverage matrix: [mutation module] x [mock present, row present].
const matrix = entries.map(entry => ({
    entry,
    mock: hasMock(original, entry),
    row: hasRow(original, country, entry)
}));

const gaps = matrix.filter(cell => !cell.mock || !cell.row);

if (has('check')) {
    if (!gaps.length) {
        console.log(`coverage matrix satisfied: ${matrix.length}/${matrix.length} modules for ${country}`);
        process.exit(0);
    }
    gaps.forEach(cell => {
        const what = [!cell.mock && 'jest.mock', !cell.row && 'test.each row'].filter(Boolean).join(' + ');
        console.error(`ERROR=coverage gap: ${cell.entry.mutation.file} x ${what}`);
    });
    process.exit(1);
}

if (!gaps.length) {
    console.log(`no-op: all ${matrix.length} ${country} module(s) already covered`);
    process.exit(0);
}

// ------------------------------------------------------------------ mutation

// Anchor beside this country's existing blocks if it has any, else beside the
// template country's — which is where the reference PR put them.
const anchorCountry = lastMockEnd(original, country) !== -1 ? country : spec.templateCountry || country;

const mockAnchor = lastMockEnd(original, anchorCountry);
if (mockAnchor === -1) die(`could not locate a jest.mock anchor for ${anchorCountry} in ${TARGET}`);

const rowAnchor = lastRowEnd(original, anchorCountry);
if (rowAnchor === -1) die(`could not locate a test.each row anchor for ${anchorCountry} in ${TARGET}`);

const newMocks = matrix.filter(cell => !cell.mock).map(cell => mockBlock(country, cell.entry));
const newRows = matrix.filter(cell => !cell.row).map(cell => tableRow(country, cell.entry));

// Apply the later offset first so the earlier one stays valid.
const [firstOffset, firstText, secondOffset, secondText] =
    mockAnchor < rowAnchor
        ? [rowAnchor, newRows.join(''), mockAnchor, `\n${newMocks.join('\n')}`.replace(/\n$/, '')]
        : [mockAnchor, `\n${newMocks.join('\n')}`.replace(/\n$/, ''), rowAnchor, newRows.join('')];

let updated = original.slice(0, firstOffset) + firstText + original.slice(firstOffset);
updated = updated.slice(0, secondOffset) + secondText + updated.slice(secondOffset);

const summary = () => {
    console.log(`${TARGET}`);
    console.log(`  country            : ${country}`);
    console.log(`  modules in spec    : ${matrix.length}`);
    console.log(`  jest.mock to add   : ${newMocks.length}`);
    console.log(`  test.each to add   : ${newRows.length}`);
    matrix
        .filter(cell => !cell.mock || !cell.row)
        .forEach(cell => {
            console.log(`    + ${cell.entry.mutation.file.padEnd(22)} ${cell.entry.offerTypeKey}`);
        });
};

if (has('dry-run')) {
    console.log('DRY RUN — no files written\n');
    summary();
    process.exit(0);
}

fs.writeFileSync(targetPath, updated);
summary();
console.log(`\nOK=1 file, ${newMocks.length} mock(s), ${newRows.length} row(s)`);
process.exit(0);
