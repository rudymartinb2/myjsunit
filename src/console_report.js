import { myclock } from "./myclock.js";
import { console_output } from "./console_output.js";
import { counters } from "./counters.js";


class console_report {
    
    assertsRun( number ){
        this.#counters.inc_asserts( number );
    }
    
    add_timer( classname, method, timer ){
        this.#timers.push( [ classname, method, timer ] );
    }
    
    stop_main_timer(){
        this.#main_timer.stop();
    }

    header(){
        this.#output.normal( "myjsunit - by @RudyMartin " );
        this.#output.line_break();
        this.#output.normal( "Minimalistic Testing Framework -- vaguely inspired on PHPUnit" );
        this.#output.line_break();
        this.#output.normal( "Licence: MIT - https://en.wikipedia.org/wiki/MIT_License");
        this.#output.line_break();
    }

    ok(){
        this.#counters.inc_ok();
    }
    has_failed(){
        return this.#counters.failed > 0;
    }
    failed(){
        this.#counters.inc_failed();
        this.#output.fail( "E" ); // E "dot"
    }

    total(){
        this.#counters.inc_tests();
    }

    risky(){
        this.#counters.inc_risky();
        this.#output.risky( "R" ); // R "dot"
    }

    add_error( element ){
        this.#error_list.push( element );
    }

    dot(){
        this.#output.normal( "." );
    }
    
    list_errors(){
        var self = this;
        this.#error_list.forEach( function( mensaje ) {
            if( mensaje instanceof Error   ){
                self.#output.normal( mensaje.stack );
            } else {
                self.#output.normal( mensaje );
            }
            self.#output.line_break();

        });
        
    }
    
    print_total_asserts(){
        // "Tests Total: "+tests_count +" Asserts: "+ this.counters.asserts +"  Passed: "+ok+"  Failed: "+failed+"  Risky: "+risky;
        var text = this.#counters.get_totals_text(); 
        
        this.#output.line_break();
        
        if( this.#counters.is_ok() ){
            this.#output.set_ok_color( );
        }
        if( this.#counters.is_risky() ){
            this.#output.set_risky_color();
        } 
        if( this.#counters.is_failed() ){
            this.#output.set_fail_color();
        } 
        this.#output.normal( text );

        this.#output.line_break();
    }
    
    print_time_spent(){
        var average = this.#main_timer.diff() / this.#counters.tests;
        var max = 0;
        var which_class = "";
        var which_method = "";
        this.#timers.forEach( function( item ){
            var timer = item[2];
            if( timer === undefined ){ // failed test ?
                return ;
            }
            
            var spent = timer.diff();
            if( parseFloat( spent ) > parseFloat( max ) ){
                which_class = item[0];
                which_method = item[1];
                max = spent;
            }
        });
        this.#output.line_break();
        this.#output.text_normal( "Total = "+this.#main_timer.diff()+" msecs / Test Average = "+average.toFixed(3)+" msecs" );
        
        this.#output.line_break();
        
        if( max > average ){
            this.#output.text_normal( "Slowest test: "+which_class+"."+which_method+" = "+max+" msecs"  );	    
            this.#output.line_break();
        }
    }
    
    end(){
        this.stop_main_timer( );
                
        var failed = this.#counters.failed;
        var risky = this.#counters.risky;

        this.#output.normal( " ("+this.#counters.ok+"/"+this.#counters.tests+")"  );
        this.#output.line_break();
        this.#output.line_break();
        if( failed > 0 || risky > 0 ){
            this.list_errors();
            // bash scripts could need this
            process.exitCode = 1; 
        }

        this.print_total_asserts();
        this.print_time_spent();
        
    }
    
    #output;
    #timers;
    #error_list;
    #counters;
    #main_timer;
    
    set_output( o ){
        this.#output = o;
    }

    
    constructor( output ) {
        if( output  === undefined ){
            output = new console_output();
        }
        
        this.set_output( output );
        this.#timers = [];
        this.#error_list = [];
        this.#counters = new counters();
        this.#main_timer = new myclock();
        this.#main_timer.start();
        
    }
    
    
}

export {console_report}