/* 
 */


import { console_report } from "./console_report.js";
import { myclock } from "./myclock.js";
import { Test, TestBad, TestRunner } from "./Test.js";


class TestSuite {
    tests = [ ];
    report = null;

    constructor(){
        var report = new console_report();
        report.header();

        this.report = report;

    }

    mostrar_tiempos = false;
    mayor_1 = true;

    // dump slow tests
    dump_test_time( clase, metodo, tiempo ){
        if( !this.mostrar_tiempos ) {
            return;
        }
        if( this.mayor_1 && tiempo < 1 )
            return;

        // parche para imprimir los tiempos de cada test
        console.log( clase + ":" + metodo + "() ", tiempo )
    }

    addTest( test ){
        this.tests.push( test );
    }

    is_all_done(  ){
        let control = true;
        this.runners.forEach( function ( test ){
            if( !test.is_all_done() ) {
                control = false;
            }
        } );
        return control;
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
     * if there's no output, it might means a test are not executing done()
     */
    all_done = false;
    check_done( test ){

        let report = this.report;
        this.#print_dot( test )


        if( this.running ) {
            return false;
        }

        let all_done = this.is_all_done(  );
        if( all_done ) {
            report.end();
        }
        this.all_done = true;

        return all_done;

    }

    runners = [ ];

    running = false;

    run( ){
        this.running = true;

        let report = this.report;
        let self = this;
        let one_fail = false;

//        let runners = [];

        this.tests.forEach( function ( test ){
            if( one_fail ){
                return;
            }
            let class_name = test.constructor.name;
            test.getTestMethods( );

            let metodos = test.getMethods( );
            
            metodos.forEach( function ( metodo ){
                let timer = new myclock();
                let runner = new TestRunner( class_name, metodo );
                runner.timer = timer;

                report.add_timer( class_name, metodo, timer );

                self.runners.push( runner );
                runner.set_suite( self );

                report.total();
                /*
                 * hack para resolver tema setup() entre varios tests
                 */
                
                if( test["setup"] !== undefined ){
                    runner.setup = test.setup;
                }

                runner.start( metodo );
                runner[metodo] = test[metodo];
                
                try {
                    runner[metodo]();    
                } catch( e ) {
                    one_fail = true;
                    console.log( "testSuite error: ", e )
                    runner.done_fail();
                }
//                console.log( runner.class_name , runner.metodo, runner.failed )
                if( runner.failed ){
                    one_fail = true;
                }
            } );

        } );

        this.running = false;
//        console.log( " FIN MAIN ", this.runners.length )    

        /* border case: just 1 test 
         * done() should be executed before reaching this line
         */
//        if( !this.all_done && this.is_all_done( ) ) {
        if( this.is_all_done( ) ) {
            this.report.end();
            return;
        } 

        


    }
    
    unfinished(){
        // list unfinished tests
        this.runners.forEach( function( runner ){
            if( runner.muy_done ){
                return;
            }
            console.log( "unfinished test: " , runner.class_name, runner.metodo );
        })        
    }

}




export { TestSuite, Test, TestBad }