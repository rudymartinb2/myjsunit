/* testSuite_Test
 */

import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";
import { counters } from "../../src/counters.js";
import { types } from "../../src/types.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";



class testSuite_Test extends Test {
    
    setup(){
        let suite = new TestSuite();
        let report = new fakeReport();
        report.set_counters( new counters() )
        suite.set_report( report ) ;
        return suite;

    }

    
    
    /* no sabia bien donde tirar esta prueba ...
     * 
     * para hacer este simulacro:
     * crear un test con una funcion como atributo con nombre test_
     * hacer q tire throw
     * ejecutar ts.run ?
     * 
     */

    test_error_2(){

        let suite = this.setup();
//        let suite = new TestSuite();
        
        
//        suite.report = new fakeReport();
//        report.set_counters( new counters() )

        let test = new Test();
        test.timer = new fakeTimer();
        
        test.test_sarasa = function (){
            throw new Error( " sarasa !" ); // an error happens during test ...
        };

        let module = function (){ };
        module.create = function (){
            return test;
        };

        suite.addTest( module );

        suite.run();


        this.assertTrue( true );
        this.done();
    }

    test_one_fail(){

//        let suite = new TestSuite();
        let suite = this.setup();
//        suite.report = new fakeReport();

        let test = new Test();
        test.timer = new fakeTimer();
        test.test_sarasa = function (){
            suite.is_all_done();
            throw new Error( " sarasa !" ); // an error happens during test ...
        };

        let module = function (){ };
        module.create = function (){
            return test;
        };

        suite.addTest( module );
        
//        let module2 = function (){ };
//        module2.create = function (){
//            return test;
//        };
//
//        suite.addTest( module2 );

        suite.run();


        this.assertTrue( true );
        this.done();
    }
    
    test_no_asserts(){

        let self = this;
        let suite = new TestSuite();
        let report = new fakeReport();
        report.set_counters( new counters() );
        suite.set_report( report ) ;

//        let module = function (){ };
        
        
        let test;
        test = new Test( "Test", "test_sarasa");
        test.set_report( report );
      

        suite.check_done( test );
      

        this.assertFalse( test.is_all_done() )
        this.done();

    }
    
//    test_dump_test_time_OK(){
//
//        let suite = new TestSuite();
//        suite.report = new fakeReport();
//        suite.mayor_1 = true;
//        suite.mostrar_tiempos = true;
//
////        suite.dump_test_time( "sarasa", "sarasa", 2 ); // > 1
//
//        this.assertTrue( true );
//        this.done();
//    }
//    
//    test_dump_test_time_NO(){
//
//        let suite = new TestSuite();
//        suite.report = new fakeReport();
//        suite.mayor_1 = true;
//        suite.mostrar_tiempos = true;
//
////        suite.dump_test_time( "sarasa", "sarasa", 0 ); // > 1
//
//        this.assertTrue( true );
//        this.done();
//    }
    
//    test_nada(){
////        this.done();
//    }
    
    
}
    


export { testSuite_Test }

