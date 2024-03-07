/* global process */

import { myclock } from "./myclock.js";
import { console_output } from "./console_output.js";
import { counters } from "./counters.js";

/* 
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
        this.#output.fail( "E" ); 
    }

    risky(){
        this.#counters.inc_risky();
        this.#output.risky( "R" );
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
            // show errors before printing totals
            this.list_errors();
            process.exitCode = 1; // a bash script could need this
        }

        this.print_total_asserts();
        this.print_time_spent();
    }
    
    // then we print a gree/red bar
    print_total_asserts(){

        this.#output.line_break();

        // default case
        this.#output.set_ok_color( ); // green bh
        
        if( this.#counters.is_risky() ) { 
            this.#output.set_risky_color(); // brown bg
        }
        if( this.#counters.has_failed() ) { 
            this.#output.set_fail_color(); // red bg
        }

        var text = this.#counters.get_totals_text();
        this.#output.normal( text );

        this.#output.line_break();
    }

    print_time_spent(){
        let ret = this.#calculate_time_spent();
        let max = ret.max;
        let which_class = ret.which_class;
        let which_method = ret.which_method;        
        
        this.#output.line_break();
        this.#output.text_normal( "Total = " + this.#main_timer.diff() + " msecs.-" );

        this.#output.line_break();

        this.#output.text_normal( "Slowest test: " + which_class + "." + which_method + " = " + max + " msecs.-" );
        this.#output.line_break();
    }
    
    #calculate_time_spent(){
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
        let ret = {
            max : max,
            which_class : which_class,
            which_method : which_method
        };
        
        return  ret;
        
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