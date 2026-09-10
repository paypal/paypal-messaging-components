# Geo-expansion: functional tests

Companion to `SKILL.md`. Authors the functional and snapshot coverage for a new
market. **Never modifies source or `package.json`.**

Judgment-driven, not scripted: scenarios come from the PRD, expected copy comes
from the content fixtures, and some inputs only a human can supply. Gated on
inputs for that reason — unlike the unit companion, do not auto-proceed.

---

## 1. Presence checkpoint

Same rule as the unit companion, and for the same reason. Verify in the
**current tree**, not via a diff:

-   the locale modules from the spec exist,
-   the country is registered in `src/server/locale/index.js`,
-   the content files from the spec exist under `content/`,
-   the dev accounts from the spec exist in the dev-server config.

Any missing → **stop** with `ERROR=source change not present — run the source
skill first`. Functional tests drive a real browser against the dev server; if
the source is absent they fail in ways that look like product bugs.

---

## 2. Gather inputs before authoring

Ask for anything you do not have. **Never invent these** — a fabricated account
or offer ID produces a test that fails against real infrastructure with a
misleading error:

-   Which scenario families the PRD calls for.
-   Amount bands, APR, and term counts.
-   Any provisioned stage-account fixtures or per-environment offer IDs.

If the user cannot supply a provisioned input, offer to skip that scenario and
record the omission. Do not guess.

### Write only what the PRD calls for

Pick from: base rendering, below-minimum, above-maximum, cross-border,
promotional zero-APR, suppression, error handling, multi-product, checkout.

Nothing speculative. A scenario the market does not have is a test that asserts
a fiction.

---

## 3. Value coupling — the thing most likely to bite

The same literal values live in three places and must agree exactly:

| Where                              | What                                       |
| ---------------------------------- | ------------------------------------------ |
| `content/**/<CC>/*.json`           | the copy and its baked-in amounts          |
| `utils/devServerProxy/config/**`   | which content file each dev account serves |
| `tests/functional/v2/config/<CC>*` | the expected copy and amount bands         |

The functional config asserts the rendered string. If it disagrees with the
content fixture by so much as a currency symbol, the test fails — and the
failure points at the test, not at the disagreement.

**Derive the expected copy from the content files you actually wrote.** Do not
retype it from the PRD; the PRD and the fixture can differ in punctuation.

---

## 4. Where things go

`tests/functional/v2/config/` holds per-market data — expected copy and amount
bands. No secrets. `testFn/` holds shared assertion bodies. `spec/` holds the
Jest tests.

**The CI matrix is auto-derived by globbing these paths.** There is no matrix
file to register a country in. Follow the existing naming exactly, or your tests
silently never run — which looks identical to passing.

### Shared gating arrays

Some behavior is switched on by a country's presence in a shared array — the
accordion-account lists in the snapshot specs, and the tile branches in
`testFn/multi.js`.

You may edit these; they are shared files, not another market's tests. But
report which markets you newly affect. If activating your market turns out to
require editing **another market's config**, stop and ask.

The Austria reference PR modified Spain's and Italy's configs to repair tests
that had been dormant. That was correct, and it was also a human decision made
with context. Surface it; do not make it silently.

---

## 5. Run, and snapshots

Run the repo's functional suite for your market. These drive a real browser
against the dev server — expect them to be slow and to need the dev server up.

**Snapshots are regenerated in CI, not locally.** Local rendering differs from
the CI environment, so a locally generated baseline will fail there. Push, then
apply the repo's snapshot-regeneration label to the PR and let CI produce them.

Review generated snapshots before accepting. A snapshot only records what
rendered — if the copy was wrong, the snapshot faithfully certifies the wrong
copy, which is how a literal `{formatted_min_amount}` came to be an approved
baseline in this repo.

---

## 6. Idempotency

Before adding anything: does a spec, config entry, or array membership for this
market already exist? Extend it rather than adding a parallel one. Re-running
must not produce duplicate scenarios.

---

## 7. Branch, then the commit gate

**Reuse rule:** already on `feature/<JIRA>-geo-expansion-<cc>`? Commit to it.
Standalone runs create `feature/<JIRA>-geo-expansion-<cc>-ft` and their own PR.

Confirm the diff touches only test, fixture, and test-config files. Show the
user the scenarios authored, the run result, any skipped scenarios and why, and
any shared array you touched with the markets it affects.

**Then the VALIDATE-BEFORE-COMMIT gate.** Explicit approval, every time.

---

## 8. Orchestrator mode

`interactive: false` requires the full contract up front, including scenarios
and every provisioned fixture. Emit `PR_URL=` or `ERROR=`. A missing provisioned
input is `ERROR=`, never an assumption.
