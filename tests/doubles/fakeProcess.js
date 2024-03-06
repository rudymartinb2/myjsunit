/* fakeProcess
 * 
 * despues veo que hago con todo esto ...
 */
class fakeSTDOUT {
    write(){ 
    }
}

class fakeProcess {
    stdout = null;
    constructor( ){
        this.stdout = new fakeSTDOUT( );
    }
    
}

export { fakeProcess }


