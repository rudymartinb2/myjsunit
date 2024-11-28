/* getTestMethods
 */

function getTestMethods( objParam ){
    let properties = new Set();
    let currentObj = objParam;

    while( currentObj ) {
        // TODO: review -- just continue ?
        if( currentObj.constructor.name === "Test" || currentObj.constructor.name === "Object" ) {
            break;
        }
        // 
        let fn = function ( item ){
            if( typeof objParam[item] === 'function' && item.substring( 0, 4 ) === "test" ) {
                properties.add( item );
            }
        };
//            console.log( currentObj.constructor.name )

        Object.getOwnPropertyNames( currentObj ).forEach( fn );
        currentObj = Object.getPrototypeOf( currentObj );
    }

    return properties;

}

export { getTestMethods }


