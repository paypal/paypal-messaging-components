#!/bin/bash
! ([ "$CI" == "true" ] && [ "$TRAVIS" == "true" ]) && {
    echo "Must release through Travis CI."
    exit 1
}

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

# Allows fetching and checking out other branches
git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Allows pushing to remote
git remote set-url origin https://${GH_TOKEN}@github.com/paypal/paypal-messaging-components.git > /dev/null 2>&1

# Pull develop so that changes to release can be merged into it
git pull --depth=1 origin develop
git checkout release