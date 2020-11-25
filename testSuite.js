import { myclock } from "./myclock.js";
import { console_report } from "./console_report.js";

/* helper function to get methods names starting with "test" 
 * from an object
 */
const getMethods = function (obj)  {
    let properties = new Set();
    let currentObj = obj;
    do { Object.getOwnPropertyNames( currentObj ).map( function( item ) { properties.add(item); } ); } 
    while ( (currentObj = Object.getPrototypeOf( currentObj ) )  )
    return [...properties.keys()].filter( 
        function ( item ) {
            return typeof obj[item] === 'function' && item.substring(0, 4) === "test";
        } 
    );
};


export class TestSuite {

    constructor( report ){
        if( report === undefined ){
            throw "Report object was not defined !!!";
        }
        this.tests = [];
        this.stopError = false;
        this.report = report;
    }

    addTest( testName ){
        this.tests.push( testName );
    }

    run(){
        
        this.config();
        var report = this.report;

        report.header();

        /*
         * for earch test object
         * get the list of methods whose name start with "test"
         * and run it.
         */
        var self = this;

        /* TODO: should I create one object per method invocation ??
         */
        this.tests.forEach( function( testClass ){
            var methods;
            var class_name = testClass.constructor.name;

            // stop on error?
            if( self.stopError && report.failed > 0 ){
                return ;
            }

            methods = getMethods( testClass );
            
            methods.forEach( function( method ){
                // stop on error?
                if( self.stopError && report.failed > 0 ){
                    return ;
                }
                report.total();
                testClass.numberofAsserts = 0;
                testClass.anyAssert = false;

                /* I hate having to use try/catch
                 * but we have no option here 
                 * since we want to keep running all test methods
                 * and then print the report of what happened 
                 */
                try {
                    testClass.runTest( method );
                    report.ok();
                    if( testClass.anyAssert ){
                        report.dot();
                    } else {
                        report.add_error(  class_name+":"+method+" "+": OK but no assertions were made!\n" );
                        report.risky();
                    }
                } catch ( e ){
                    report.failed();
                    report.add_error(  class_name+":"+method+" "+": "  );
                    report.add_error(  e );
//                    report.add_error( "" );
                }
                report.add_timer( class_name, method, testClass.timer );

                report.assertsRun( testClass.numberofAsserts );
            });
        } );
        if( self.stopError && report.failed > 0 ){
            report.add_error(  "Test suite stopped on first error per testsuite.config()"  );
        }


        report.end();
    }
};

export class Test {
    constructor(){
        this.numberofAsserts = 0;
        this.anyAssert = false;
    }
    runTest( method ){
        var timer = new myclock();
        timer.start();
        this[method]();
        timer.stop();
        this.timer = timer;
    }
    assertTrue( condicion, mensaje = "" ){
        this.numberofAsserts++;
        this.anyAssert = true;
        if( mensaje === ""){
            mensaje = "assertTrue fails"; 
        }
        if( ! condicion ){
            throw new Error( mensaje );
        }
    }
    assertFalse( condicion, mensaje = ""){
        this.assertTrue( !condicion, mensaje );
    }

    assertEquals( expected, actual, mensaje = ""){
        this.numberofAsserts++;
        this.anyAssert = true;

        mensaje = "assert that "+actual+" is "+expected;
        if( expected !== actual ){
            throw new Error( mensaje );
        }
    }
    
    // TODO: remove?
    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }

}
