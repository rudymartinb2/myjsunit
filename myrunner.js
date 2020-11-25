import fs from 'fs';
// this is needed for the testsuite constructor
// on a linux console
import { console_report } from "./console_report.js";
/* global process */
import { TestSuite, Test } from "./testSuite.js" ;


const getMethods = function (obj)  {
	let properties = new Set()
	let currentObj = obj
	do { Object.getOwnPropertyNames( currentObj ).map( function( item ) { properties.add(item); } ) } 
	while ( ( currentObj = Object.getPrototypeOf( currentObj ) )  )
	  return [ ...properties.keys() ];
}

let report = new console_report();


let tempFileName;
/* test suite name comes as a second parameter:
 * 0 = script full path
 * 1 = script name
 * 2 = first parameter
 */
tempFileName = process.argv[2];


import(tempFileName).then( function( module ) {
    	var suite;
    	var classname;
    	classname = getMethods( module  )[0];
    	suite = new module[classname]( report );
    	suite.start();
	} );
    
