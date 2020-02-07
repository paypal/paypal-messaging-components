FAILED_SNAPSHOT_BRANCH=failed-snapshots

echo TRAVIS_TEST_RESULT
echo $TRAVIS_TEST_RESULT

if [[ "$TRAVIS_TEST_RESULT" != "0" ]]; then 
    node ./tests/functional/utils/collectDiffs.js

    mv tests/functional/__diff_output__ ..

    git checkout $FAILED_SNAPSHOT_BRANCH

    mv ../__diff_output__ tests/functional

    git add .

    git status
fi