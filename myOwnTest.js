import { Test } from "./testSuite.js" ;

/* 
 * test methods names *MUST* begin with "test" to be run.
 * 
 * one important catch: there's going to be only 1 instance of this class,
 * so be careful if you are using properties
 */
export class myOwnTest extends Test {
	not_a_test(){
            // this won't run
            console.log( "YAAAAAAAAAAY!");
	}
	
	test_new1(){
            this.assertEquals( 1, 1, "1 == 1" );
	}
	test_new2(){
            this.assertTrue( true, "Winter is comming ..." );
	}
	test_new3(){
            this.assertFalse( false );
	}

//	test_nothing(){
//          // this will generate a risky test warning
//	}

}
