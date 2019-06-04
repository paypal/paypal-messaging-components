#!/bin/bash
current_branch() {
    return "$(git rev-parse --abbrev-ref HEAD)"
}

[ current_branch != "release" ] && git checkout release
[ current_branch != "release" ] && {
    echo "Must release from release branch. Please stash or commit your curent changes" >&2
    exit 1
}

git pull
npm run lint
npm run test