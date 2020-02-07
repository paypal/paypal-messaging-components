FAILED_SNAPSHOT_BRANCH=failed-snapshots

echo TRAVIS_PULL_REQUEST
echo $TRAVIS_PULL_REQUEST
echo TRAVIS_REPO_SLUG
echo $TRAVIS_REPO_SLUG
echo TRAVIS_PULL_REQUEST_SLUG
echo $TRAVIS_PULL_REQUEST_SLUG


if [[ "$TRAVIS_TEST_RESULT" != "0" ]]; then 
    node ./tests/functional/utils/collectDiffs.js

    mv tests/functional/__diff_output__ ../snapshots

    git checkout $FAILED_SNAPSHOT_BRANCH
    git fetch
    git pull

    rm -r ./*
    mv ../snapshots .

    git add *

    COMMIT_DATE=$(date +"%Y-%m-%d %H:%M:%S")
    SNAPSHOT_COUNT=$(ls -1q ./snapshots | wc -l)

    if [[ "$TRAVIS_PULL_REQUEST" = "false" ]]; then
        git commit -m "$COMMIT_DATE: $SNAPSHOT_COUNT failed snapshots"

        git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
        git push --set-upstream origin $FAILED_SNAPSHOT_BRANCH

        SNAPSHOT_URL="https://github.com/${TRAVIS_REPO_SLUG}/tree/${FAILED_SNAPSHOT_BRANCH}/snapshots"
        echo "$SNAPSHOT_COUNT failed snapshots viewable at $SNAPSHOT_URL"
    else
        curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \
            -d "{\"body\": \"$SNAPSHOT_COUNT failed snapshots should be viewable at $SNAPSHOT_URL\"}" \
            "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
    fi
fi