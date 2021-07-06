#!/bin/bash
set -ev

if [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"


    echo -e "STASH CHANGES\n"
    git stash 
    echo -e "CHECKOUT GIT REPO\n"
    git checkout --quiet develop
    echo -e "POP STASH\n"
    git stash pop
    echo -e "ADD FILES\n"
    git add .
    echo -e "COUNT STAGED FILES\n"
    staged_file_count=$(git diff --cached --numstat | wc -l)
    if [ "$staged_file_count" -ne "0" ]; then
        echo -e "COMMIT STAGED FILES (COUNT: $staged_file_count)\n"
        git commit --quiet -m "chore(snapshots): update $COMMIT_DETAIL [skip ci]"
        echo -e "PUSH COMMIT"
        git push -v
    else
        echo -e "NO STAGED FILES FOUND, SKIPPING COMMIT FOR $COMMIT_DETAIL \n"
    fi;
fi
