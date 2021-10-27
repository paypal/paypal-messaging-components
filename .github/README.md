# GitHub Actions

GitHub Actions runs using workflows, which define jobs that we run for continuous integration (CI). Inside of our GitHub Actions, we have 4 different kinds of workflows:

- [Linting, Unit Tests, and Non-Snapshot Functional Tests](#linting-unit-tests-and-non-snapshot-functional-tests)
- [Snapshot Comparison](#snapshot-comparison)
- [Update Snapshots](#update-snapshots)
- [Deploy](#deploy)

Snapshot-based workflows are split further by US and non-US due to the numerous offers that US has. This keeps our CI running quickly.

## Linting, Unit Tests, and Non-Snapshot Functional Tests

This workflow runs two jobs.

`lintAndUnit`

1. Lints code to make sure it follows coding standards.
2. Runs unit tests to ensure code is working at a basic level.

`functionalNonSnapshot`

1. Runs non-snapshot functional tests to ensure that code works when it runs in the browser.

## Snapshot Comparison

There are two workflows here: `compareSnapshotsUS` and `compareSnapshotsNonUS`. Here's how they run:

`compareSnapshotsUS` is for the US locale. 

1. `getTestPathPatterns` reads `usTestPathPatterns.json` and provides it as output.
2. `compareSnapshots` reads the output of `getTestPathPatterns` to determine the tests to run.
3. The server is run.
4. Any failed comparison tests are collected and uploaded to imgur.

`compareSnapshotsNonUS` is for all non-US locales. 

1. `getLocales` reads `locales.json` and provides it as output.
2. `compareSnapshots` reads the output of `getLocales` to determine the locales to check.
3. The server is run.
4. Any failed comparison tests are collected and uploaded to imgur.

## Update Snapshots

There are two workflows here: `updateSnapshotsUS` and `updateSnapshotsNonUS`. Here's how they run:

`updateSnapshotsUS` is for the US locale.

1. `getTestPathPatterns` reads `usTestPathPatterns.json` and provides it as output.
2. `updateSnapshots` reads the output of `getTestPathPatterns` to determine which tests may need updating.
3. The server is run.
4. Any comparison tests that failed in Snapshot Comparison will have their images updated.
5. Updated images will be committed.

`updateSnapshotsNonUS` is for all non-US locales. 

1. `getLocales` reads `locales.json` and provides it as output.
2. `updateSnapshots` reads the output of `getLocales` to determine which tests may need updating.
3. The server is run.
4. Any comparison tests that failed in Snapshot Comparison will have their images updated.
5. Updated images will be committed.

## Deploy

This workflow runs one job.

`deploy`

1. Deploys code using semantic-release

## Workflow Triggers

Triggers are what causes a workflow to run. These are the current triggers for each of our workflows.

- Linting, Unit Tests, and Non-Snapshot Functional Tests
    - `workflow_dispatch` - allows for manually running a workflow
    - `push` - runs the workflow when code is pushed to `develop` or `release`
    - `pull_request` - runs on all pull requests
- Snapshot Comparison
    - `workflow_dispatch` - allows for manually running a workflow
    - `push` - runs the workflow when code is pushed to `develop` or `release`
    - `pull_request` - runs on all pull requests
    - **Note** - `push` and `pull_request` run US or non-US workflows if their related files are changed
- Update Snapshots
    - `workflow_dispatch` - allows for manually running a workflow
    - `pull_request` - runs on all pull requests
    - `pull_request_target` - runs on all pull requests from forks if the pull request has a label on it
    - **Note** - this workflow only runs if it is labeled with `snapshots`
- Deploy
    - `workflow_dispatch` - allows for manually running a workflow
    - `push` - runs the workflow when code is pushed to `release`
    - `pull_request` - runs only on a pull request to the release branch

## Other Notes

### Strategy Matrix

The strategy matrix makes it easy to run the same job with a different configuration.

This matrix is used to run snapshot tests for each locale and to split the US locale by various test path patterns. The `locale` option for non-US and the `testPathPattern` option are generated dynamically by reading in `locales.json` and `usTestPathPatterens.json` respectively. This is done so developers can change them in onee place and every workflow using those options stays in sync.

You can read more in the [official docs here](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix).

#### Option Names

The singular `testPathPattern` and `locale` are used instead of the plural because the test command is testing only a single test path pattern oor a single locale.

### Snapshot Job Names

The `compareSnapshot` workflows are given the name "Snapshot Comparison" as opposed to "Compare Snapshots" to make it easier to differentiate from "Update Snapshots" in GitHub Actions user interface.

