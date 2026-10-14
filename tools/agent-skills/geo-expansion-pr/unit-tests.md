# Geo-expansion: unit tests

Companion to `SKILL.md`. Authors the unit coverage for a geo-expansion source
change. **Never modifies source, `package.json`, or another market's tests.**

Reads the same spec file as the source skill — no new inputs, which is why this
skill auto-proceeds to authoring on a one-line confirmation.

---

## 1. Presence checkpoint — fail-closed, and never a git diff

Before authoring anything, verify the source change is actually present in the
**current working tree**.

Derive the expected module paths from the spec:

```
src/server/locale/<CC>/<Product>/mutations/<file>.js   multi-product markets
src/server/locale/<CC>/mutations/<file>.js             flat markets
```

If any is missing, **stop**:

```
ERROR=source change not present — run the source skill first
```

This deliberately does not consult git. The source branch may have been deleted
or already merged, and a diff would report nothing in both cases. A diff is
acceptable only as an optional cross-check, never as the check.

`apply-geo-unit-tests.js` performs this automatically and exits non-zero.

---

## 2. The coverage matrix

The target is `tests/unit/spec/server/locale/index.test.js`.

Every mutation module in the spec needs **two** things. Missing either is a gap:

1. A `jest.mock` block mapping the module to its dispatch key.
2. A row in the `test.each` table.

```js
jest.mock('server/locale/AT/GPL/mutations/gpl_eqz', () => ({
    'layout:text': ['text', 'AT', 'GPL:EQZ'],
    'layout:flex': ['flex', 'AT', 'GPL:EQZ']
}));
```

```js
['AT', 'GPL:EQZ'],
```

The second element is **not a free-form label.** The assertion is

```js
expect(getMutations(locale, offerType, 'layout:text')).toEqual(['text', locale, offerType]);
```

so it must be a real dispatch key from that product's `mutations/index.js`. A
plausible-looking but wrong key produces a test that fails for a reason that
looks like a source bug.

### The gate is fail-closed

```
node tools/scripts/apply-geo-unit-tests.js --spec <path> --check
```

Exits non-zero listing each gap as `ERROR=coverage gap: <module> x <what>`.
**Refuse to commit while any cell is empty.**

This is not theoretical. Run against `develop`, this reports six uncovered
modules for Austria — 37.5% of that market — all of which shipped. Six modules
dispatch offer types that no test has ever exercised.

---

## 3. Apply

```
node tools/scripts/apply-geo-unit-tests.js --spec <path> --dry-run
node tools/scripts/apply-geo-unit-tests.js --spec <path>
```

Idempotent: it detects each block and row independently, so a partially covered
file completes rather than duplicating. New blocks are anchored beside their
siblings — this country's if it has any, otherwise the template country's.

Then run the repo's unit test command and confirm the new cases pass. Compare
against the baseline the source skill recorded; `develop` has pre-existing
failures and they are not yours.

---

## 4. Beyond the dispatch table

The matrix covers dispatch. If the spec's products introduce logic the reference
PR also tested — content resolution, offer-type parsing, locale-class derivation
— add those cases too, following the existing structure in the same file.

Do not manufacture tests for behavior the market does not have. Coverage of what
exists, not volume.

---

## 5. Branch, then the commit gate

**Reuse rule:** already on `feature/<JIRA>-geo-expansion-<cc>`? Commit to it. A
standalone run — source already merged — creates
`feature/<JIRA>-geo-expansion-<cc>-ut` and its own PR.

Before committing, confirm the diff touches only test files, verify the coverage
gate passes, and show the user the assertions and the test result.

**Then the VALIDATE-BEFORE-COMMIT gate.** Explicit approval, every time.

---

## 6. Orchestrator mode

`interactive: false`: no prompts, run through. Emit `PR_URL=` on success, or
`ERROR=` — including `ERROR=coverage gap: ...` — on failure. A coverage gap is a
failure, never a warning.
