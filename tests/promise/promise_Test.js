
/*  objectivo:
 * corroborar que el framework atienda .done() durante la ejecuccion de Promises
 * 
 */
import { Test } from "../../src/testSuite.js";

function getSumNum( a, b ){
    const customPromise = new Promise( function( resolve, reject ) {
        const sum = a + b;

        if( sum <= 5 ) {
            resolve( "Let's go!!" )
            return;
        } 
        reject( new Error( 'Oops!.. Number must be less than 5' ) )
        
    } )

    return customPromise
}

class promise_Test extends Test {
    
    
    
    /*  caso 1 objeto basico. tengo 2 elemenbtos y los quiero invertidos.
     */
    test_normal(){
        let p = getSumNum( 1, 2 );
        let self = this;
        p.then( function ( que ){
            self.assertEquals( "Let's go!!" , que );
            self.done();
        } )
    }
    
    test_catch(){
        let p = getSumNum( 5, 2 );
        let self = this;
        
        p.catch( function( error ){
            self.assertEquals( "Oops!.. Number must be less than 5", error.message );
            self.done();
        })
    }
    
    
}

export { promise_Test }


