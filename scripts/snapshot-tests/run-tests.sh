set -ev

if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    echo "About to run test:func"
    npm run test:func
    echo "About to collect diffs"
    node ./tests/functional/utils/collectDiffs.js
    echo "Diffs collected"
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
        npm run test:func:payload
    fi
fi
