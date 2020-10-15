#!/bin/bash
set -ev

echo ''
rm -r ./tests/functional/__diff_output__
find ./tests/functional/snapshots -type d | grep -h __diff_output__ > $DIFF_FOLDERS_LIST
diffFolderCount=$(wc -l < $DIFF_FOLDERS_LIST)
echo 'DIFF FOLDERS FOUND'
cat $DIFF_FOLDERS_LIST
echo ''

echo ''
find ./tests/functional/ -type f -name '*png' | grep -h __diff_output__ > $DIFF_FILES_LIST
diffFileCount=$(wc -l < $DIFF_FILES_LIST)
echo "DIFF FILES FOUND ($diffFileCount found)"
cat $DIFF_FILES_LIST
echo ''

node ./tests/functional/utils/collectDiffs.js

if [[ $diffFileCount -gt 0 ]]; then
    exit 1
fi
