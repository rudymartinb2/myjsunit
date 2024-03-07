/* 
 * 
 */

class counters {
    #tests = 0; 
    #failed = 0;
    #risky = 0;
    #ok = 0;
    #asserts = 0;

    get_ok_total(){
        let ok = this.#ok;
        let tests = this.#tests;
        return " (" + ok + "/" + tests + ")";
    }
    
    inc_tests(){
        this.#tests++;
    }
    inc_failed(){
        this.#failed++;
    }
    inc_risky(){
        this.#risky++;
    }
    inc_ok(){
        this.#ok++;
    }
    inc_asserts( ){
        this.#asserts ++;
    }
    
    // Robert Martin @unclebob says each test should contain only one assert.
    get_totals_text(){
        let failed = this.#failed;
        let risky = this.#risky;
        let ok = this.#ok;
        let tests_count = this.#tests;
        return " Tests Total: " + tests_count + " Asserts: " + this.#asserts + "  Passed: " + ok + "  Failed: " + failed + "  Risky: " + risky+" ";
    }
    
    is_ok(){
        return ! this.has_failed() && ! this.is_risky();
    }

    has_failed(){ 
        return this.#failed > 0;
    }
    is_risky(){ 
        return this.#risky > 0;
    }

}

export { counters }

