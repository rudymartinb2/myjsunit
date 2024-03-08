/* global process */

import { myclock } from "./myclock.js";
import { console_output } from "./console_output.js";
import { counters } from "./counters.js";

/* 
 * idea: extract atribute and methods from class console_report
 */

class my_timers {
    #timers = [];
    add( classname, method, timer ){
        this.#timers.push( [ classname, method, timer ] );        
    }
    
    calculate_time_spent(){
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
}

class myconsole_output extends console_output {
    header(){
        this.normal( "myjsunit - by @RudyMartin " );
        this.line_break();
        this.normal( "Minimalistic Testing Framework -- vaguely inspired on PHPUnit" );
        this.line_break();
        this.normal( "Licence: MIT - https://en.wikipedia.org/wiki/MIT_License" );
        this.line_break();
    }

    
    select_color( counts ){
        // default case
        this.set_ok_color( ); // green bh
        
        if( counts.is_risky() ) { 
            this.set_risky_color(); // brown bg
        }
        if( counts.has_failed() ) { 
            this.set_fail_color(); // red bg
        }
    }
    
    print_total_asserts( counts ){
        this.line_break();

        this.select_color( counts );
        

        var text = counts.get_totals_text();
        this.normal( text );

        this.line_break();
    }
    
    print_time_spent( ret, diff ){
        let max = ret.max;
        let which_class = ret.which_class;
        let which_method = ret.which_method;        
        
        this.line_break();
        this.text_normal( "Total = " + diff + " msecs.-" );

        this.line_break();

        this.text_normal( "Slowest test: " + which_class + "." + which_method + " = " + max + " msecs.-" );
        this.line_break();
   }
   
    #error_list = [];
    add_error( element ){
        this.#error_list.push( element );
    }
    
    list_errors(){
        let self = this;
        this.#error_list.forEach( function ( mensaje ){
            if( mensaje instanceof Error ) {
                self.normal( mensaje.stack );
            } else {
                self.normal( mensaje );
            }
            self.line_break();

        } );

    }    
    
}

class console_report {

    header(){
        this.#output.header();
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
        this.#main_timer.stop();

        let counters = this.#counters;

        let ok_total = counters.get_ok_total();

        this.#output.normal( ok_total );
        this.#output.line_break();
        this.#output.line_break();

        if( ! counters.is_ok() ) {
            // show errors before printing totals
            this.list_errors();
            // TODO: convert "process" to attribute
            process.exitCode = 1; // a bash script could need this
        }

        this.print_total_asserts();
        this.print_time_spent();
    }
    
    // then we print a gree/red bar
    print_total_asserts(){

        this.#output.print_total_asserts( this.#counters );
    }

    print_time_spent(){
        let ret = this.#my_timers.calculate_time_spent();
        let diff = this.#main_timer.diff() 
        this.#output.print_time_spent( ret, diff );
    }
    


    list_errors(){
        this.#output.list_errors();
//        let self = this;
//        this.#error_list.forEach( function ( mensaje ){
//            if( mensaje instanceof Error ) {
//                self.#output.normal( mensaje.stack );
//            } else {
//                self.#output.normal( mensaje );
//            }
//            self.#output.line_break();
//
//        } );

    }    
    
    
    #my_timers;
    
    add_timer( classname, method, timer ){
        this.#my_timers.add( classname, method, timer );
    }

    #error_list;
    add_error( element ){
        this.#output.add_error( element );
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
            output = new myconsole_output();
        }
        this.set_output( output );
        
        this.#my_timers = new my_timers();
        this.#error_list = [ ];
        this.set_counters( new counters() );
        
        this.#main_timer = new myclock();
        this.#main_timer.start();
    }
    

}

export {console_report}