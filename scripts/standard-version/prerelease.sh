#!/bin/bash
[ "$(git rev-parse --abbrev-ref HEAD)" != "release" ] && git checkout release
[ "$(git rev-parse --abbrev-ref HEAD)" != "release" ] && {
    echo "Must release from release branch. Please stash or commit your curent changes" >&2
    exit 1
}

git pull
npm run lint
npm run test