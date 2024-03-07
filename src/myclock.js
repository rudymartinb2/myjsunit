/*
 */
class myclock {
    #start_time = 0;
    #end_time = 0;
    #diff_time = 0;

    start(){
        this.#start_time = performance.now();
    }

    stop(){
        this.#end_time = performance.now();
        this.#diff_time = this.#end_time - this.#start_time; // values in milliseconds
    }
    diff(){
        return this.#diff_time.toFixed( 2 );
    }
}


export { myclock } 