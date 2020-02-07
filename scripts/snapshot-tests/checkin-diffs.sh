FAILED_SNAPSHOT_BRANCH=failed-snapshots

echo TRAVIS_TEST_RESULT
echo $TRAVIS_TEST_RESULT

# if [[ "$TRAVIS_TEST_RESULT" != "1" ]]; then 
    node ./tests/functional/utils/collectDiffs.js
    cd tests/functional/__diff_output__
    ls

    # git checkout $FAILED_SNAPSHOT_BRANCH
# fi