/* 
 * 
 */

class counters {
    #tests = 0;
    #failed = 0;
    #risky = 0;
    #ok = 0;
    #asserts = 0;
    get_tests(){
        return this.#tests;
    }
    get_ok(){
        return this.#ok;
    }
    get_ok_total(){
        let ok = this.#ok;
        let tests = this.#tests;
        return " (" + ok + "/" + tests + ")";
    }
    
    get_failed(){
        return this.#failed;
    }
    get_risky(){
        return this.#risky;
    }
    get_asserts(){
        return this.#asserts;
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
        var failed = this.#failed;
        var risky = this.#risky;
        var ok = this.#ok;
        var tests_count = this.#tests;
        return " Tests Total: " + tests_count + " Asserts: " + this.#asserts + "  Passed: " + ok + "  Failed: " + failed + "  Risky: " + risky+" ";
    }
    
    is_ok(){
        return ! this.is_failed() && ! this.is_risky();
    }

    is_failed(){
        return this.#failed > 0;
    }
    is_risky(){
        return this.#risky > 0;
    }

}

export { counters }

