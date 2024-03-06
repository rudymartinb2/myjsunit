
/*  objectivo:
 * 
 * asegurar que funcione assertTrue y assertFalse
 * 
 */
import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";



class assert_Test extends Test {

    
    
    test_normal(){
        let t = new Test();

        let suite = new fakeSuite();
        t.set_suite( suite )
        t.assertTrue( true );
        t.assertFalse( false );

        this.assertTrue( true );
        this.done();
    }

    test_false(){
        let t = new Test();

        let suite = new fakeSuite();
        t.set_suite( suite )
        t.assertTrue( false );
        t.assertFalse( true );


        this.assertTrue( true );
        this.done();
    }

    test_equals_OK(){
        let t = new Test();

        let suite = new fakeSuite();
        t.set_suite( suite )
        t.assertEquals( 1, 1 );

        this.assertTrue( true );
        this.done();
    }

    test_equals_FAIL(){
        let t = new Test();

        let suite = new fakeSuite();
        t.set_suite( suite )
        t.assertEquals( 1, 2 );

        this.assertTrue( true );
        this.done();
    }

    test_done_done(){
        let esperado = "done() was called twice on the same test?";
        let actual = "";

        let t = new Test();
        t.timer = new fakeTimer();

        let suite = new fakeSuite();
        t.set_suite( suite )
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

        let t = new Test();
        t.timer = new fakeTimer();

        let suite = new fakeSuite();
        t.set_suite( suite )

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

        let t = new Test();
        t.timer = new fakeTimer();

        let suite = new fakeSuite();
        t.set_suite( suite )
        t.assertFail( );

        this.assertEquals( esperado, actual );
        this.done();
    }

    test_BAD(){
        let t = new TestBad();
        t.timer = new fakeTimer();

        let suite = new fakeSuite();
        t.set_suite( suite );
        t.test_bad( );


        this.assertTrue( true );
        this.done();
    }

    test_NO_TERMINA(){
        let ts = new TestSuite();
        ts.report = new fakeReport();


        ts.addTest( Test );


        ts.is_all_done();

        this.assertTrue( true );
        this.done();

    }

    test_FALLA(){
//        let ts = new TestSuite();
        let ts = new fakeSuite();
        ts.report = new fakeReport();

        let t = new Test();
        t.ts = ts;
        t.assertTrue( false );


        this.assertTrue( true );
        this.done();
    }

    test_done_fail(){
//        let ts = new TestSuite();
        let ts = new fakeSuite();
        ts.report = new fakeReport();

        let t = new Test();
        t.timer = new fakeTimer();
        t.ts = ts;

        t.done_fail();

        this.assertTrue( true );
        this.done();
    }

    

}

export { assert_Test }


