/* sampleTestSuite
 * 
 * copy this file and the others to another directory then do 
 * 
 * npm i https://github.com/rudymartinb2/myjsunit.git 
 * 
 * otherwise it won't work
 */


import { TestSuite } from "myjsunit" ;

import { MyTestCase_Test } from "./MyTestCase_Test.js" ;

class sampleTestSuite extends TestSuite {
    start(){
        this.addTest( MyTestCase_Test ); // only constructor is needed.
        this.run();
    }
}

export {  sampleTestSuite }