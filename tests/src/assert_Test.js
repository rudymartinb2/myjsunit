
/*  objectivo:
 * 
 * asegurar que funcione assertTrue y assertFalse
 * 
 */
import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";
import { counters } from "../../src/counters.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";



class assert_Test extends Test {
    
    
    setup() {
        let suite = new fakeSuite();
        
        let t = Test.create( "sarasa", "sarasa");
        t.set_timer( new fakeTimer() );
        t.set_suite( suite )
        let report = new fakeReport();
        report.set_counters( new counters() );
        t.set_report( report );
        return t;
        
    }
    
    test_normal(){
        let t = this.setup()
        
        t.assertTrue( true );
        t.assertFalse( false );
        t.done( false );

//        this.assertEquals( 2,  t.getNumAsserts2()  );
        this.assertEquals( 2,  t.getNumAsserts()  );
        this.done();
    }

    test_false(){
        let t = this.setup()
        
        t.assertTrue( false );
        t.assertFalse( true );


        this.assertTrue( true );
        this.done();
    }

    test_equals_OK(){
        let t = this.setup()        
        
        t.assertEquals( 1, 1 );

        this.assertTrue( true );
        this.done();
    }

    test_equals_FAIL(){
        let t = this.setup()        
        
        t.assertEquals( 1, 2 );

        this.assertTrue( true );
        this.done();
    }

    test_done_done(){
        let esperado = "done() was called twice on the same test?";
        let actual = "";

        let t = this.setup()        
        
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
        
        let t = this.setup()

        t.done( );
        // dado que done() usa throw ...
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

        let t = this.setup()
        
        t.assertFail( );

        this.assertEquals( esperado, actual );
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


        this.assertTrue( true );
        this.done();
    }

    // another special case 
    test_NO_TERMINA(){
        let ts = new TestSuite();
        ts.report = new fakeReport();


        ts.addTest( Test );


        ts.is_all_done();

        this.assertTrue( true );
        this.done();

    }

    test_FALLA_3(){
//        let ts = new TestSuite();
        let ts = new fakeSuite();

        let t = this.setup()
//        let t = new Test();
//        t.set_suite( ts );
//        t.set_report( new fakeReport );
        
        t.assertTrue( false );


        this.assertTrue( true );
        this.done();
    }

//    test_done_fail(){
////        let ts = new TestSuite();
//        let ts = new fakeSuite();
//        ts.report = new fakeReport();
//
//        let t = new Test();
//        t.set_timer( new fakeTimer() );
//        t.set_suite( ts );
//
//        t.done_fail();
//
//        this.assertTrue( true );
//        this.done();
//    }

    

}

export { assert_Test }


