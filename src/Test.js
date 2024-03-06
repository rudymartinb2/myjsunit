/* 
 * 
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

    // idea stolen from SO ... 
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
    
        
    
    // pure methods names ??
    metodos = [ ]; // que es esto al final?

    metodos_number_of_asserts = [ ];
    muy_done = false;

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
//        console.log( "metodo", metodo )
  
        if( this.muy_done ) {
            throw new Error( "done() was called twice on the same test?" );
        }
        this.muy_done = true;

        this.timer_stop();

        this.ts.dump_test_time( this.constructor.name, metodo, this.timer.diff() );

        this.ts.check_done( this );
    }
    
    done_fail( ){
        this.failed = true;
        this.done();
        return;

    }


    any_assert(){
        return this.anyAssert[ this.metodo ];
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
        let metodo = this.metodo;

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
        
        let str_expected = JSON.stringify( expected ) ;
        let str_actual = JSON.stringify( actual ) ;

        if( str_expected === str_actual ) {
            return;
        }
        this.#error2( msg, str_actual, str_expected );
    }

    #error( mensaje ){
        let self = this;
        this.failed = true;

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
    
    /*
     * TODO: eliminar class_name ?
     */
    constructor( class_name, metodo ){
        this.class_name = class_name;
//        if( class_name !== undefined && this.constructor.name !== class_name ){
//            throw new Error( this.constructor.name+ " != " + class_name );
//        }
        this.metodo = metodo;
    }
    
    
    static create( class_name, metodo ){
//        console.log( class_name, metodo, module )
        return new this( class_name, metodo );
    }
    
    
}


class TestBad extends Test {
    test_bad(){
        this.assertTrue( false );
        this.done( false );
    }
    
    
}





export { Test, TestBad }