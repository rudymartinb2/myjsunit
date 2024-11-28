/* 
 * 2024 03 07
 * heavy refactor. 
 * still looking for a way to extract as much classes as possible.
 * 
 */


import { console_report } from "./console_report.js";
import { types } from "./types.js";


import { Test, TestBad, TestCase  } from "./Test.js";


class TestSuite {

    #tests_constructors = {};
    
    // capitalized just to avoid conflict with "constructor" 
    // TODO: is addTest() the rigth name ? we are passing a whole "module" to it ...
    addTest( Constructor ){
        types.is_function( Constructor, "addTest() must receive a constructor function.-" );

        let name = Constructor.name;

        this.#tests_constructors[ name ] = function ( method ){
            return Constructor.create( method );
        };
    }

    /* runs when a test executes .done() 
     * 
     * verify if we are really done.
     * if there's no output after test suite run, 
     *  it means a test is not executing done()
     */
    check_done(  ){
        if( this.#running ) { // this.run() is not over yet
            return false;
        }

        let all_done = this.is_all_done(  );
        if( all_done ) {
            this.#report.end();
        }
        return all_done;
    }

    is_all_done(  ){
        let self = this;
        for( const key in self.#runners ) {
            let test = self.#runners[ key ];
            if( !test.is_all_done() ) {
                return false;
            }
        }
        return true;
    }

    forEachTestMethod( methods, name_constructor ){
        let self = this;

        let one_fail = false;
        
        // TODO: replace forEach with for() and break 
        methods.forEach( function ( method ){
            let report = self.#report;
            

            if( one_fail ) {
                return;
            }
            let counters = report.get_counters();
            counters.inc_tests();

            // we need another new instance of testcase just for this method
            let test_constructor = self.#tests_constructors[ name_constructor ];
            let runner = test_constructor( method );

            runner.set_report( report );
            runner.set_suite( self );

            runner.start();

            self.#runners[name_constructor + "." + method] = runner;

            try {
                runner[method]();
            } catch( e ) {
                one_fail = true;
                report.add_error( name_constructor + ":" + method );
                report.add_error( e );
                runner.done_fail();
            }

            if( runner.has_failed() ) {
                one_fail = true;
            }
        } );
        return one_fail;
    }

    run( ){
        let self = this;

        this.#running = true;

        let testCases = Object.keys( this.#tests_constructors );

        let one_fail = false;

        testCases.forEach( function ( name_constructor ){
            if( one_fail ) { // stop at first fail 
                return;
            }

            let test_constructor = self.#tests_constructors[ name_constructor ];

            // create() TestCase just to get the list of test methods
            let testCase = test_constructor();

            let methods = testCase.getTestMethods( testCase );

            one_fail = self.forEachTestMethod( methods, name_constructor );

        } );

        // 
        this.#running = false;

        /* border case: just 1 test 
         * done() should be executed before reaching this line
         * 
         * update: prolly not needed anymore
         */
        if( this.is_all_done( ) ) {
            this.#report.end();
            return;
        }

    }

    #runners = {};

    #running = false;

    #report = null;

    set_report( r ){
        this.#report = r;
    }

    // runs from /myrunner.js
    setup(){
        let report = new console_report();
        report.header();

        this.set_report( report );
    }

}


export { TestSuite, Test, TestBad, TestCase }