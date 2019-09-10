#!/bin/bash

# Allows fetching and checking out other branches
git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Allows pushing to remote
git remote set-url origin https://${GH_TOKEN}@github.com/paypal/paypal-messaging-components.git > /dev/null 2>&1

# Merge release changes into develop
git pull --depth=1 origin develop
git checkout develop
git merge release
git push origin develop
git checkout release