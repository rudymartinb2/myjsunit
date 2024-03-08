/* types_Test
 */



import { Test } from "../../src/testSuite.js";

import { types } from "../../src/types.js";


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