#!/bin/bash
# this script needs "c8" for code coverage and inotifywait

clear

INOTIFY_PATH=$(which inotifywait)

if [ ! -x "$INOTIFY_PATH" ]; then
    echo "inotifywait is not installed."
    exit 1
fi


inotifywait -m --format %w%f  --exclude "(\.\*|_docs/|.git|nbproject|var/coverage/)" -q -r -e close_write ./  | \
while read CUAL ; do
    clear
    time NODE_V8_COVERAGE=/tmp/cca c8  -o var/coverage  -x tests/ -r html node ./myrunner.js  ./tests/myTestSuite.js
        
done 

