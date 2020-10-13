#!/bin/bash
# https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
# set -Eevxo

OUTPUT_FILE=test_output.log
DIFF_FOLDERS_LIST=diff_folders.log
DIFF_FILES_LIST=diff_files.log

showFailures () {
    failedCount=$(grep failed $OUTPUT_FILE | wc -l)
    if [[ $failedCount -gt 0 ]]; then
        echo ''
        echo 'FAILURES FOUND';
        node ./tests/functional/utils/collectFailedTests.js
        echo ''

        echo ''
        snapCount=$(grep -h __diff_output__ $OUTPUT_FILE | wc -l)
        echo "FULL LIST OF FAILED SNAPSHOTS ($snapCount found)"
        grep -h __diff_output__ $OUTPUT_FILE -B 1
        echo ''
    fi
}

printFullLogs () {
    echo ''
    echo 'FULL OUTPUT LOGS'
    cat $OUTPUT_FILE
    echo ''
}

exitOnFailure () {
    failedCount=$(grep failed $OUTPUT_FILE | wc -l)
    if [[ $failedCount -gt 0 ]]; then
        exit
    fi
}

if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    npm run test:func 2> $OUTPUT_FILE | tee $OUTPUT_FILE

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

    showFailures

    printFullLogs

    exitOnFailure
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
        npm run test:func:nosnaps 2> $OUTPUT_FILE | tee $OUTPUT_FILE

        showFailures

        printFullLogs

        exitOnFailure
    fi
fi
