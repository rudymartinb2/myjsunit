export class browser_log_output {
    constructor(){
        this.FgBlack = "";
        this.FgWhite = "";
        this.BgGreen = "";
        this.BgRed = "";
        this.FgRed = "";
        this.BgBlack = "";
        this.BgYellow = "";

            
        // combinations Fg/Bg
        this.risky_color = this.FgWhite+this.BgYellow;
        this.ok_color = this.FgBlack+this.BgGreen;
        this.fail_color = this.FgWhite+this.BgRed;
        
        this.reset_color = "";
    }
    normal( text ){
        process.stdout.write(text);
    }
    set_fail_color(){
//        process.stdout.write( this.fail_color  );
    }
    set_ok_color(){
//        process.stdout.write( this.ok_color  );
    }
    set_risky_color(){
//        process.stdout.write( this.risky_color  );
    }
    
    fail( text ){
        var fail_color = this.fail_color;
        var end_color = this.FgWhite+this.BgBlack;
        console.log( fail_color+text+end_color  );
    }
    risky( text ){
        var end_color = this.FgWhite+this.BgBlack;
        console.log( this.risky_color+ text + end_color );
    }
    normal( text ){
        console.log( text+this.reset_color );
    }

    line_break(){
        console.log( "\n" );
    }

    text_normal( text ){
        console.log( text+this.reset_color );
    }

    green( text ){
        console.log( this.ok_color+text+this.reset_color );
    }
    

}