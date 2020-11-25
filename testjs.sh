#!/bin/bash

clear
inotifywait -m --format %w%f -q -r -e close_write $1 $2 $3 | \
while read CUAL ; do
    if [ $? == 0 ]; then
        clear
        node myrunner.js  ./myTestSuite.js
    fi
done 

