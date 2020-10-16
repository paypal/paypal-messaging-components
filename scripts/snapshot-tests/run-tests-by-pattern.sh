#!/bin/bash
set -ev

echo $TEST_PATH_PATTERN
npm run test:func -- --testPathPattern $TEST_PATH_PATTERN
