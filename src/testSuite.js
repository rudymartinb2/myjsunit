/* 
 * 
 * 
 */


import { console_report } from "./console_report.js";


import { Test, TestBad  } from "./Test.js";


class TestSuite {

    is_function( obj ){
        if( typeof obj !== "function" ) {
            throw new Error( "addeTest() must receive a function.-" );
        }
    }

    /*
     * testSuite hace esto:
     * 
     import { console_report_Test } from "./src/console_report_Test.js" ;
     y luego:
     this.addTest( console_report_Test  );
     */
    #tests_constructor = {};
    addTest( test_module ){

        this.is_function( test_module );

        let name = test_module.name;

        /*
         * if you run the myjsunit test suite (the one inside the package)
         * you will notice some strange module names like ("module" or "module2"). 
         * those are emulated from tests
         */
        this.#tests_constructor[ name ] = function ( method ){
            return test_module.create( method );
        };
    }
    

    /*
     * verify if we are really done
     * 
     * if there's no output after test run, it means a test is not executing done()
     */
    check_done( test ){
        test.print_dot( test );

        if( this.#running ) { // this.run() is not over yet
            return false;
        }
        
        /*
         */
        let all_done = this.is_all_done(  );
        if( all_done ) {
            this.#report.end();
        }
        return all_done;
    }

    is_all_done(  ){
        let self = this;
        let control = true;
        let keys = Object.keys( this.#runners );
        keys.forEach( function ( key ){
            // no point in checking the rest if just one test is not done
            if( ! control ){ 
                return;
            }
            
            let test = self.#runners[ key ];
            if( !test.is_all_done() ) {
                control = false;
            }
        } );
        return control;
    }

    run( ){
        let self = this;

        this.#running = true;

        let report = this.#report;

        

        let tests = Object.keys( this.#tests_constructor );
//        self.debug( "tests ", this.tests_fn );


        let one_fail = false;
        
        /*
         * I do not like the fact I am doing a forEach inside a forEach
         */
        tests.forEach( function ( name_constructor ){
//            console.log( constructor_fn, typeof constructor_fn  )
            if( one_fail ) { // stop at first fail 
                return;
            }
            
            let test_constructor = self.#tests_constructor[ name_constructor ];
            
            // create() TestCase just to get the list of test methods
            let test = test_constructor(); 

            let methods = test.getTestMethods( );

            methods.forEach( function ( method ){
                let counters = report.get_counters();
                counters.inc_tests();

                // another new instance of testcase
                let runner = test_constructor( method ); 
                
                runner.set_report( report );
                runner.set_suite( self );
                
                runner.start( method );
                
                let timer  = runner.get_timer();
                report.add_timer( name_constructor, method, timer );

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

        } );

        // 
        this.#running = false;

        /* border case: just 1 test 
         * done() should be executed before reaching this line
         * 
         * update: prolly not needed anymore
         */
//        if( this.is_all_done( ) ) {
//            this.#report.end();
//            return;
//        }

    }
    
    
    #runners = {};

    #running = false;

    
    #tests = [ ];
    #report = null;
    
    set_report( r ){
        this.#report = r;
    }
    
    
    setup(){
        var report = new console_report();
        report.header();

        this.set_report( report );
    }


}




export { TestSuite, Test, TestBad }