#!/bin/bash
clear

# run this script as:
# $ npm test 
# or
# $ node ./myrunner.js tests/myTestSuite.js

# Obtener la ruta real del script

INOTIFY_PATH=$(which inotifywait)

# Verificar si inotifywait está instalado
if [ ! -x "$INOTIFY_PATH" ]; then
    echo "inotifywait is not installed."
    exit 1
fi


inotifywait -m --format %w%f  --exclude "(\.\*|_docs/|.git|nbproject|coverage)" -q -r -e close_write ./  | \
while read CUAL ; do
    clear
    time NODE_V8_COVERAGE=/tmp/cca c8 -x tests/ -r html node ./myrunner.js  ./tests/myTestSuite.js
#    resultado=$?
#    echo 
#    echo resultado: \"$resultado\"
    # TODO: si resultado no es 0 entonces mandar a git ?
        
done 

