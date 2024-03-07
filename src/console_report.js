/* global process */

import { myclock } from "./myclock.js";
import { console_output } from "./console_output.js";
import { counters } from "./counters.js";

/*
 * I need to extract counter class from this and use it directly from where? 
 */

class console_report {

    header(){
        this.#output.normal( "myjsunit - by @RudyMartin " );
        this.#output.line_break();
        this.#output.normal( "Minimalistic Testing Framework -- vaguely inspired on PHPUnit" );
        this.#output.line_break();
        this.#output.normal( "Licence: MIT - https://en.wikipedia.org/wiki/MIT_License" );
        this.#output.line_break();
    }
    
    #stop_main_timer(){
        this.#main_timer.stop();
    }

    
    failed(){
        this.#counters.inc_failed();
        this.#output.fail( "E" ); // E "dot"
    }

    risky(){
        this.#counters.inc_risky();
        this.#output.risky( "R" ); // R "dot"
    }

    dot(){
        this.#output.normal( "." );
    }


    // once we run out of tests to execute,
    // we print the number of test ok/ran
    end(){
        this.#stop_main_timer( );

        let counters = this.#counters;

        let ok_total = counters.get_ok_total();

        this.#output.normal( ok_total );
        this.#output.line_break();
        this.#output.line_break();

        if( ! counters.is_ok() ) {
            this.list_errors();
            // bash scripts could need this
            process.exitCode = 1;
        }

        this.print_total_asserts();
        this.print_time_spent();
    }
    
    print_total_asserts(){
        // "Tests Total: "+tests_count +" Asserts: "+ this.counters.asserts +"  Passed: "+ok+"  Failed: "+failed+"  Risky: "+risky;
        var text = this.#counters.get_totals_text();

        this.#output.line_break();

        // default case
        this.#output.set_ok_color( );
        
        if( this.#counters.is_risky() ) {
            this.#output.set_risky_color();
        }
        if( this.#counters.is_failed() ) {
            this.#output.set_fail_color();
        }
        this.#output.normal( text );

        this.#output.line_break();
    }

    print_time_spent(){
        let average = this.#main_timer.diff() / this.#counters.get_tests();
        let max = 0;
        let which_class = "";
        let which_method = "";
        this.#timers.forEach( function ( item ){
            let timer = item[2];
            if( timer === undefined ) { // failed test ?
                return;
            }

            let spent = timer.diff();
            if( parseFloat( spent ) > parseFloat( max ) ) {
                which_class = item[0];
                which_method = item[1];
                max = spent;
            }
        } );
        this.#output.line_break();
        this.#output.text_normal( "Total = " + this.#main_timer.diff() + " msecs / Test Average = " + average.toFixed( 3 ) + " msecs" );

        this.#output.line_break();

        if( max > average ) {
            this.#output.text_normal( "Slowest test: " + which_class + "." + which_method + " = " + max + " msecs" );
            this.#output.line_break();
        }
    }


    list_errors(){
        let self = this;
        this.#error_list.forEach( function ( mensaje ){
            if( mensaje instanceof Error ) {
                self.#output.normal( mensaje.stack );
            } else {
                self.#output.normal( mensaje );
            }
            self.#output.line_break();

        } );

    }    
    
    
    #timers;
    add_timer( classname, method, timer ){
        this.#timers.push( [ classname, method, timer ] );
    }

    #error_list;
    add_error( element ){
        this.#error_list.push( element );
    }


    
    
    #counters;
    set_counters( c ){
        this.#counters  = c ;
    }
    
    get_counters(){
        return this.#counters;
    }

    #output;
    set_output( o ){
        this.#output = o;
    }

    #main_timer;
    constructor( output ){
        if( output === undefined ) {
            output = new console_output();
        }
        this.set_output( output );
        
        this.#timers = [ ];
        this.#error_list = [ ];
        this.set_counters( new counters() );
        
        this.#main_timer = new myclock();
        this.#main_timer.start();

    }

}

export {console_report}