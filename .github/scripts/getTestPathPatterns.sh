#!/bin/bash
set -ev

# lists all functional test paths and then removes text leaving only {locale}/{type}/{subtype}
validTestPaths=$(find ./tests/functional/spec -name '*.test.js' | grep -v non-snapshot-tests | sed -E 's/(^.*spec\/|.test.js$)//g')
# transforms the list into a comma separated json array
# Note: When run on a Mac, newlines are not removed, so tr is needed to replace the newlines.
# But when run in Actions CI, newlines are replaced by spaces, so sed is needed to replace the spaces.
testPathPatterns="[ \"$(echo $validTestPaths | tr '\n' ',' | sed 's/ /,/g;s/,$//;s/,/","/g' )\" ]"

echo $testPathPatterns
