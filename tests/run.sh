#!/bin/bash
clear

NODE_V8_COVERAGE=/tmp/cca c8 -x tests/ -r html node ./myrunner.js  ./tests/myTestSuite.js
