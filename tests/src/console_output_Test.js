/* console_output_Test
 */

import { console_output } from "../../src/console_output.js";
import { TestSuite, Test, TestBad } from "../../src/testSuite.js";

import { fakeProcess } from "../doubles/fakeProcess.js";

class console_output_Test extends Test {

    /*  just for code coverage ...
     */
    test_comparar_vacio(){
        let co = new console_output();
        let p = new fakeProcess();
        

        co.set_process( p );
        co.normal( "sarasa estuvo aqui" );
        co.set_fail_color();
        co.set_risky_color();
        co.risky( "nada" );
        co.fail( "nada" );
        co.green( "nada" );

        this.assertTrue( true );
        this.done();
    }
}

export { console_output_Test }


