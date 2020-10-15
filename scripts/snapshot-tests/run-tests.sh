#!/bin/bash
set -ev

# TODO add commands to push HTML reports to a hosting branch/repo

DIFF_FOLDERS_LIST=diff_folders.log
DIFF_FILES_LIST=diff_files.log

if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    npm run test:func

    echo ''
    rm -r ./tests/functional/__diff_output__
    find ./tests/functional/snapshots -type d | grep -h __diff_output__ > $DIFF_FOLDERS_LIST
    diffFolderCount=$(wc -l < $DIFF_FOLDERS_LIST)
    echo 'DIFF FOLDERS FOUND'
    cat $DIFF_FOLDERS_LIST
    echo ''

    echo ''
    find ./tests/functional/ -type f -name '*png' | grep -h __diff_output__ > $DIFF_FILES_LIST
    diffFileCount=$(wc -l < $DIFF_FILES_LIST)
    echo "DIFF FILES FOUND ($diffFileCount found)"
    cat $DIFF_FILES_LIST
    echo ''

    node ./tests/functional/utils/collectDiffs.js

    if [[ $diffFileCount -gt 0 ]]; then
        exit 1
    fi
else
    if [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
        npm run test:func -- -u

        # Uses GNU sed syntax
        sed -i -e 's/DIRTY_SNAPSHOTS=1/DIRTY_SNAPSHOTS=0/g' .travis.yml

        git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

        git checkout develop
        git add .
        git commit -m "chore(snapshots): update snapshots [skip ci]"
        git push
    else
        npm run test:func:nosnaps
    fi
fi
