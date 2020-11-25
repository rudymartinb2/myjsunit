import { Test } from "./testSuite.js" ;

export class myOwnTest_FAIL extends Test {
    test_new1(){
        this.assertTrue( true );
        this.assertTrue( true );
    }
    test_new2(){
        this.assertTrue( true );
        this.assertTrue( true );
    }
    test_new3(){
        this.assertEquals( 2,1, "2 == 2" );
        this.assertTrue( false );
    }

    test_nothing(){

    }
};
