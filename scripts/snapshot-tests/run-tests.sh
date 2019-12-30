if [[ "${DIRTY_SNAPSHOTS}" != "1" ]]; then 
    npm run test:func
elif [[ "${TRAVIS_PULL_REQUEST}" = "false" ]] && [[ "${TRAVIS_BRANCH}" = "develop" ]]; then
    npm run test:func -- -u
    
    git add .
    git commit -m "update snapshots [skip ci]"
    git push
fi