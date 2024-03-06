/* 
 * 2024 02 26 rmb
 * 
 * intento de refactor. 
 * objetivos:
 * 
 * cambiar Test a TestCases
 * sacar TestRunner y hacer un merge con TestCases
 * 
 * 
 */


import { console_report } from "./console_report.js";
import { myclock } from "./myclock.js";

import { Test, TestBad  } from "./Test.js";


class TestSuite {

    setup(){
        var report = new console_report();
        report.header();

        this.report = report;
    }

    show_times(){
        this.#mostrar_tiempos = true; 
    }
    #mostrar_tiempos = false; 

    // dump slow tests
    dump_test_time( txt, tiempo ){
        if( !this.#mostrar_tiempos ) {
            return;
        }
        this.report.add_error( txt, tiempo ); // parche para imprimir los tiempos de cada test
    }

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
    tests_fn = {};
    addTest( test_modulo ){
        let self = this;
        this.is_function( test_modulo );

        let name = test_modulo.name;

//        self.debug( "addTest class_name ", name );

        this.tests_fn[ name ] = function ( class_name, method ){
//            self.debug( "fn class_name ", name );
            return test_modulo.create( class_name, method );
        };
    }

    #print_dot( test ){
        let report = this.report;
        if( test.failed ) {
            report.failed();
            return;
        }

        report.ok();
        if( test.any_assert() ) {
            report.dot();
            return;
        }
        report.add_error( test.class_name + ":" + test.metodo + "() : OK but no assertions were made!\n" );
        report.risky();
        return;
    }

    /*
     * verify if we are really done
     * 
     * if there's no output after test run, it means a test is not executing done()
     */
    check_done( test ){
        this.#print_dot( test );

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
            let test = self.#runners[ key ];
            if( !test.is_all_done() ) {
                self.report.add_error( "Test Case not done(): " + key );
                control = false;
            }
        } );
        return control;
    }

    #runners = {};

    #running = false;

    debug( ...txt ){
//        console.log( ...txt );
    }

    run( ){
        let self = this;

        // deberia haber sido un int para llevar la cantidad de run ners en lugar de boolean
        this.#running = true;

        let report = this.report;

        let one_fail = false;

        let tests = Object.keys( this.tests_fn );
        self.debug( "tests ", this.tests_fn );


        tests.forEach( function ( constructor_fn ){

            // stop at first fail ?
            if( one_fail ) {
                return;
            }
            let test_fn = self.tests_fn[ constructor_fn ];
            let test = test_fn(); // nueva instanacia del TestCase
            let class_name = test.constructor.name;

            self.debug( "class_name ", class_name );



            let metodos = test.getTestMethods( );

            self.debug( "metodos ", metodos );

            metodos.forEach( function ( metodo ){
                self.debug( "run metodo ", metodo );

                

                let runner = test_fn( constructor_fn, metodo ); // nueva instanacia del TestCase
                
                let timer = new myclock();
                runner.set_timer( timer );
                report.add_timer( constructor_fn, metodo, timer );

                self.#runners[class_name + "." + metodo] = runner;
                runner.set_suite( self );

                report.total();

                runner.start( metodo );

                try {
                    runner[metodo]();
                } catch( e ) {
                    one_fail = true;

                    report.add_error( constructor_fn + ":" + metodo );
                    report.add_error( e );
//                    console.log( e );
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
    
    #tests = [ ];
    report = null;
    
    set_report( r ){
        this.report = r;
    }
    
    get_report( ){
        return this.report;
    }


}




export { TestSuite, Test, TestBad }