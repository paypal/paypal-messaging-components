#!/bin/bash
GIT_REMOTE="git@github.com:$TRAVIS_REPO_SLUG.git"
GIT_COMMIT_HASH=$TRAVIS_COMMIT

echo "Remote: $GIT_REMOTE"
echo "Commit Hash: $GIT_COMMIT_HASH"

# Put everything in a block to suppress all output
{
    # Allows fetching and checking out other branches
    git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

    # Allows pushing to remote
    git remote set-url origin $GIT_REMOTE

    # Merge changes into develop
    git pull --depth=1 origin develop
    git checkout develop
    git merge $GIT_COMMIT_HASH
    git push origin develop
    # Return back to the original branch for further script executions
    git checkout -
} &> /dev/null