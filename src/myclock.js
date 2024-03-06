class myclock {
    constructor(){
    }
    start(){
        this.startTime2 = performance.now();        
    }
    stop(){
        this.endTime2 = performance.now();        
        this.timeDiff2 = this.endTime2 - this.startTime2; //in ms
    }
    diff(){
        return this.timeDiff2.toFixed(2);
    }
}


export {myclock} 