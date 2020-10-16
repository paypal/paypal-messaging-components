#!/bin/bash
set -ev

npm run test:func -- --testPathPattern $TEST_PATH_PATTERN
