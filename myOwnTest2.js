import { Test } from "./testSuite.js" ;

export class myOwnTest2 extends Test {
    test_new1(){
        this.assertTrue( true );
        this.assertTrue( true );
    }
    test_new2(){
        this.assertTrue( true );
        this.assertTrue( true );
    }
    test_new3(){
        this.assertEquals( 1,1, "2 == 2" );
        this.assertTrue( true );
    }

//    test_nothing(){
//
//    }
};
