/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */




class Test {
    metodos = [ ];
    

    getMethods( ){
        return this.metodos;
    }
    getTestMethods( ){
        this.metodos = this.#getTestMethods__();
        return this.metodos;
    }

    // stolen from SO ... 
    #getTestMethods__(  ){
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
}


class TestBad extends Test {
    test_bad(){
        this.assertTrue( false );
        this.done( false );
    }
    
    
}




/*
 * idea: 1 runner for a simple method.
 * promises can complicate things. thats why I ended up doing it this way.
 */

class TestRunner {

    // debugging only
    // 
    nombre_function(){
        try {
            throw new Error( "ERROR: not really an error!" );
        } catch( e ) {
            let stack = e.stack;
            let vector = stack.split( /\r?\n/ );

            //     at TestRunner.test_sarasa (file:///sarasa.js:46:22)
            let line = vector[2];
            let rex = /(?=(?! at ))([^\(\s]+)/mg;
            let result = line.match( rex );
            return result[1];
        }
    }

    
    
    // pure methods names 
    metodos = [ ];

    metodos_number_of_asserts = [ ];
    muy_done = false;
//    metodos_done = [ ];
//    metodos_timers = [ ];

    timer = null;
    anyAssert = [ ];

    ts = null;

    start(  ){
        this.failed = false;
        this.timer_start();
    }
    
    timer_stop(){
        this.timer.stop();
    }
    timer_start(){
        this.timer.start();
    }

    done( ){
        let metodo = this.metodo;
  
        if( this.muy_done ) {
//            return;
            throw new Error( "done() was called twice on the same test?" );
        }
        this.muy_done = true;

        this.timer_stop();

        this.ts.dump_test_time( this.constructor.name, metodo, this.timer.diff() );

//        console.log( " is_all_done", this.ts.is_all_done( this ) );

        this.ts.check_done( this )
//        console.log( " check_done",  );
    }

    done_fail( ){
        let metodo = this.metodo;

        this.muy_done = true;
        this.failed = true;

        this.timer_stop();

        this.ts.dump_test_time( this.constructor.name, metodo, this.timer.diff() );

//        console.log( " is_all_done", this.ts.is_all_done( this ) );

        this.ts.check_done( this )
//        console.log( " check_done",  );
    }

    any_assert(){

        return this.anyAssert[ this.running ];
    }

    set_suite( ts ){
        this.ts = ts;
    }

    is_all_done(){
        return this.muy_done;

    }

    #assert(){
        if( this.muy_done ) {
            throw new Error( "Assert found after test done()" )
        }
        let metodo = this.running;

        this.metodos_number_of_asserts[ metodo ]++;
        this.ts.report.assertsRun( 1 );
        this.anyAssert[ metodo ] = true;

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

    assertEquals( expected, actual, msg = "equals" ){
        this.#assert();

//        let mensaje = msg + " : assert that \n" + JSON.stringify( actual ) + " \n is \n" + JSON.stringify( expected );
        if( JSON.stringify( expected ) === JSON.stringify( actual ) ) {
            return;
        }
        this.#error2( msg, JSON.stringify(actual), JSON.stringify(expected) );
    }

    #error( mensaje ){
        let self = this;
        this.failed = true;
//        this.done_fail();
        try {
            throw new Error( mensaje );
        } catch( e ) {
            let report = this.ts.report;
            report.add_error( self.class_name + ":" + self.metodo );
            report.add_error( e.stack + "\n" );
        }
    }

    #error2( msg, actual, expected ){
        let self = this;
        this.failed = true;
//        this.done_fail();
        try {
            throw new Error( msg );
        } catch( e ) {
            let report = this.ts.report;
            report.add_error( msg +": assert that" );
            report.add_error( actual  );
            report.add_error( "is" );
            report.add_error( expected );
            report.add_error( self.class_name + ":" + self.metodo +" "+ e.stack + "\n" );
            
        }
    }

    metodo = "";
    class_name = "";
    constructor( class_name, metodo ){
        this.class_name = class_name;
        this.metodo = metodo;
    }

}

export { Test, TestBad, TestRunner }