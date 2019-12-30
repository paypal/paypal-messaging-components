echo TRAVIS_BRANCH
echo $TRAVIS_BRANCH
echo TRAVIS_PULL_REQUEST
echo $TRAVIS_PULL_REQUEST

if [[ "${DIRTY_SNAPSHOTS}" != "1" ]]; then 
    npm run test:func
elif [[ "${TRAVIS_PULL_REQUEST}" = "false" ]] && [[ "${TRAVIS_BRANCH}" = "develop" ]]; then
    npm run test:func -- -u
    
    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

    sed -i '' 's/DIRTY_SNAPSHOTS=1/DIRTY_SNAPSHOTS=0/g' .travis.yml

    git checkout develop
    git add .
    git commit -m "update snapshots [skip ci]"
    git push
fi