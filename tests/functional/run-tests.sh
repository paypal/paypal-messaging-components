#!/bin/bash
PREVIOUS_COMMIT_MESSAGE="$(if [ $TRAVIS_EVENT_TYPE != 'api' ]; then git log --format=%B -n 1 HEAD^2; fi)"

if [ "$PREVIOUS_COMMIT_MESSAGE" == "update snapshot" ]; then 
    npm run test:func -- -u

    echo "Pushing updated snapshots to pull request branch"
    {
        # TODO: Update remote URL to main repo
        REPO_URL=https://${GH_TOKEN}@github.com/gillycheesesteak/paypal-messaging-components.git
        
        # Allows fetching and checking out other branches
        git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

        # Allows pushing to remote
        git remote set-url origin ${REPO_URL}

        # Switch to pull request branch
        git fetch origin $TRAVIS_PULL_REQUEST_BRANCH
        git checkout $TRAVIS_PULL_REQUEST_BRANCH

        # Commit new snapshots and push to repo
        git add ./tests/functional/snapshots
        git commit -m "chore: update snapshots [skip ci]"
        git push
    } &> /dev/null
else 
    npm run test:func
fi