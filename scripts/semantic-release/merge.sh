#!/bin/bash
REPO_URL=$1

# Allows fetching and checking out other branches
git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Allows pushing to remote
git remote set-url origin ${REPO_URL} > /dev/null 2>&1

# Merge release changes into develop
git pull --depth=1 origin develop
git checkout develop
git merge release
git push origin develop
git checkout release