# CLAUDE.md - PayPal Messaging Components

This document provides essential information for Claude to understand and work with the PayPal Messaging Components repository.

## Read first (rules)

-   **Source of truth**: read `AGENTS.md` first for agent rules (persona, safety, verification, coding standards).
-   **Precedence**: if anything in this file conflicts with `AGENTS.md`, **`AGENTS.md` wins**.
-   **Subagents**: Spawn subagents in parallel for as many as you can handle. Give each one crisp context, the exact files it needs, and clear instructions. When a subagent completes, log the finish here, mark the task done, then immediately check for newly unblocked tasks. Repeat the cycle until the entire plan is complete.
-   This file is intentionally focused on repo context (architecture, structure, pointers).

## Repository overview

PayPal Messaging Components delivers SDK messaging and modal experiences. It is a Preact-based UI codebase with Zoid components, demos, and snapshot tests.

## Project structure

-   `src/` - core library and components
-   `content/` - localized messaging copy and configuration
-   `demo/` - local demo pages
-   `tests/` - unit, functional, and Playwright tests
-   `docs/` - usage and contribution docs
-   `dist/` - built assets (do not hand-edit)

## Development commands

```bash
# Install and lint
npm install
npm run lint

# Unit tests
npm test

# Functional tests
npm run test:func

# Build
npm run build:production
```




## Service Dependencies (Deep Dive Aligned)

See `AGENTS.md` section `Service Dependencies (Deep Dive Aligned)` for full mappings and impact rules.

This repo's role: V5 public UI component layer, backed by CPNW runtime endpoints and CPNS/MORS content chain.
