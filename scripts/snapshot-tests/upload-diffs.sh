if [[ "$TRAVIS_TEST_RESULT" != "0" ]]; then     
    node ./tests/functional/utils/collectDiffs.js
fi