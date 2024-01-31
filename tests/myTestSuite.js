// import TestSuite class and Test class

// DO NOT REMOVE THIS NEXT IMPORT
// (update filepath if necessary)

import { TestSuite } from "../testSuite.js" ;


import { promise_Test } from "./promise/promise_Test.js" ;


import * as fs from 'fs';

class myTestSuite extends TestSuite {

    config(){
        this.stopOnError = true;
        // reporta todos los tiempos ahora ...
//        this.over10 = true;
    }

    start(){
        // punto de entrada 2: nodejs desde bash
        
        // todo: ver de q manera podemos bajar los tiempos ...

        
        this.addTest( new promise_Test() );

        // run all tests on testclases
        this.run();
    }
    
    // TEST A REVER:
    a_rever(){
//        this.addTest( new CE_Test() );

    }

}
/*
 * 
 * ver de que manera puedo incorporar la mecanica de lectura de los archivos json
 * y las consultas ajax, de tal manera que pueda invocarlo desde el script get_olt
 * 
 * y separar la info de los resellers.-
 * 
 * 
 */

export {  myTestSuite }