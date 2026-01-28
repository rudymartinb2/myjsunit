#!/bin/bash

# sample auto test runner on file write
# should run from project root.

clear

# required commands
command -v inotifywait >/dev/null || exit 1
command -v node >/dev/null || exit 1
command -v c8 >/dev/null || exit 1

mkdir -p var


# updateas needed
RUN_TESTS=./tests/run_tests.sh

$RUN_TESTS


inotifywait -m --format %w%f --exclude "(\.\*|_docs/|.git|nbproject|var/coverage/)" -q -r -e close_write ./ |
while read FILE 
do
    clear
    echo "trigger: $FILE"
    $RUN_TESTS
done
