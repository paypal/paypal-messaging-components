# GitHub Actions

GitHub Actions runs using workflows, which define jobs that we run for continuous integration (CI). Inside of our GitHub Actions, we have 4 different kinds of workflows:

-   [Core - Linting, Unit Tests, and Non-Snapshot Functional Tests](#linting-unit-tests-and-non-snapshot-functional-tests-core-yml)
-   [Snapshot Comparison](#snapshot-comparison-snapshot-compare-yml)
-   [Update Snapshots](#update-snapshots-snapshot-update-yml)
-   [Commit Snapshots](#commit-snapshots-snapshot-commit-yml)
-   [Release](#release-release-yml)

Snapshot-based workflows are split further by US and non-US due to the numerous offers that US has. This keeps our CI running quickly.

## Core - Linting, Unit Tests, and Non-Snapshot Functional Tests (core.yml)

This workflow runs two jobs.

`lintAndUnit`

1. Lints code to make sure it follows coding standards.
2. Runs unit tests to ensure code is working at a basic level.

`functionalNonSnapshot`

1. Runs non-snapshot functional tests to ensure that code works when it runs in the browser.

## Snapshot Comparison (snapshotCompare.yml)

This workflow runs two jobs.

`compareSnapshots`

1. Reads `matrix.json` and provides it as output.
2. Takes each locale and group to output a JSON array of valid testPathPatterns.

`compareSnapshots`

1. `compareSnapshots` reads the output of `getMatrix` to determine the tests to run.
2. The server is run.
3. Any failed comparison tests are collected and uploaded to imgur.

## Update Snapshots (snapshotUpdate.yml)

This workflow runs three jobs.

`getMatrix`

1. Reads `matrix.json` and provides it as output.
2. Takes each locale and group to output a JSON array of valid testPathPatterns.

`captureMetadata`

1. Saves the pull request number to a file.

`updateSnapshots`

1. Reads the output of `getMatrix` to determine which tests may need updating.
2. The server is run.
3. Any comparison tests that failed in Snapshot Comparison will have their images updated.
4. Saves updated images as artifacts (workflow storage).

## Commit Snapshots (snapshotCommit.yml)

This workflow runs one job.

`commit`

1. Downloads the snapshot image artifacts from `updateSnapshots`.
2. Removes the `snapshots` label.
3. Commits thee snapshot images.

## Release (release.yml)

This workflow runs three jobs.

`core`

1. See [Core - Linting, Unit Tests, and Non-Snapshot Functional Tests](#linting-unit-tests-and-non-snapshot-functional-tests-core-yml)

`compareSnapshots`

1. See [Snapshot Comparison](#snapshot-comparison-snapshot-compare-yml)

`release`

1. Runs semantic-release to create a new release

## Workflow Triggers

Triggers are what causes a workflow to run. These are the current triggers for each of our workflows.

-   Linting, Unit Tests, and Non-Snapshot Functional Tests
    -   `workflow_dispatch` - allows for manually running a workflow
    -   `push` - runs the workflow when code is pushed to `develop` or `release`
    -   `pull_request` - runs on all pull requests
-   Snapshot Comparison
    -   `workflow_dispatch` - allows for manually running a workflow
    -   `workflow_call` -
    -   `push` - runs the workflow when code is pushed to `develop` or `release`
    -   `pull_request` - runs on all pull requests
    -   **Note** - `push` and `pull_request` run US or non-US workflows if their related files are changed
-   Update Snapshots
    -   `workflow_dispatch` - allows for manually running a workflow
    -   `pull_request` - runs on all pull requests
    -   `pull_request_target` - runs on all pull requests from forks if the pull request has a label on it
    -   **Note** - this workflow only runs if it is labeled with `snapshots`
-   Commit Snapshots
    -   `workflow_run` - runs wheen another workflow finishes
-   Release
    -   `workflow_dispatch` - allows for manually running a workflow
    -   `push` - runs the workflow when code is pushed to `release`

## Other Notes

### Strategy Matrix

The strategy matrix makes it easy to run the same job with a different configuration.

This matrix is used to run snapshot tests for each locale and to split the US locale by various test path patterns. The `matrix` option is generated dynamically by reading in `matrix.json`. This is done so developers can change `locale` and `groups` in one place and every workflow using those options stays in sync.

You can read more in the [official docs here](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix).
