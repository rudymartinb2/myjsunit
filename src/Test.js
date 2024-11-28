/* 
 * 2024 03 07
 * TODO: rename as TestCases.js
 * same goes for class name.
 * 
 */

import { myclock } from "./myclock.js";
import { getTestMethods } from "./getTestMethods.js";


class Test {
    // TODO: remove 
    getTestMethods( objParam ){
        return getTestMethods( objParam );
    }

    done( ){
        if( this.#really_done ) {
            throw new Error( "done() was called twice on the same test?" );
        }

        this.#really_done = true;

        this.#timer.stop();

        this.print_dot( );
        this.#ts.check_done( this ); // is this a Visitor Pattern ?
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
            // could happen if a callback using done() is called twice
            throw new Error( "Assert found after test done()" );
        }

        // this is just for this particular test. 
        // we want to make sure we ran a single assert
        this.#metodos_number_of_asserts++;

        // and this is for the global report
        // TODO: add a inc_asserts() at the report object to simplify this
        let counters = this.#report.get_counters();
        counters.inc_asserts();
    }

    print_dot(  ){
        let report = this.#report;
        if( this.#failed ) {
            report.failed();
            return;
        }

        let counters = report.get_counters();
        counters.inc_ok();

        if( this.any_assert() ) {
            report.dot();
            return;
        }
        report.add_error( this.get_class_name() + ":" + this.get_method() + "() : OK but no assertions were made!\n" );
        report.risky();
    }

    getNumAsserts(){
        return this.#metodos_number_of_asserts;
    }

    assertTrue( condicion, msg = "" ){
        this.#assert();
        if( condicion !== true )
            this.#error( msg + " assertTrue fails \n" );
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

        this.#error_equals( expected, actual, msg );
    }

    serializeIfObject( value ){
        if( typeof value === "object" && value !== null ) {
            try {
                return JSON.stringify( value, null, 4 );
            } catch {
                return "[Unserializable Object]";
            }
        }
        return value;
    }

    #error_equals( expected_var, actual_var, msg ){
        let self = this;
        this.#failed = true;

        try {
            throw new Error( msg );
        } catch( e ) {
            let report = this.#report;


            let expected = this.serializeIfObject( expected_var );
            let actual = this.serializeIfObject( actual_var );
            report.add_error( msg + ": assert that" );
            report.add_error( actual );
            report.add_error( "is" );
            report.add_error( expected );
            
            // remove myjsunit from callstack  
            let filteredStack = e.stack
                .split( "\n" )
                .filter( function ( line ){
                    return !line.includes( 'myjsunit' );
                } )
                .join( "\n" );

            report.add_error( self.#class_name + ":" + self.#metodo + " " + filteredStack + "\n" );
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
//    get_timer(){
//        return this.#timer;
//    }

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
    static create( metodo ){
        let self = new this( );

        self.#class_name = self.constructor.name;
        self.#metodo = metodo;
        return self;
    }

}

// base test class made to create the first test on a project 
class TestBad extends Test {
    test_bad(){
        this.assertTrue( false );
        this.done( false );
    }
}

// nothing new at the moment, just the classname
class TestCase extends Test {

}

export { Test, TestBad, TestCase }