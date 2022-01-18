#!/bin/bash

# lists all functional test paths and then removes text leaving only {locale}/{type}/{subtype}
validTestPaths=$(find ./tests/functional/spec -name '*.test.js' | grep -v non-snapshot-tests | sed -E 's/(^.*spec\/|.test.js$)//g')
# transforms the list into a comma separated json array
testPathPatterns="[ \"$(echo $validTestPaths | tr '\n' ',' | sed 's/ /,/g;s/,$//;s/,/","/g' )\" ]"

echo $testPathPatterns
