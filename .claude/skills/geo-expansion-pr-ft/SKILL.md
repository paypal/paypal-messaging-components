---
name: geo-expansion-pr-ft
description: Author the functional and snapshot tests for a newly expanded market, with scenarios derived from the PRD. Use after the source change and its content fixtures are present in the working tree.
---

# Geo-expansion: functional tests

This is a pointer. The canonical skill lives at:

**`tools/agent-skills/geo-expansion-pr/functional-tests.md`**

Read it and follow it.

Unlike the unit companion this one is gated on inputs — it needs PRD scenarios
and any provisioned fixtures, and it must never invent them.

Two things that surprise people: the CI matrix is derived by globbing rather
than configured, so misnamed files silently never run; and snapshots are
regenerated in CI via a PR label, never locally.
