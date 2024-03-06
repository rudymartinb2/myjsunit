import { TestSuite } from "../src/testSuite.js" ;


import { promise_Test } from "./promise/promise_Test.js" ;

import { assert_Test } from "./src/assert_Test.js" ;
import { testSuite_Test } from "./src/testSuite_Test.js" ;

import { comparar_claves_Test } from "./src/comparar_claves_Test.js" ;
import { console_output_Test } from "./src/console_output_Test.js" ;
import { console_report_Test } from "./src/console_report_Test.js" ;


class myTestSuite extends TestSuite {

    start(){
        
        
        this.addTest( testSuite_Test  );
        
        this.addTest( assert_Test  );
        this.addTest( promise_Test  );
        
        this.addTest( comparar_claves_Test  );
        this.addTest( console_output_Test  );
        this.addTest( console_report_Test  );
        
        this.run();
    }
    
}

export {  myTestSuite }

