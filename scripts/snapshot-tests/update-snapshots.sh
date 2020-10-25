#!/bin/bash
set -ev

OLD_SNAPSHOT_FILES_LIST=snapshot_files.log

if [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    echo 'REMOVE OLD SNAPSHOTS'
    find ./tests/functional/ -type f -name '*png' > $OLD_SNAPSHOT_FILES_LIST
    while read oldSnapshot; do
        rm $oldSnapshot;
    done < $OLD_SNAPSHOT_FILES_LIST

    echo 'UPDATE NEW SNAPSHOTS'
    npm run test:func -- -u

    # Uses GNU sed syntax
    sed -i -e 's/DIRTY_SNAPSHOTS=1/DIRTY_SNAPSHOTS=0/g' .travis.yml

    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

    git checkout develop
    git add .
    git commit -m "chore(snapshots): update snapshots [skip ci]"
    git push
fi
