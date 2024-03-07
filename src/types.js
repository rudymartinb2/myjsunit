/* 
 */

class types {
    /*
     * used from testSuite.js
     * to check that our testSuite subclass pass a module 
     * 
     * but could be useful somewhere ...
     */
    static is_function( obj, msg ){
        if( typeof obj !== "function" ) {
            throw new Error( msg );
        }
    }
}

export { types }


