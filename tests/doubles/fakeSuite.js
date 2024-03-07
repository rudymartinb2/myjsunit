/* 
 * 
 */

import { fakeReport } from "../doubles/fakeReport.js";

class fakeSuite {
    constructor(){
        this.report = new fakeReport();
    }
    dump_test_time(){
        
    }
    get_report(){
        return this.report;
    }
    check_done(){
        
    }
}
export { fakeSuite } 