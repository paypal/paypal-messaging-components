#!/bin/bash
set -ev

if [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

    echo -e '\nUPDATE GIT REPO\n'
    git checkout --quiet develop
    git add .
    git commit --quiet -m "chore(snapshots): update $COMMIT_DETAIL snapshots [skip ci]"
    git push -v
fi
