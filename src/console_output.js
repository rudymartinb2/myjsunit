class console_output {
    
    normal( text ){
        this.#process.stdout.write( text + this.reset_color );
    }
    
    set_fail_color(){
        this.#process.stdout.write( this.fail_color );
    }
    set_ok_color(){
        this.#process.stdout.write( this.ok_color );
    }
    set_risky_color(){
        this.#process.stdout.write( this.risky_color );
    }

    fail( text ){
        var fail_color = this.fail_color;
        var end_color = this.FgWhite + this.BgBlack;
        this.#process.stdout.write( fail_color + text + end_color );
    }
    risky( text ){
        var end_color = this.FgWhite + this.BgBlack;
        this.#process.stdout.write( this.risky_color + text + end_color );
    }

    line_break(){
        this.#process.stdout.write( "\n" );
    }

    text_normal( text ){
        this.#process.stdout.write( text + this.reset_color );
    }

    green( text ){
        this.#process.stdout.write( this.ok_color + text + this.reset_color );
    }
    
    #process = null;
    set_process( p ){
        this.#process = p;
    }

    constructor(){
        // ansi color codes for bash running under konsole (others might work)
        this.FgBlack = "\x1b[30m";
        this.FgWhite = "\x1b[37m";
        this.BgGreen = "\x1b[42m";
        this.BgRed = "\x1b[41m";
        this.FgRed = "\x1b[31m";
        this.BgBlack = "\x1b[40m";
        this.BgYellow = "\x1b[43m";


        // combinations Fg/Bg
        this.risky_color = this.FgWhite + this.BgYellow;
        this.ok_color = this.FgBlack + this.BgGreen;
        this.fail_color = this.FgWhite + this.BgRed;

        this.reset_color = "\x1b[0m";
        
        this.set_process( process );
    }
    

}

export {console_output} 