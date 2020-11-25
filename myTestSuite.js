// import TestSuite class and Test class

// DO NOT REMOVE THIS NEXT IMPORT
// (update filepath if necessary)
import { TestSuite, Test } from "./testSuite.js" ;

// add your test files here
import { myOwnTest } from "./myOwnTest.js" ;
import { myOwnTest2 } from "./myOwnTest2.js" ;


export class myTestSuite extends TestSuite {
    config(){
        // set to true to stop on the first error
        this.stopError = false;
    }

    start(){
        // add test classes
        this.addTest( new myOwnTest() );
        this.addTest( new myOwnTest2() );

        // run all tests on testclases
        this.run();
    }

}
