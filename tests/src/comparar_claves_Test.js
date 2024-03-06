/* 
 * 
 */
import { Test, TestBad } from "../../src/Test.js";
import { TestSuite } from "../../src/testSuite.js";

import { fakeSuite } from "../doubles/fakeSuite.js";
import { fakeTimer } from "../doubles/fakeTimer.js";
import { fakeReport } from "../doubles/fakeReport.js";

/*
 * el punto de lo que pretendo lograr:
 * 
 * dado un array de objetos, quiero que la funcion assertEquals
 * me tire las diferencias entre ambos usando + y -
 * 
 * 
 * mal nombre, obtiene diferencia entre claves
 * devuelve un obj
 * {
 * "add",  // que estan en 2 pero no en 1
 * "del" // que estan en 1 pero no en 2
 * }
 * 
 * 2024 03 04
 * el objetivo de fondo era generar una lista de diferencia de objetos entre dos arrays.
 * lo que complica la historia es la presencia de un atributo de id que identifica cada objeto en particular.
 * 
 * por lo tanto necesitamos una funcion anonima o una string que nos diga el id de cada objeto.
 * 
 * pero todo eso puede quedar para luego.
 * 
 */

function comparar_claves( obj1, obj2 ){

    let ret = {
        "add": [ ],
        "del": [ ],
        "mod": [ ]
    };

    if( obj1 === undefined && obj2 === undefined ) {
        return ret;
    }


    let keys1 = Object.keys( obj1 );
    let keys2 = Object.keys( obj2 );

    keys1.forEach( function ( key ){
        if( obj2[ key ] === undefined ) {
            ret.add.push( key );
        }
    } );

    keys2.forEach( function ( key ){
        if( obj1[ key ] === undefined ) {
            ret.del.push( key );
        }
    } );

    // evaluamos modificaciones ?
    keys1.forEach( function ( key ){
        let v1 = obj1[ key ] ;
        let v2 = obj2[ key ];
        let json1 = JSON.stringify( v1 )
        let json2 = JSON.stringify( v2 )
        if( json1 !== json2 ) { // cumple el caso de {} vs {}
            ret.mod.push( key );
        }
    } );



    return ret;
}


class comparar_claves_Test extends Test {

    /*  caso 1 objeto basico. tengo 2 elemenbtos y los quiero invertidos.
     */


    test_comparar_vacio(){
        let str1 = '[]';
        let str2 = '[]';

        let obj1 = JSON.parse( str1 );
        let obj2 = JSON.parse( str2 );

//        console.log( obj1 )
//        console.log( obj2 )

        let esperado = {
            "add": [ ],
            "del": [ ], "mod": [ ]
        };
        let actual = comparar_claves( obj1, obj2 );
//        console.log( actual )
        this.assertEquals( esperado, actual );
        this.done();
    }

    // primer vector vacio, segundo con 1 elemento
    test_comparar_vacio_vs_uno(){
        let str1 = '[]';
        let str2 = '[1]';

        let obj1 = JSON.parse( str1 );
        let obj2 = JSON.parse( str2 );

//        console.log( obj1 )
//        console.log( obj2 )

        let esperado = {"add": [ ], "del": [ "0" ], "mod": [ ]};
        let actual = comparar_claves( obj1, obj2 );
//        console.log( actual )
        this.assertEquals( esperado, actual );
        this.done();
    }

    test_comparar_uno_vs_dos(){
        let str1 = '[1]';
        let str2 = '[2]';

        let obj1 = JSON.parse( str1 );
        let obj2 = JSON.parse( str2 );

//        console.log( obj1 )
//        console.log( obj2 )

        let esperado = {"add": [ ], "del": [ ], "mod": [ "0" ]};
        let actual = comparar_claves( obj1, obj2 );
//        console.log( actual )
        this.assertEquals( esperado, actual );
        this.done();
    }

    test_comparar_obj_uno_vs_dos_igual(){
        let str1 = '[{}]';
        let str2 = '[{}]';

        let obj1 = JSON.parse( str1 );
        let obj2 = JSON.parse( str2 );

//        console.log( obj1 )
//        console.log( obj2 )


        let esperado = {"add": [ ], "del": [ ], "mod": []};
        let actual = comparar_claves( obj1, obj2 );
//        console.log( actual )
        this.assertEquals( esperado, actual );
        this.done();
    }
    
    test_comparar_obj_uno_vs_dos_desigual(){
        let str1 = '[{}]';
        let str2 = '[{"dos":2}]';

        let obj1 = JSON.parse( str1 );
        let obj2 = JSON.parse( str2 );

//        console.log( obj1 )
//        console.log( obj2 )


        let esperado = {"add": [ ], "del": [ ], "mod": [ "0"]};
        let actual = comparar_claves( obj1, obj2 );
//        console.log( actual )
        this.assertEquals( esperado, actual );
        this.done();
    }
    
    

//
//    test_comparar_claves(){
//        let o = [
//            {"AC_cli_id": 12658, "AC_cli_status": "inactivo", "AC_cli_nombre": "Celia", "AC_cli_apellido": "Arrupea", "AC_cli_plan_desc": "100x50 Residencial FO", "AC_cli_domicilio": "Rivadavia 3145", "AC_cli_company": "Arrupea Celia Raquel"}, {"AC_cli_id": 12659, "AC_cli_status": "activo", "AC_cli_nombre": "Celia", "AC_cli_apellido": "Arrupea", "AC_cli_plan_desc": "100x50 Residencial FO", "AC_cli_domicilio": "Rufino Fal 3337", "AC_cli_company": "Arrupea Celia Raquel"}
//        ];
//        
//        let str1 = '[{"AC_cli_id":12658,"AC_cli_status":"inactivo","AC_cli_nombre":"Celia","AC_cli_apellido":"Arrupea","AC_cli_plan_desc":"100x50 Residencial FO","AC_cli_domicilio":"Rivadavia 3145","AC_cli_company":"Arrupea Celia Raquel"},{"AC_cli_id":12659,"AC_cli_status":"activo","AC_cli_nombre":"Celia","AC_cli_apellido":"Arrupea","AC_cli_plan_desc":"100x50 Residencial FO","AC_cli_domicilio":"Rufino Fal 3337","AC_cli_company":"Arrupea Celia Raquel"}]';
//        let str2 = '[{"AC_cli_existe":true,"AC_cli_id":12659,"AC_cli_status":"activo","AC_cli_nombre":"Celia","AC_cli_apellido":"Arrupea","AC_cli_plan_desc":"100x50 Residencial FO","AC_cli_company":"Arrupea Celia Raquel"},{"AC_cli_existe":true,"AC_cli_id":12658,"AC_cli_status":"inactivo","AC_cli_nombre":"Celia","AC_cli_apellido":"Arrupea","AC_cli_plan_desc":"100x50 Residencial FO","AC_cli_company":"Arrupea Celia Raquel"}]';
//
//        let obj1 = JSON.parse( str1 );
//        let obj2 = JSON.parse( str2 );
//
////        console.log( obj1 )
////        console.log( obj2 )
//
//        let esperado = {"add": [ "AC_cli_domicilio" ], "del": [ "AC_cli_existe" ]};
//        let actual = comparar_claves( obj1, obj2 );
////        console.log( actual )
//        this.assertEquals( esperado, actual );
//        this.done();
//
//    }

}


export { comparar_claves_Test }


