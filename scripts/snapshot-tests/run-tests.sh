#!/bin/bash
# https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
# set -Eevxo

if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    npm run test:func 2> test_errors.log | tee test_output.log

    node ./tests/functional/utils/collectDiffs.js

    failed_count=$(grep failed test_output.log | wc -l)
    if [[ $failed_count -gt 0 ]]; then
        echo 'FAILURES FOUND';
        grep FAIL test_output.log
        echo ''
        echo 'FULL LIST OF FAILURES'
        cat test_errors.log
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
        npm run test:func:payload 2> test_errors.log | tee test_output.log

        failed_count=$(grep failed test_output.log | wc -l)
        if [[ $failed_count -gt 0 ]]; then
            echo 'FAILURES FOUND';
            grep FAIL test_output.log
            echo ''
            echo 'FULL LIST OF FAILURES'
            cat test_errors.log
            exit 1
        fi
    fi
fi
