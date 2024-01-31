#!/bin/bash
clear
# cd $( dirname $(readlink $0) )

RUTA=$(pwd)
cd ..

# 
        NODE_V8_COVERAGE=/tmp/cca c8 -x testsjs/ -x myjsunit/ -r html node ./myrunner.js  $RUTA/myTestSuite.js
        resultado=$?
        echo 
        echo resultado: \"$resultado\"
