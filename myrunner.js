
/* global process */

import { console_output } from "./src/console_output.js";
import { console_report } from "./src/console_report.js";
import { TestSuite, Test } from "./src/testSuite.js";
import fs from 'fs';
import path from 'path'; // Import the path module

function getClassNames( obj ){
    let arr = Object.getOwnPropertyNames( obj );
    return arr;
}

let report = new console_report( new console_output() );

let testSuiteFilePath = process.argv[2]; // Get the full path to the test suite file
let {dir: testSuiteDir, name: testSuiteName} = path.parse( testSuiteFilePath ); // Parse the file path

//console.log("Directory:", testSuiteDir);
//console.log("Filename:", testSuiteName);

if( !fs.existsSync( testSuiteFilePath ) ) {
    console.log( "File does not exist: " + testSuiteFilePath );
    process.exit( 1 );
}
cargar( testSuiteFilePath );

function cargar( testSuiteFilePath ){
    let fn_error = function ( error ){
        console.error( "Error loading test suite:", error );
        process.exit( 1 );
    };
    
    let fn_then = function ( module ){
        let classNames = getClassNames( module );
        if( classNames.length === 0 ) {
            throw new Error( testSuiteFilePath + " does not contain any classes" );
        }
        let className = classNames[0];
        let suite = new module[className]( report );
        suite.setup();
        suite.start();
    };

    import( testSuiteFilePath ).then(  fn_then ).catch( fn_error );
}