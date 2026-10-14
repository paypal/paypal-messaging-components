# Geo-expansion: source change

Adds a new market — or a new product in an existing market — to the messaging
components. This is the SOURCE skill. It never authors tests; two companion
skills do that, and all three read the same spec file.

|            |                                                                         |
| ---------- | ----------------------------------------------------------------------- |
| Canonical  | `tools/agent-skills/geo-expansion-pr/SKILL.md` (this file)              |
| Companions | `unit-tests.md`, `functional-tests.md`                                  |
| Contract   | `spec.schema.json`                                                      |
| Script     | `tools/scripts/apply-geo-source.js`                                     |
| Detail     | `reference.md` (anchors, layer map), `examples.md` (worked Austria run) |

Written in capability terms, not tool names. Wherever this says "ask the user",
"fetch", or "run the repo's tests", use whatever mechanism you have. If you lack
one, say so and fall to the next option rather than stalling.

---

## 0. Before anything: the JIRA key

**Mandatory. No default, no derivation, no proceeding without it.** Not from the
branch name, not from the PRD, not from a recent commit. If you do not have it,
ask and wait.

Everything downstream depends on it, starting with the branch name.

---

## 1. What a geo-expansion actually touches

Five layers. Two are mechanical and scripted, two need judgment, one is
deliberately out of scope.

| Layer               | What                                           | How                                                                 |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| 1. Content fixtures | `content/{messages,modals,offers}/<CC>/*.json` | **You author it.** Copy is prose.                                   |
| 2. Locale tree      | `src/server/locale/<CC>/**`                    | **Script.** A clone with token substitution — 44 files for Austria. |
| 3. Registration     | `src/server/locale/index.js`                   | **Script.** Import plus switch case.                                |
| 4. Dev accounts     | `utils/devServerProxy/config/**`               | **Script** for the v1 tuple file; you edit the v2 file.             |
| 5. Shared modal UI  | `src/components/modal/v2/**`                   | **Out of scope.** Cross-market blast radius — hand to a human.      |

Layer 5 is not squeamishness. In the Austria reference PR, edits to shared
calculator and accordion components produced snapshot churn in Canada. A skill
should not silently change a market it was not asked to change.

### Content is a fixture tree, not production copy

`content/` has exactly one consumer, `utils/devServerProxy`. Nothing under
`src/` reads it and it is not bundled. Merchants never see these strings —
production copy arrives from the live content service at request time.

This does **not** make the copy unimportant. Snapshot baselines bake in whatever
the fixture says, so a wrong fixture becomes the certified-correct expected
result. There is a modal in this repo today whose Italian legal disclosure
renders the literal text `{formatted_min_amount}`, and its snapshot asserts that
as correct. Fixtures must match real copy closely enough that a rendering
regression is actually caught.

---

## 2. Inputs

Build a spec file conforming to `spec.schema.json`. Confirm the parsed values
with the user before proceeding. Ask for anything missing — never invent.

**From the user:** the JIRA key, and the PRD.

**From the PRD:** country code, products, amount bands, which scenario families
apply, and the market's language.

**Choose the template country** by language and product shape, not alphabetical
proximity. Austria clones Germany. Say which you picked and why, and let the
user correct you.

### Sourcing the content copy

The PRD determines _which_ content files you need. For each one, walk this
ladder:

1. **Upstream content repo** — look for a counterpart for this country and
   message type.
2. **Figma** — the design frame for the market. Record the frame URL in the
   spec's `contentSource.figmaUrl` as provenance.
3. **Ask the user** to paste the copy.

**Expect rung 1 to miss.** Across the four reference PRs, 24 content files were
added and only 2 had any upstream counterpart. For a genuinely new market this
repo leads and upstream trails. A miss is the normal case, not an error, and
must not stall the run.

---

## 3. Branch

```
feature/<JIRA>-geo-expansion-<cc>
```

`<cc>` lowercase, from the PRD. Base off `develop`.

**Reuse rule:** if you are already on that branch, commit to it. Do not create a
second branch. A full expansion is one branch and one draft PR carrying source,
unit tests, and functional tests — mirroring the reference PR.

Only a standalone run — the source change already merged, and you are adding
tests later — creates its own `-ut` or `-ft` branch and its own PR.

---

## 4. Establish the test baseline first

**Do this before mutating anything.**

Run the repo's unit test command on the untouched branch and record the result.

`develop` is not currently green: two suites and eight snapshots fail on a
pristine checkout, unrelated to any expansion. If you treat "tests pass" as your
gate you will be blocked by someone else's breakage and may waste a long time
concluding your own change caused it.

The gate is **no new failures relative to the baseline**, not zero failures.
Report the baseline in the PR body so a reviewer knows what was already broken.

The pre-commit hook runs the full unit suite, so a red baseline can block the
commit itself. If it does, say so plainly and ask the user how to proceed rather
than reaching for a bypass flag on your own.

---

## 5. Apply

### Layers 2–4: run the script

```
node tools/scripts/apply-geo-source.js --spec <path> --dry-run
node tools/scripts/apply-geo-source.js --spec <path>
```

Always dry-run first and show the user the summary. The script validates the
whole spec before touching disk, is idempotent per file and per dev-account key,
and refuses to write any test path.

It reports which cloned files carry template-country copy. Those are yours to
fix in the next step — the clone gives you structure, not language.

### Layer 4b: the v2 dev account file

The v2 config uses a different shape from the v1 tuple file and is edited
directly. Follow the existing entries for the template country.

### Layer 1: author the content

For each file in the spec, clone the structural shape from the template
country's equivalent, then replace every string with target-market copy from the
ladder in §2.

Then verify, for every file you wrote:

-   Every `{token}` in a copy string is declared in that file's `meta.variables`.
    An undeclared token renders literally to the shopper.
-   No `snake_case` tokens survive. Upstream uses `formatted_min_amount`; this
    repo uses `formattedMinAmount`. Copy-pasting upstream content without
    converting is a known, shipped bug here.
-   Each variable points at the field it names — a `formattedMaxAmount` wired to a
    minimum-amount source is currently live in this repo and is exactly the class
    of error that survives review.
-   Amounts, APRs, and term counts match the PRD **and** match what the functional
    test config will assert. These are the same literals in three files.

### Localized prose in the cloned tree

Replace the template country's copy in the files the script flagged. If you
cannot source a string, ask — do not leave the template market's language in
place, and do not guess at a translation.

---

## 6. Verify, then the commit gate

Run the repo's linter and unit test command. Compare against the baseline from
§4.

Review the full diff yourself first. Confirm:

-   No file matching `*.test.*`, `*.spec.*`, `__tests__/`, or `__snapshots__/`.
-   No `package.json` change. No reference PR touched it and this repo has no
    lockfile, so the version and lockfile policy does not apply here. If you find
    yourself needing a dependency, stop and ask.
-   No other market's files.
-   Nothing outside the five layers.

**Then the VALIDATE-BEFORE-COMMIT gate.** Present the diff, the baseline
comparison, and the generated dev-account keys. Get explicit approval. Only then
commit.

Never commit without this. Commit messages follow the repo's conventional-commit
convention — the release tooling reads them.

---

## 7. Chain

Source → unit tests → functional tests, all on the one branch.

Hand off by pointing the next skill at the same spec file:

-   `unit-tests.md` — auto-proceeds to authoring on a one-line confirm; it needs
    no new inputs.
-   `functional-tests.md` — gated on inputs, because it needs PRD scenarios and
    any provisioned fixtures.

---

## 8. Push and PR

**Always gated.** Present a pre-push report: branch, commits, files by layer,
baseline comparison, and anything you flagged for human follow-up — layer 5
work, unsourced copy, dev-account semantics to confirm.

Get explicit approval. Then open **one draft PR** linking the JIRA key.

Never force-push. Never reset --hard.

---

## 9. Orchestrator mode

With `interactive: false` in the spec, skip every prompt and run straight
through. The spec must be complete, including the JIRA key and any functional
fixtures.

Terminal output is exactly one line:

```
PR_URL=<url>
```

```
ERROR=<what was missing or what failed>
```

Never invent a missing input to keep a non-interactive run alive. Exit with
`ERROR=` instead.

---

## 10. Guardrails

| Rule                                  | Why                                                     |
| ------------------------------------- | ------------------------------------------------------- |
| JIRA key required before anything     | Traceability; the branch name depends on it             |
| Never author or edit test files       | The companion skills own those                          |
| Never touch another market's files    | Blast radius                                            |
| Never touch `package.json`            | No reference PR did; no lockfile exists                 |
| Stop before shared modal UI           | Cross-market snapshot churn                             |
| Dry-run before apply                  | The script is the safety net, the dry-run is the review |
| Baseline before mutate                | `develop` is red; distinguish yours from theirs         |
| Explicit approval before every commit | Non-negotiable                                          |
| Explicit approval before push or PR   | Non-negotiable                                          |
| Never invent provisioned values       | Account fixtures and offer IDs come from humans         |
