#!/bin/bash
# Push release changes to remote
git push --follow-tags origin release

# Merge release changes into develop
git checkout develop
git merge release
git push origin develop