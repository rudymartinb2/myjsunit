/* console_report_Test
 * 
 */

import { console_output } from "../../src/console_output.js";
import { console_report } from "../../src/console_report.js";
import { TestSuite, Test, TestBad } from "../../src/testSuite.js";

import { fakeProcess } from "../doubles/fakeProcess.js";
import { fakeOutput } from "../doubles/fakeOutput.js";


class console_report_Test extends Test {

    /*  just for code coverage ...
     */
    test_comparar_vacio(){
        let cr = new console_report();
        
        let p = new fakeProcess();
        let co = new fakeOutput();
        co.set_process( p );
        cr.set_output( co );
        
        
//        cr.has_failed();
        cr.failed();
        cr.risky();
//        cr.list_errors();

        this.assertTrue( true );
        this.done();
    }
    
    test_comparar_vacio(){
        let cr = new console_report();
        
        let p = new fakeProcess();
        let co = new fakeOutput();
        co.set_process( p );
        cr.set_output( co );
        
        
//        cr.has_failed();
        cr.failed();
        cr.risky();
//        cr.list_errors();

        this.assertTrue( true );
        this.done();
    }
}

export { console_report_Test }


