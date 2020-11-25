export class myclock {
    constructor(){
        this.startTime;
        this.endTime;        
    }
    start(){
        this.startTime = new Date();        
    }
    stop(){
        this.endTime = new Date();
        this.timeDiff = this.endTime - this.startTime; //in ms
        // strip the ms
//        this.timeDiff /= 1000;
    }
    diff(){
        return this.timeDiff;
    }
}
