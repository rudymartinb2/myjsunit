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
    check_done(){
        
    }
}
export { fakeSuite } 