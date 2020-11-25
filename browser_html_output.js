export class browser_html_output {
    constructor(){
        this.FgBlack = "color:black";
        this.FgWhite = "color:white";
        this.BgGreen = "background-color:green";
        this.BgRed = "background-color:red";
        this.FgRed = "color:red";
        this.BgBlack = "background-color:black";
        this.BgYellow = "background-color:yellow";

            
        // combinations Fg/Bg
        this.risky_color = this.FgWhite+this.BgYellow;
        this.ok_color = this.FgBlack+this.BgGreen;
        this.fail_color = this.FgWhite+this.BgRed;
        
        this.reset_color = this.BgBlack;
        this.reset_bg_color = this.FgWhite;
        
        this.current_color = this.reset_color;
        this.current_bg_color = this.reset_bg_color;
    }
    normal( text ){
        document.write( text );
    }
    
    set_fail_color(){
        this.current_color = this.FgWhite;
        this.current_bg_color = this.BgRed;
    }
    set_ok_color(){
        this.current_color = this.FgBlack;
        this.current_bg_color = this.BgGreen;
    }
    set_risky_color(){
        this.current_color = this.FgWhite;
        this.current_bg_color = this.BgRed;
    }
    open_div(){
        var fg = this.current_color;
        var bg = this.current_bg_color;
        return "<div style='color:"+fg+";background-color:"+bg+"'>";
    }
    fail( text ){
        this.set_fail_color();
        text = this.open_div()+text+"</div>";
        document.write( text );
    }
    risky( text ){
        this.set_risky_color();
        text = this.open_div()+text+"</div>";
        document.write( text );
    }
    normal( text ){
        this.set_fail_color();
        text = this.open_div()+text+"</div>";
        document.write( text );

//        console.log( text+this.reset_color );
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