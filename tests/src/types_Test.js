/* types_Test
 */



import { Test, TestBad } from "../../src/Test.js";
//import { TestSuite } from "../../src/testSuite.js";
//import { counters } from "../../src/counters.js";
import { types } from "../../src/types.js";
//
//import { fakeSuite } from "../doubles/fakeSuite.js";
//import { fakeTimer } from "../doubles/fakeTimer.js";
//import { fakeReport } from "../doubles/fakeReport.js";

class types_Test extends Test {
        
    /*
     * 
     */
    test_is_function(){
        
        let esperado = "addTest() must receive a function.-";
        let actual = "";
        
        try {
            types.is_function( null, "addTest() must receive a function.-" );
        } catch( e ){
            
            actual = e.message;
        }
        this.assertEquals( esperado, actual )
        this.done();
    }
}

export { types_Test }