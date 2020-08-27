#!/bin/bash
# https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
# set -Eevxo

OUTPUT_FILE=test_output.log
ERROR_FILE=test_errors.log

showFailures () {
    failedCount=$(grep failed $OUTPUT_FILE | wc -l)
    if [[ $failedCount -gt 0 ]]; then
        echo ''
        echo 'FAILURES FOUND';
        node ./tests/functional/utils/collectFailedTests.js

        echo ''
        snapCount=$(grep -h __diff_output__ $ERROR_FILE -B 1 | wc -l)
        if [[ $snapCount -gt 0 ]]; then
            echo 'FULL LIST OF FAILED SNAPSHOTS'
            grep -h __diff_output__ $ERROR_FILE -B 1
        else
            echo 'NO FAILED SNAPSHOTS'
        fi
        exit 1
    fi
}

if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    npm run test:func:payload 2> $ERROR_FILE | tee $OUTPUT_FILE

    node ./tests/functional/utils/collectDiffs.js

    showFailures
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
        npm run test:func:payload 2> $ERROR_FILE | tee $OUTPUT_FILE

        showFailures
    fi
fi
