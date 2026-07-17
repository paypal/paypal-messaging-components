#!/bin/bash
set -euo pipefail

branch="${SNAPSHOT_BRANCH:-${GITHUB_HEAD_REF:-${GITHUB_REF_NAME:-}}}"
locale=""
version=""

if [[ "$branch" =~ ^locale-baselines-(v1|v2)-([a-z]{2})$ ]]; then
    version="${BASH_REMATCH[1]}"
    locale="${BASH_REMATCH[2]}"
elif [[ "$branch" =~ ^locale-baselines-([a-z]{2})$ ]]; then
    locale="${BASH_REMATCH[1]}"
fi

locale="$(printf '%s' "$locale" | tr '[:lower:]' '[:upper:]')"

echo "locale=$locale" >> "$GITHUB_OUTPUT"
echo "version=$version" >> "$GITHUB_OUTPUT"