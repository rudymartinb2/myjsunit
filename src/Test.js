/* 
 * 
 * 
 */

import { myclock } from "./myclock.js";


class Test {
    getTestMethods( ){
        let properties = new Set();
        let currentObj = this;
        let obj = this;
        do {
            Object.getOwnPropertyNames( currentObj ).map( function ( item ){
                properties.add( item );
            } );
        } while( ( currentObj = Object.getPrototypeOf( currentObj ) ) )
        {
            return [ ...properties.keys() ].filter(
                function ( item ){
                    return typeof obj[item] === 'function' && item.substring( 0, 4 ) === "test";
                }
            );
        }
    }




    done( ){
        if( this.#really_done ) {
            throw new Error( "done() was called twice on the same test?" );
        }
        
        this.#really_done = true;

        let metodo = this.#metodo;

        this.#timer.stop();

// esto esta mal.
//        let report = this.#ts.get_report();
        
        let clase = this.#class_name; // ???
        let txt = clase + ":" + metodo + "() " ;
        this.#ts.dump_test_time( txt, this.#timer.diff() );
        this.#ts.check_done( this );
    }
    
    done_fail( ){
        this.#failed = true;
        this.done();
    }


    any_assert(){
        return this.#anyAssert;
    }

    is_all_done(){
        return this.#really_done;
    }

    #assert(){
        if( this.#really_done ) {
            throw new Error( "Assert found after test done()" )
        }
        

        this.#metodos_number_of_asserts++;
        this.#ts.report.assertsRun( 1 );
        this.#anyAssert = true;
    }
    
    getNumAsserts(){
//        return this.#metodos_number_of_asserts[ this.metodo ];
        return this.#metodos_number_of_asserts;
    }
    getNumAsserts2(){
        return this.#metodos_number_of_asserts;
    }
    
    assertTrue( condicion, msg = "" ){
        this.#assert();
        if( condicion === true ) {
            return;
        }
        let mensaje = msg + " assertTrue fails \n";

        this.#error( mensaje );
    }

    assertFalse( condicion, mensaje = "" ){
        this.assertTrue( !condicion, mensaje );
    }
    assertFail( mensaje = "assertFail() reached" ){
        this.#assert();
//        throw new Error( mensaje );
        this.#error( mensaje );
    }

    #error( mensaje ){
        let self = this;
        this.#failed = true;

        try {
            throw new Error( mensaje );
        } catch( e ) {
            let report = this.#ts.report;
            report.add_error( self.#class_name + ":" + self.#metodo );
            report.add_error( e.stack + "\n" );
        }
    }
    
    assertEquals( expected, actual, msg = "equals" ){
        this.#assert();
        
        let str_expected = JSON.stringify( expected ) ;
        let str_actual = JSON.stringify( actual ) ;

        if( str_expected === str_actual ) {
            return;
        }
        this.#error_equals( msg, str_actual, str_expected );
    }

    #error_equals( msg, actual, expected ){
        let self = this;
        this.#failed = true;
        
        try {
            throw new Error( msg );
        } catch( e ) {
            let report = this.#ts.report;
            report.add_error( msg +": assert that" );
            report.add_error( actual  );
            report.add_error( "is" );
            report.add_error( expected );
            report.add_error( self.#class_name + ":" + self.#metodo +" "+ e.stack + "\n" );
            
        }
    }

    #failed = false;
    start(  ){
        let timer = new myclock();
        this.set_timer( timer );
        
        this.#failed = false;
        this.#timer.start();
    }
    

    #metodo = "";
    #class_name = "";
    
    get_class_name(){
        return this.#class_name;
    }
    get_method(){
        return this.#metodo;
    }
    
        
    #metodos_number_of_asserts = 0;
    
    #really_done = false; // "done" is defined as function
    #anyAssert = false;

    #timer = null;
    
    set_timer( t ){
        this.#timer = t ;
    }
    get_timer(){
        return this.#timer ;
    }

    /*
     * here I have a problem. Do Test need to access TS members just to access report ?
     */
    #ts = null;
    set_suite( ts ){
        this.#ts = ts;
    }
    

    // atm those params are only useful for error messages
//    static create( class_name, metodo ){
    static create( metodo ){
        let self = new this( );

        self.#class_name = self.constructor.name;
        self.#metodo = metodo;
        return self;
    }
    
    
}


class TestBad extends Test {
    test_bad(){
        this.assertTrue( false );
        this.done( false );
    }
}





export { Test, TestBad }