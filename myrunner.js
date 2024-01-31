// this is needed for the testsuite constructor
// on a linux console -- konsole is suggested but it does not have to be under kde.
//import { console_report } from "./console_report.js";
//
///* global process */
//import { TestSuite, Test } from "./testSuite.js";
//
//
//import  fs from 'fs';
//
///* the objective is to have a single subclass of TestSuite on a single JS file.
// */
//function getClassNames( obj ){
//    let arr = Object.getOwnPropertyNames( obj );
//    return arr;
//}
//
//let report = new console_report();
//
///* test suite name comes as a second parameter:
// * 0 = script full path 
// * 1 = script name
// * 2 = first parameter
// */
//
//let testSuiteFileName = process.argv[2];
//console.log( "recibido:", testSuiteFileName )
//cargar( testSuiteFileName );
//
//function cargar( testSuiteFileName ){
//    if( !fs.existsSync( testSuiteFileName ) ) {
//        console.log( " no existe " + testSuiteFileName );
//        return;
//    } 
//    /*
//     * import returns a Promise. 
//     */
//    import( testSuiteFileName ).then( function ( module ){
//        // only the first one gets executed.
//        let lista = getClassNames( module );
//        if( lista.length === 0 ) {
//            throw new Error( testSuiteFileName + " no tiene clases definida" );
//        }
//        let classname = lista[0];
//        let suite = new module[classname]( report );
//        suite.start();
//    } );
//}



import { console_report } from "./console_report.js";
import { TestSuite, Test } from "./testSuite.js";
import fs from 'fs';
import path from 'path'; // Import the path module

function getClassNames(obj) {
    let arr = Object.getOwnPropertyNames(obj);
    return arr;
}

let report = new console_report();

let testSuiteFilePath = process.argv[2]; // Get the full path to the test suite file
let { dir: testSuiteDir, name: testSuiteName } = path.parse(testSuiteFilePath); // Parse the file path

//console.log("Directory:", testSuiteDir);
//console.log("Filename:", testSuiteName);

cargar(testSuiteFilePath);

function cargar(testSuiteFilePath) {
    if (!fs.existsSync(testSuiteFilePath)) {
        console.log("File does not exist: " + testSuiteFilePath);
        return;
    }

    import(testSuiteFilePath).then(function (module) {
        let classNames = getClassNames(module);
        if (classNames.length === 0) {
            throw new Error(testSuiteFilePath + " does not contain any classes");
        }
        let className = classNames[0];
        let suite = new module[className](report);
        suite.start();
    }).catch(error => {
        console.error("Error loading test suite:", error);
    });
}