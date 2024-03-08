/* 
 * 2024 03 07
 * TODO: rename as TestCases.js
 * same goes for class name.
 * 
 */

import { myclock } from "./myclock.js";


class Test {
    // TODO: move to another class 
    getTestMethods( objParam ){
        let properties = new Set();
        let currentObj = objParam;

        while( currentObj ) {
            
            if( currentObj.constructor.name === "Test" || currentObj.constructor.name === "Object" ) { // I do not want to evaluate Test and Object
                break;
            }
//            console.log( currentObj.constructor.name )
            Object.getOwnPropertyNames( currentObj ).forEach( function ( item ){
                if( typeof objParam[item] === 'function' && item.substring( 0, 4 ) === "test" ){
                    properties.add( item );    
                }
            } );
            currentObj = Object.getPrototypeOf( currentObj );
        }
        
        return properties;


    }

    done( ){
        if( this.#really_done ) {
            throw new Error( "done() was called twice on the same test?" );
        }

        this.#really_done = true;

        this.#timer.stop();

        /* 
         */
        this.#ts.check_done( this );
    }

    has_failed(){
        return this.#failed;
    }

    done_fail( ){
        this.#failed = true;
        this.done();
    }

    any_assert(){
        return this.#metodos_number_of_asserts > 0;
    }

    is_all_done(){
        return this.#really_done;
    }

    #assert(){
        if( this.#really_done ) {
            throw new Error( "Assert found after test done()" )
        }

        // this is just for this particular test. 
        this.#metodos_number_of_asserts++;

        let counters = this.#report.get_counters();

        counters.inc_asserts();
    }

    print_dot(  ){
        let test = this;
        let report = this.#report;
        if( test.#failed ) {
            report.failed();
            return;
        }

        let counters = report.get_counters();
        counters.inc_ok();

        if( test.any_assert() ) {
            report.dot();
            return;
        }
        report.add_error( test.get_class_name() + ":" + test.get_method() + "() : OK but no assertions were made!\n" );
        report.risky();
    }

    getNumAsserts(){
        return this.#metodos_number_of_asserts;
    }

    assertTrue( condicion, msg = "" ){
        this.#assert();
        if( condicion !== true ) {
            this.#error( msg + " assertTrue fails \n" );
    }
    }

    assertFalse( condition, msg = "" ){
        this.assertTrue( !condition, msg );
    }
    assertFail( msg = "assertFail() reached" ){
        this.#assert();
        this.#error( msg );
    }

    #error( msg ){
        let self = this;
        this.#failed = true;

        try {
            throw new Error( msg );
        } catch( e ) {
            let report = this.#report;
            report.add_error( self.#class_name + ":" + self.#metodo );
            report.add_error( e.stack + "\n" );
        }
    }

    /* I want to change this in a way that could allow us to see the difference between two objects.
     */
    assertEquals( expected, actual, msg = "equals" ){
        this.#assert();

        let str_expected = JSON.stringify( expected );
        let str_actual = JSON.stringify( actual );

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
            let report = this.#report;
            report.add_error( msg + ": assert that" );
            report.add_error( actual );
            report.add_error( "is" );
            report.add_error( expected );
            report.add_error( self.#class_name + ":" + self.#metodo + " " + e.stack + "\n" );

        }
    }

    start(  ){
        let timer = new myclock();
        this.set_timer( timer );

        this.#timer.start();

        let report = this.#report;
        report.add_timer( this.#class_name, this.#metodo, timer );
    }

    #failed = false;

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

    #timer = null;

    set_timer( t ){
        this.#timer = t;
    }
    get_timer(){
        return this.#timer;
    }

    /*
     * here I have a problem. Do Test need to access TS members just to access report ?
     */
    #ts = null;
    set_suite( ts ){
        this.#ts = ts;
    }

    #report = null;
    set_report( rep ){
        this.#report = rep;
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