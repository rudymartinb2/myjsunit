/* 
 * 
 * 
 */


import { console_report } from "./console_report.js";
import { myclock } from "./myclock.js";

import { Test, TestBad  } from "./Test.js";


class TestSuite {


    // dump slow tests
//    dump_test_time( txt, tiempo ){
////        if( !this.#mostrar_tiempos ) {
////            return;
////        }
////        this.report.add_error( txt, tiempo ); // parche para imprimir los tiempos de cada test
//    }

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
    addTest( test_modulo ){

        this.is_function( test_modulo );

        let name = test_modulo.name;

        /*
         * if you run the myjsunit test suite (the one inside the package)
         * you will notice some strange module names like ("module" or "module2"). 
         * those are emulated from tests
         */
        this.#tests_constructor[ name ] = function ( method ){
            return test_modulo.create( method );
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
            this.report.end();
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

        // deberia haber sido un int para llevar la cantidad de run ners en lugar de boolean
        this.#running = true;

        let report = this.report;

        let one_fail = false;

        let tests = Object.keys( this.#tests_constructor );
//        self.debug( "tests ", this.tests_fn );


        tests.forEach( function ( name_constructor ){
//            console.log( constructor_fn, typeof constructor_fn  )
            if( one_fail ) { // stop at first fail ?
                return;
            }
            
            
            let test_constructor = self.#tests_constructor[ name_constructor ];
            let test = test_constructor(); // nueva instanacia del TestCase
            let class_name = test.constructor.name;

//            self.debug( "class_name ", class_name );



            let metodos = test.getTestMethods( );

//            self.debug( "metodos ", metodos );

            metodos.forEach( function ( metodo ){
                let counters = report.get_counters();
                counters.inc_tests();
//                report.total(); // inc cant tests

//                let runner = test_constructor( name_constructor, metodo ); // nueva instanacia del TestCase
                let runner = test_constructor( metodo ); // nueva instanacia del TestCase
                
                runner.set_report( report );
                
                runner.set_suite( self );
                
                runner.start( metodo );
                
                let timer  = runner.get_timer();
                
                report.add_timer( name_constructor, metodo, timer );

                self.#runners[class_name + "." + metodo] = runner;
                

                

                

                try {
                    runner[metodo]();
                } catch( e ) {
                    one_fail = true;

                    report.add_error( name_constructor + ":" + metodo );
                    report.add_error( e );
                    runner.done_fail();
                }

                if( runner.failed ) {
                    one_fail = true;
                }
            } );

        } );

        // 
        this.#running = false;

        /* border case: just 1 test 
         * done() should be executed before reaching this line
         */
        if( this.is_all_done( ) ) {
            this.report.end();
            return;
        }

    }
    
    
    #runners = {};

    #running = false;

    debug( ...txt ){
//        console.log( ...txt );
    }

    
    
    show_times(){
//        this.#mostrar_tiempos = true; 
    }
//    #mostrar_tiempos = false; 

    
    #tests = [ ];
    report = null;
    
    set_report( r ){
        this.report = r;
    }
    
    get_report( ){
        return this.report;
    }
    
    setup(){
        var report = new console_report();
        report.header();

        this.set_report( report );
    }


}




export { TestSuite, Test, TestBad }