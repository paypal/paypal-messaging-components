#!/bin/bash

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
STAGED_COUNT="$(git diff --cached --numstat | wc -l | xargs)"
if [[ $CURRENT_BRANCH == "develop" ]] || [[ $CURRENT_BRANCH == "release" ]]; then 
    echo "Command should be run on a pull request branch only"
elif [[ $STAGED_COUNT != "0" ]]; then
    echo "Commit or unstage changes before running this command"
else 
    git commit --allow-empty --no-verify -m "[update snapshot]"
    git push
fi