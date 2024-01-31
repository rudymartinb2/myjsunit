#!/bin/bash
clear
# cd $( dirname $(readlink $0) )

RUTA=$(pwd)
# 
echo $RUTA 

cd .. 
inotifywait -m --format %w%f  --exclude "(\.\*|scripts/|cca/|./log/|./logs/|tests/out|_docs/|.git|_docs|nbproject|coverage)" -q -r -e close_write ../  | \
while read CUAL ; do
    
    if [ $? == 0 ]; then 
        clear
#echo $CUAL
#echo RUTA $RUTA 
        NODE_V8_COVERAGE=/tmp/cca c8 -x testsjs/ -x myjsunit/ -r html node ./myrunner.js  $RUTA/myTestSuite.js
        resultado=$?
        echo 
        echo resultado: \"$resultado\"
        #if [ $resultado == 0 ]; then
	     
#            git add .
#            git commit -m "autocommit x pruebas OK"
        #fi

    fi
done 

