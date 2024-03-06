/* testSuite_Test
 */

import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";


class testSuite_Test extends Test {
    test_is_function(){
        let ts = new TestSuite();
        let esperado = "addeTest() must receive a function.-";
        let actual = "";
        
        try {
            ts.is_function( null );
        } catch( e ){
            
            actual = e.message;
        }
        this.assertEquals( esperado, actual )
        this.done();
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

        let suite = new TestSuite();
        suite.show_times()
        
        suite.report = new fakeReport();

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

        let suite = new TestSuite();
        suite.report = new fakeReport();

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
        
        let module2 = function (){ };
        module2.create = function (){
            return test;
        };

        suite.addTest( module2 );

        suite.run();


        this.assertTrue( true );
        this.done();
    }
    
    test_no_asserts(){

        let self = this;
        let suite = new TestSuite();
        suite.report = new fakeReport();

        let module = function (){ };
        
        
        let test;
        test = new Test( "Test", "test_sarasa");
//        module.create = function (){
//            
////            console.log( "create!")
//            
//            
//            
//            test.timer = new fakeTimer();
//            test.test_sarasa = function (){
//                test.done();
//            };
//            
//            
//            return test;
//        };
//
//        suite.addTest( module );

        suite.check_done( test );
        
//        suite.run();
//        console.log( suite );
        


        this.assertFalse( test.muy_done )
        this.done();

    }
    
    test_dump_test_time_OK(){

        let suite = new TestSuite();
        suite.report = new fakeReport();
        suite.mayor_1 = true;
        suite.mostrar_tiempos = true;

        suite.dump_test_time( "sarasa", "sarasa", 2 ); // > 1

        this.assertTrue( true );
        this.done();
    }
    
    test_dump_test_time_NO(){

        let suite = new TestSuite();
        suite.report = new fakeReport();
        suite.mayor_1 = true;
        suite.mostrar_tiempos = true;

        suite.dump_test_time( "sarasa", "sarasa", 0 ); // > 1

        this.assertTrue( true );
        this.done();
    }
    
//    test_nada(){
////        this.done();
//    }
    
    
}
    


export { testSuite_Test }

