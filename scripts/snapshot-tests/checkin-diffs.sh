FAILED_SNAPSHOT_BRANCH=failed-snapshots

if [[ "$TRAVIS_TEST_RESULT" != "0" ]]; then 
    node ./tests/functional/utils/collectDiffs.js

    mv tests/functional/__diff_output__ ..

    git checkout -b $FAILED_SNAPSHOT_BRANCH

    COMMIT_DATE=$(date +"%Y-%m-%d %H:%M:%S")
    SNAPSHOT_COUNT=$(ls -1q | wc -l)

    mv ../snapshots .

    git add .

    git commit -m "$COMMIT_DATE: $SNAPSHOT_COUNT failed snapshots"

    git status
fi