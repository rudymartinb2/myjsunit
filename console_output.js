class console_output {
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
        this.risky_color = this.FgWhite+this.BgYellow;
        this.ok_color = this.FgBlack+this.BgGreen;
        this.fail_color = this.FgWhite+this.BgRed;
        
        this.reset_color = "\x1b[0m";
    }
    normal( text ){
        process.stdout.write(text);
    }
    set_fail_color(){
        process.stdout.write( this.fail_color  );
    }
    set_ok_color(){
        process.stdout.write( this.ok_color  );
    }
    set_risky_color(){
        process.stdout.write( this.risky_color  );
    }
    
    fail( text ){
        var fail_color = this.fail_color;
        var end_color = this.FgWhite+this.BgBlack;
        process.stdout.write( fail_color+text+end_color  );
    }
    risky( text ){
        var end_color = this.FgWhite+this.BgBlack;
        process.stdout.write( this.risky_color+ text + end_color );
    }
    normal( text ){
        process.stdout.write( text+this.reset_color );
    }

    line_break(){
        process.stdout.write( "\n" );
    }

    text_normal( text ){
        process.stdout.write( text+this.reset_color );
    }

    green( text ){
        process.stdout.write( this.ok_color+text+this.reset_color );
    }
    

}

export {console_output} 