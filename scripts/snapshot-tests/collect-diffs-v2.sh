#!/bin/bash
set -ev

# $? is output of the previous command
# grep outputs 1 (failure) on no output
# so [[ $? == 1 ]] reverses that

DIFF_FOLDERS_LIST=diff_folders.log
DIFF_FILES_LIST=diff_files.log
SNAPSHOT_DIFF_PATH=./tests/functional/v2/__diff_output__

touch $DIFF_FOLDERS_LIST
touch $DIFF_FILES_LIST

rm -rf $SNAPSHOT_DIFF_PATH
mkdir -p $SNAPSHOT_DIFF_PATH/banner
mkdir -p $SNAPSHOT_DIFF_PATH/modal

# list all __diff_output__ folders under tests/functional/snapshots
find ./tests/functional/v2/snapshots -type d | (grep __diff_output__ || [[ $? == 1 ]]) > $DIFF_FOLDERS_LIST
diffFolderCount=$(wc -l < $DIFF_FOLDERS_LIST)
echo -e "\nDIFF FOLDERS FOUND ($diffFolderCount found)\n"
cat $DIFF_FOLDERS_LIST
echo ''

# list all snapshot files with differences under tests/functional/snapshots
find ./tests/functional/v2 -type f -name '*png' | (grep -h __diff_output__ || [[ $? == 1 ]]) > $DIFF_FILES_LIST
diffFileCount=$(wc -l < $DIFF_FILES_LIST)
echo -e "\nDIFF FILES FOUND ($diffFileCount found)\n"
cat $DIFF_FILES_LIST
echo ''

node ./tests/functional/v2/utils/collectDiffs.js

if [[ $diffFileCount -gt 0 ]]; then
    echo -e '\nDiffs found, exiting with failure\n'
    exit 1
fi
