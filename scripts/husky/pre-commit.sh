#!/bin/bash
# check that git user info is set
if [[ "" == "$(git config --global user.name)" ]]; then
  echo >&2 'ERROR: your git user name is not set. Please set using:'
  echo >&2 'git config --global user.name "First Last"'
  echo >&2 'git config --global user.email username@paypal.com"'
  exit 1
fi

# run prettier and linting against staged files, and run tests
./node_modules/.bin/lint-staged && npm run test:unit
