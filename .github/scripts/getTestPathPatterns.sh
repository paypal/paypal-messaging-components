#!/bin/bash

# lists all functional test paths and then removes text leaving only {locale}/{type}/{subtype}
validTestPaths=$(ls ./tests/functional/spec/*/*/*.test.js | sed -E 's/(.*spec\/|.test.js)//g')
# transforms the list into a comma separated json array
testPathPatterns="[ \"$(echo $validTestPaths | tr '\n' ',' | sed 's/ /,/g;s/,$//;s/,/","/g' )\" ]"

echo $testPathPatterns
