---
name: geo-expansion-pr
description: Add a new market or a new product in an existing market — the source and config change only, never tests. Use when expanding messaging components to a new country or launching a product in a country that already exists.
---

# Geo-expansion: source change

This is a pointer. The canonical skill lives at:

**`tools/agent-skills/geo-expansion-pr/SKILL.md`**

Read it and follow it. Do not follow a summary of it — the steps, gates, and
guardrails live there and only there.

Supporting detail in the same directory:

-   `reference.md` — repo anchors, the five-layer map, known content defects
-   `examples.md` — a worked Austria run with real script output
-   `spec.schema.json` — the input contract shared by all three skills

Companions, chained on one branch and one draft PR:

-   `unit-tests.md` → `.claude/skills/geo-expansion-pr-ut/`
-   `functional-tests.md` → `.claude/skills/geo-expansion-pr-ft/`

Two things before you start: the JIRA key is mandatory and never derived, and
`develop` currently has failing tests, so record a baseline before you mutate
anything.
