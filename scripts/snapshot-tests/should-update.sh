#!/bin/bash

PARENT_COMMIT_COUNT="$(git log --format=%P HEAD -n 1 | wc -w | xargs)"

# When we are operating on a merge commit, target the last commit in the PR branch
PREVIOUS_COMMIT_TARGET="$(if [[ $PARENT_COMMIT_COUNT == "2" ]]; then echo HEAD^2; else echo HEAD; fi)"

PREVIOUS_COMMIT_MESSAGE="$(git log --format=%B -n 1 $PREVIOUS_COMMIT_TARGET)"

if [[ $PREVIOUS_COMMIT_MESSAGE == "[update snapshot]" ]]; then 
    echo "Found trigger commit"
    echo "::set-env name=UPDATE_SNAPSHOT::1"
else
    echo "Didn't find trigger commit message, skipping snapshot update..."
fi