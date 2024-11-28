/*  
 */

import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";
import { counters } from "../../src/counters.js";
import { console_report } from "../../src/console_report.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";
import { fakeOutput } from "../doubles/fakeOutput.js";



class assert_Test extends Test {
    setup() {
        let suite = new fakeSuite();
        
        let t = Test.create( "sarasa", "sarasa");
        t.set_timer( new fakeTimer() );
        t.set_suite( suite );
        let report = new fakeReport();
        report.set_counters( new counters() );
        t.set_report( report );
        return t;
    }
    
    test_normal(){
        let t = this.setup();
        
        t.assertTrue( true );
        t.assertFalse( false );
        t.done( );

        this.assertEquals( 2,  t.getNumAsserts()  );
        this.done();
    }

    test_false(){
        let t = this.setup();
        
        t.assertTrue( false );

        this.assertEquals( true,  t.has_failed()  );

        this.done();
    }

    test_equals_OK(){
        let t = this.setup();        
        
        t.assertEquals( 1, 1 );

        this.assertEquals( 1,  t.getNumAsserts()  );
        this.done();
    }

    test_equals_FAIL(){
        let t = this.setup();        
        
        t.assertEquals( 1, 2 );

        this.assertEquals( true,  t.has_failed()  );
        this.done();
    }

    test_done_twice(){
        let esperado = "done() was called twice on the same test?";
        let actual = "";

        let t = this.setup();        
        
        t.assertEquals( 1, 2 );
        t.done( );
        // dado que done() usa throw ...
        try {
            t.done( );
        } catch( e ) {
            actual = e.message;
        }
        this.assertEquals( esperado, actual );
        this.done();
    }
    
    test_done_assert(){
        let esperado = "Assert found after test done()";
        let actual = "";
        
        let t = this.setup();

        t.done( );
        // dado que assertEquals() usa throw ...
        try {
            t.assertEquals( 1, 2 );
        } catch( e ) {
            actual = e.message;
        }
        this.assertEquals( esperado, actual );
        this.done();
    }

    test_assertFail(){
        let esperado = "";
        let actual = "";

        let t = this.setup();
        
        t.assertFail( );

        this.assertEquals( esperado, actual );
        this.done();
    }

    test_risky(){

        let suite = new fakeSuite();
        
        let t = Test.create( "sarasa", "sarasa");
        t.set_timer( new fakeTimer() );
        t.set_suite( suite );

        let report = new console_report( new fakeOutput() );
        let c = new counters();
        c.inc_risky();
        report.set_counters( c );
        t.set_report( report );
        
        this.assertTrue( c.is_risky() );
        t.print_dot();
        report.end();
        this.done();
    }

    // special case ...
    test_BAD(){
        let t = new TestBad();

        let suite = new fakeSuite();
        t.set_timer( new fakeTimer() );
        t.set_suite( suite );
        
        let report = new fakeReport();
        report.set_counters( new counters() );
        t.set_report( report );

        
        t.test_bad( );


        this.assertTrue( t.has_failed(), "TestBad should fail" );
        this.done();
    }
    
//    test_throw_error(){
//        let t = new TestBad();
//
//        let suite = new TestSuite();
//        t.set_timer( new fakeTimer() );
//        t.set_suite( suite );
//        
//        let report = new fakeReport();
//        report.set_counters( new counters() );
//        suite.set_report( report );
//
//        suite.run();
//
//        this.assertTrue( t.has_failed(), "TestBad should fail" );
//        this.done();
//    }


    

}

export { assert_Test }


