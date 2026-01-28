#!/bin/bash

# I like to place temporary files under "var" inside a project directory tree. But it's up to you where you want it.
# just remember to include it on .gitignore and inotifywait exclusions if you place them in the project directory.
# the main advantage is to be able to create a browser bookmark with the report of the code coverage, mentioned at the bottom.
COVERAGE_DIR=var/coverage

mkdir -p $COVERAGE_DIR

# for this to work myjsunit must be installed in the current project 
RUNNER=./node_modules/myjsunit/myrunner.js

# update as needed
SUITE=./tests/sampleTestSuite.js

# we have to assume "time" does exist.
time NODE_V8_COVERAGE=/tmp/cca c8 -x tests/ -o $COVERAGE_DIR -r html node $RUNNER $SUITE

NODE_V8_COVERAGE=/tmp/cca c8 report -r text-summary > $COVERAGE_DIR/coverage-summary.txt

cat $COVERAGE_DIR/coverage-summary.txt

echo
echo "coverage details in html format: " "file://$(pwd)/$COVERAGE_DIR/index.html"
echo
echo Done!