# Agent & Assistant Guidelines (PayPal Messaging Components)

## Persona & style

-   Address the user as Developer.
-   Open: "Hi Developer — <motivation>." then act.
-   Telegraph; noun phrases OK; minimal tokens; expand only for clarity.
-   Ask clarifying questions whenever requirements are underspecified or constraints are missing.
-   For PR comment review tasks: validate each PR comment to ensure it makes sense, avoid false positives, and state why it is valid or not.
-   During plan/research: actively look for codebase improvements and friction/misalignment with existing patterns; call them out with concrete suggestions (and tradeoffs when relevant).
-   Optimize for correctness + leverage; be direct/critical when needed.
-   Never claim checks ran unless they actually ran; cite commands executed.
-   Every time you plan a feature, make it comprehensive and detailed, and include robust acceptance criteria to validate the changes. Do not stop until acceptance criteria is met.

## Subagents

-   Always wait for all subagents to complete before yielding.
-   Spawn subagents automatically when:
    -   Parallelizable work (e.g., `npm run lint` + `npm test`, snapshot review + content scan).
    -   Long-running or blocked tasks where a worker can run independently (e.g., functional suites, build validation).
    -   Isolation for risky changes or checks (e.g., content/i18n, modal rendering, build/release scripts).
-   Give each subagent crisp context, the exact files it needs, and clear instructions with expected output format.
-   When a subagent completes, log the finish here, mark the task done, then immediately check for newly unblocked tasks.
-   Repeat the cycle until the entire plan is complete.
- Use subagents liberally to keep the main context window clean for long-running work.
- Offload research, exploration, and parallel analysis to subagents whenever tasks are independent.
- Keep one task per subagent for focused execution and easier validation handoff.


## Docs-first (read before coding)

-   `README.md` (scripts, dev server targets, stage env override)
-   `CONTRIBUTING.md` (contribution expectations)
-   `docs/message-demo-pages.md` (demo + snapshot pages)
-   `docs/message-types.md` (message/modal type naming by locale)
-   `docs/message-stage-bundle.md` (internal stage-tag bundle workflow)
-   `tests/playwright/README.md` (Playwright usage notes)
-   `src/components/modal/v2/parts/views/README.md` (how to add modal "views" correctly)

## Context7 MCP (3rd-party docs)

-   Use Context7 for library/API documentation, setup steps, and configuration guidance.
-   Always call `resolve-library-id` first, then `query-docs` with that ID.
-   Be specific in queries; max 3 calls per question.

## Project snapshot

-   **Runtime**: Node `20` (see `.nvmrc`)
-   **Build**: Webpack 4 + `@krakenjs/webpack-config-grumbler` (`webpack.config.js`, `webpack.config.dev.js`)
-   **UI**: Preact + JSX (`preact`, `@krakenjs/jsx-pragmatic`) + SCSS (modal v2)
-   **Cross-domain components**: Zoid + Post-Robot (`@krakenjs/zoid`, `@krakenjs/post-robot`)
-   **Primary outputs**:
    -   `dist/` bundles (built via release/asset script; do not hand-edit)
    -   `demo/` pages for local verification
-   **Content**: locale-specific JSON under `content/` (messages/modals/offers)

## Key directories (where things live)

-   `src/library/`: library entrypoints (`messaging.js`, `modal.js`)
-   `src/components/`: Zoid components
    -   `src/components/message/`
    -   `src/components/modal/v2/` (modern modal)
-   `src/server/`: server-side rendering / endpoints used by demos and tests
-   `content/`: localized copy and configuration payloads
    -   `content/messages/<LOCALE>/*.json`
    -   `content/modals/<LOCALE>/*.json`
    -   `content/offers/<LOCALE>/*.json`
-   `demo/`: local demo + snapshot pages (`demo/standalone.html`, `demo/snapshot/*.html`)
-   `tests/`: unit + functional snapshot suites + Playwright
-   `utils/devServerProxy/`: local dev-server proxy hooks

## Coding & formatting standards

-   **Prettier**: `.prettierrc.js` (4 spaces, `printWidth: 120`, single quotes, semicolons)
-   **ESLint**: `.eslintrc` (Airbnb + Prettier; `prettier/prettier` enforced as error)
-   **Lint-staged**: `.lintstagedrc.js` (formats/lints staged JS/JSX + formats json/md/html/css)

## Local gate (run before PR / handoff)

-   `nvm use` (Node 20)
-   `npm install`
-   `npm run lint`
-   `npm test` (unit tests; Jest)

Run additional suites when you touched related areas:

-   **Functional (puppeteer) tests**:
    -   Start server: `npm run dev:ci`
    -   Then run:
        -   `npm run test:func` (all functional)
        -   `npm run test:func:nosnaps` (functional without snapshots)
        -   `npm run test:func:snapshots` (v2 snapshot suite)
-   **Build sanity**:
    -   `npm run build:production` (or `npm run build:stage` / `npm run build:sandbox` as appropriate)

## Verify & iterate (behavior-first)

-   If you change rendering/UX, verify with local demo pages:
    -   `npm start` then open `demo/standalone.html`
    -   For multi-banner comparisons: `demo/text.html`, `demo/flex.html` (see `docs/message-demo-pages.md`)
-   If you change snapshot-relevant rendering, use snapshot pages (`demo/snapshot/*.html`) and run the snapshot suite.
-   If tests fail: reproduce → fix root cause → re-run the same suite(s) until green.
-   When fixing bugs: reproduce first → fix → verify the fix via the most relevant demo/tests.
- Never mark work complete without proving behavior with relevant tests, logs, or runtime checks.
- When relevant, compare behavior between base/main and your changes to confirm intended deltas.
- Apply a staff-level quality bar: ask whether the result is robust, observable, and review-ready.


## Tests (what to run and when)

-   **Unit**: `npm test` (Jest, jsdom; HTML report at `tests/__reports__/unit.html`)
-   **Functional / snapshots**: Jest + Puppeteer
    -   Snapshot update flows:
        -   `npm run test:func:ciupdate` (updates snapshots for functional suite)
        -   `npm run test:func:snapshots:ciupdate` (updates v2 snapshot suite)
    -   Targeted snapshots use `CONFIG_PATH` (from `README.md`):
        -   `CONFIG_PATH={locale}/{account} npm run test:func:snapshots -- --testPathPattern {integrationType}`
-   **Playwright**: `npx playwright test`
    -   Note: `playwright.config.js` references `./.github/scripts/runServerV2.sh` as `webServer.command`.
    -   If that script is missing in your checkout, Playwright will not be able to auto-start the server; start a dev server yourself (e.g. `npm run dev:ci`) and adjust the config/command as needed in your change.

## Playwright interactive debugging

Use Playwright’s interactive modes when tests fail or when implementing a complex user flow.

-   **When to use**:
    -   Browser tests failing; need to see what’s happening.
    -   New/complex modal or banner flows; verify end-to-end behavior.
    -   Timing/race issues and flaky selectors.
-   **How to use (CLI)** (see `tests/playwright/README.md`):
    -   `npx playwright test --ui`
    -   `npx playwright test --debug`
    -   `npx playwright test --headed`
    -   `npx playwright test --project=chromium`
    -   Tip: cap concurrency locally with `--workers <n>` if needed.
-   **Principles**:
    -   Test what a real user experiences, not what code "should" do.
    -   Prefer screenshots/trace on failures; update selectors only after confirming the DOM/state.

## Content & i18n safety (JSON under `content/`)

-   Treat `content/` as product-facing copy/config; changes are high-impact.
-   Keep locale files consistent with existing naming conventions (see `docs/message-types.md`).
-   Prefer minimal diffs; avoid unnecessary reformatting across many JSON files.
-   If you update content that affects rendering, run the relevant snapshot suite(s) to catch regressions.

## Modal v2 "views" (when adding/changing views)

-   Follow `src/components/modal/v2/parts/views/README.md`:
    -   New view folder with `Content.jsx`
    -   Export from the `views/index.js`
    -   Preserve shared structural classNames (`content__container`, `content__body`, etc.) to reuse shared styles
    -   For per-view overrides, add a local `.scss` and inject via `<style>{fileName._getCss()}</style>` pattern

## Dev servers & environments

-   Primary dev entrypoints:
    -   `npm run dev` (TARGET=sdk)
    -   `npm run dev:standalone`, `npm run dev:modal`, `npm run dev:lander`
    -   `npm run dev:stage`, `npm run dev:sandbox`, `npm run dev:production`
-   Environment override for demos (dev only): set `window.__TEST_ENV__` in the demo page (see `README.md`).

## Release & dist hygiene

-   Releases are driven by `semantic-release` (`release.config.js`) and build assets via `./scripts/semantic-release/assets.sh`.
-   Avoid committing changes to `dist/` unless you are intentionally running the release/asset workflow; `dist/` is large and should reflect an intentional build.

## Git hooks (Husky) & staged-file hygiene

-   Pre-commit runs `lint-staged` + `npm test` (see `scripts/husky/pre-commit.sh`).
-   Expect staged JS/JSX to be formatted by Prettier and checked by ESLint before commit (see `.lintstagedrc.js`).

## Cross-platform scripts

-   Prefer `npm run <script>` over ad-hoc command invocations so workflows stay consistent.
-   Avoid adding Unix-only shell one-liners directly into `package.json` scripts; prefer Node scripts or existing repo patterns (e.g. webpack `--env ...` flags).
-   Do not add new dependencies (like `cross-env`) without approval.

## Production safety

-   Assume production impact unless stated otherwise; this repo ships merchant-facing messaging UX.
-   Prefer small, reversible changes; call out risk when touching content, rendering, tests, or build/release scripts.

## Critical thinking

-   Fix root cause; avoid band-aids.
-   Unsure: read more code/docs; if still ambiguous, ask with short options.
-   Conflicts between docs and code: call out; pick the safer/more consistent path.
-   Unrecognized large diffs: assume other agent or context missing; proceed cautiously.

## SCM & safety

-   No destructive git commands (`reset --hard`, `clean`) without explicit permission.
-   No new deps/services without approval.
-   Keep secrets out of code/logs. Use env/global overrides as documented.
-   Prefer small, reversible changes; call out risk when touching content rendering, tests, or build/release scripts.

## Acceptance criteria (for changes you make)

-   Include a clear plan with acceptance criteria before implementing non-trivial changes.
-   Keep changes aligned with repo patterns (webpack targets, demo verification, test suites).
-   Run the most relevant local gates for the impacted area(s) and cite the commands you executed.

## Plan Mode Default

- Enter plan mode for any non-trivial task (3+ steps or architectural decisions).
- If execution goes sideways, stop and re-plan immediately before continuing.
- Include verification steps in the plan, not only implementation steps.
- Write detailed specs up front to reduce ambiguity and rework.

## Demand Elegance (Balanced)

- For non-trivial changes, pause and ask whether there is a more elegant path before implementation.
- If a fix feels hacky, prefer the cleaner approach you would choose with full context.
- Skip elegance over-optimization for obvious small fixes; do not over-engineer.

## Autonomous Bug Fixing

- When given a bug report, own the full path: reproduce, identify root cause, fix, and verify.
- Start from logs, errors, and failing tests; resolve issues with minimal user context switching.
- If CI checks fail in scope, investigate and fix them without waiting for step-by-step instructions.

## Task Management (Portable)

- For non-trivial work, maintain a checkable plan in tasks/todo.md.
- Track progress as items are completed and include brief review notes for key decisions.
- Capture recurring corrections and preventions in tasks/lessons.md.
- If tasks/todo.md or tasks/lessons.md does not exist, create it on demand for active work.

## Core Principles

- Simplicity first: keep each change as small as possible while solving the right problem.
- No laziness: find and fix root causes, not temporary patches.
- Minimal impact: touch only what is necessary and avoid introducing regressions.

## Self-improvement

- After any user correction, update portable task notes (tasks/lessons.md) with mistake-prevention rules.
- Review relevant lessons at the start of related tasks and apply them proactively.
- Iterate on these lessons until repeat mistakes materially drop.


-   If we hit the same correction twice, codify it in `AGENTS.md` so future work stays aligned.




## Service Dependencies

- Keep dependency references high-level in this public repository.
- If a change requires deep internal service details, escalate to maintainers and use internal docs for implementation specifics.
