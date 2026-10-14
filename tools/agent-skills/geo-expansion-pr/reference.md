# Reference: repo anchors and conventions

Supporting detail for `SKILL.md`. Everything here was verified against the
working tree and the four reference pull requests — 1276 (Austria, full market),
1321 (Great Britain, new product), 1310 and 1305 (single modal views).

---

## Repo conventions

|                    |                                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| Base branch        | `develop`                                                                         |
| Branch naming      | `<type>/<JIRA>-<slug>`; this family enforces `feature/<JIRA>-geo-expansion-<cc>`  |
| Commits            | Conventional commits — the release tooling parses them                            |
| Package manager    | npm, **no lockfile committed**                                                    |
| Pre-commit hook    | Staged-file linting plus the full unit suite                                      |
| Unit tests         | Root `jest.config.js`, run by the plain test script                               |
| Functional tests   | Separate configs under `tests/functional/`, browser-driven                        |
| Coverage threshold | None configured — which is why the coverage matrix gate is manual and fail-closed |
| Draft PRs          | Template at `.github/PULL_REQUEST_TEMPLATE.md`                                    |

### The baseline problem

`develop` fails two suites and eight snapshots on a pristine checkout. Verified
by checking out the branch clean and running the suite — nothing to do with any
expansion.

Consequences: the pre-commit hook runs the full unit suite, so this can block
commits; and "the tests pass" is not an available gate. Record a baseline before
mutating and compare against it. Report both numbers in the PR body.

---

## Layer 2 — locale tree

```
src/server/locale/<CC>/
    index.js
    <Product>/
        index.js
        mutations/
            index.js          switch mapping offer types to modules
            <variant>.js      one per offer-type variant
```

Multi-product markets (Germany, Austria) nest under a product directory.
Flat markets (Great Britain, France) have `mutations/` directly. The spec's
`products[].name` distinguishes them — omit it for flat markets.

Austria is 44 files cloned from Germany, of which 27 were byte-identical after
substituting the country token. The remaining 17 carry real localized copy. That
ratio is why the clone is scripted and the copy is not.

**Token substitution** is word-boundary anchored, applied to both file contents
and filenames: `DE` → `AT`, `NON-DE` → `NON-AT`, `de` → `at`, and
`generic-non-de.js` → `generic-non-at.js`. Anchoring matters — an unanchored
replace corrupts `DEFAULT` and `DEV`.

---

## Layer 3 — registration

`src/server/locale/index.js`, two edits:

```js
import AT from './AT';
```

appended to the import block, and a case in `getLocaleSettings`:

```js
        case 'AT':
            return AT(offerType);
```

**The call signature varies by country.** `DE(offerType)`, bare `GB`,
`CA(language)` all coexist. The script mirrors the template country's signature
rather than assuming one, capturing the `case` and `return` indents separately —
they sit at different levels, and getting that wrong is a lint failure.

---

## Layer 4 — dev accounts

`utils/devServerProxy/config/devAccounts.config.js` maps an account key to a
positional tuple:

```js
    DEV000ATPLEQZ: ['AT', ['long_term'], 'gpl_eqz'],
```

with an optional fourth element when the v2 content file differs.

**Every key is exactly 13 characters** — verified across all 110 existing
entries, zero exceptions. The generator is `DEV` + zero padding + the meaningful
slug. Given the sixteen slugs from the Austria PR it reproduces all sixteen
shipped keys byte-identically.

**The file uses `trailingComma: none`,** so its final entry has no comma.
Appending naively yields a file that parses nowhere. The script adds the comma
to the previous last entry and omits it on the new one. This bug was caught by
the smoke test, and it is the clearest argument for scripting this layer.

The v2 config uses a different shape and is edited directly. Its entries are
explicitly documented as mock structures for development, so they can be
generated rather than provisioned — but confirm the semantics in the PR body.

---

## Layer 1 — content

```
content/messages/<CC>/*.json
content/modals/<CC>/*.json
content/offers/<CC>/*.json
```

Sole consumer: `utils/devServerProxy/lib/devAccountDetails.js`. Not imported by
`src/`, not referenced by the bundler, not present in build output. A dev and
test fixture tree.

### Known content defects, for calibration

These are live on `develop`. They illustrate what to check for, and that review
does not reliably catch them:

-   A modal's Italian legal disclosure renders literal `{formatted_min_amount}`
    and `{formatted_max_amount}` — upstream snake_case tokens copied without
    conversion to this repo's camelCase.
-   A Great Britain message file wires `formattedMaxAmount` to a minimum-amount
    source field.
-   Roughly nineteen files reference at least one token absent from their
    `meta.variables`, each rendering a literal placeholder.

### Sourcing, with evidence

Of 24 content files added across the four reference PRs, **2 had any upstream
counterpart**. Austria's 16 message files: none. The ladder is upstream first
then Figma, as specified — but rung 1 is expected to miss, and a miss is not an
error.

---

## Layer 5 — shared modal UI, out of scope

The Austria PR also modified shared calculator, icon, inline-link, and
stylesheet files under `src/components/modal/v2/`. These are cross-market: that
work produced snapshot churn in Canada.

The skill stops here and hands off to a human.

---

## Functional test layer

`tests/functional/v2/config/` is per-market data — expected copy and amount
bands, no secrets. `testFn/` holds shared assertion bodies. `spec/` holds tests.

**The CI matrix is derived by globbing, not configured.** No file registers a
country. Follow the naming convention exactly or the tests never run, which is
indistinguishable from passing.

Snapshot regeneration is CI-driven via a PR label. Local baselines will not
match the CI environment.

Shared gating arrays — accordion account lists in the snapshot specs, tile
branches in `testFn/multi.js` — control whether a market's scenarios activate.
Editable, but report the markets affected.

---

## Not applicable here

**Version bumps and lockfile sync.** No reference PR modified `package.json`,
and this repo commits no lockfile. The alpha-version and lock-only-install policy
from the generic skill brief does not apply. If a dependency genuinely becomes
necessary, stop and ask rather than improvising.
