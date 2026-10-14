---
name: geo-expansion-pr-ut
description: Author the unit tests covering a geo-expansion source change, with a fail-closed coverage matrix over every mutation module. Use after the source change is present in the working tree.
---

# Geo-expansion: unit tests

This is a pointer. The canonical skill lives at:

**`tools/agent-skills/geo-expansion-pr/unit-tests.md`**

Read it and follow it.

It reads the same `spec.schema.json` contract as the source skill, so it needs
no new inputs and auto-proceeds to authoring on a one-line confirmation.

Two rules it enforces that are easy to get wrong: the presence checkpoint never
consults a git diff, because the source branch may be merged or deleted; and a
coverage gap is a hard failure, not a warning.
