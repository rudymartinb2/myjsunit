/* counters
 */

class counters {
    constructor(){
        this.tests = 0;
        this.failed = 0;
        this.risky = 0;
        this.ok = 0;
        this.asserts = 0;
    }
    inc_tests(){
        this.tests++;
    }
    inc_failed(){
        this.failed++;
    }
    inc_risky(){
        this.risky++;
    }
    inc_ok(){
        this.ok++;
    }
    inc_asserts( number ){
        this.asserts += number ;
    }
    get_totals_text() {
        var failed = this.failed;
        var risky = this.risky;
        var ok = this.ok;
        var tests_count = this.tests;

        return "Tests Total: "+tests_count +" Asserts: "+ this.asserts +"  Passed: "+ok+"  Failed: "+failed+"  Risky: "+risky;
    }
    is_ok() {
        return this.failed == 0 && this.risky == 0;
    }

    is_failed() {
        return this.failed > 0;
    }
    is_risky() {
        return this.risky > 0;
    }

}

export { counters }

