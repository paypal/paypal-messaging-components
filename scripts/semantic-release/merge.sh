#!/bin/bash
REPO_URL=$(echo $0 | sed "s/https:\/\///")

# Allows fetching and checking out other branches
git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Allows pushing to remote
git remote set-url origin https://${GH_TOKEN}@${REPO_URL}.git > /dev/null 2>&1

# Merge release changes into develop
git pull --depth=1 origin develop
git checkout develop
git merge release
git push origin develop
git checkout release