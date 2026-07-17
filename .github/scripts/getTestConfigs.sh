#!/bin/bash
set -ev

# lists all functional test configs and removes text leaving only {locale}/{account}
validTestConfigs=$(ls ./tests/functional/v2/config/*/DEV* | sed -E 's/(^.*config\/)//;s/.js//')

# transforms the list into a comma separated json array
# Note: When run on a Mac, newlines are not removed, so tr is needed to replace the newlines.
# But when run in Actions CI, newlines are replaced by spaces, so sed is needed to replace the spaces.
testConfigs="[ \"$(echo $validTestConfigs | tr '\n' ',' | sed 's/ /,/g;s/,$//;s/,/","/g' )\" ]"

echo $testConfigs
