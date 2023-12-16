const CreateSetTimeout = () => {

    let timerId = 0;
    let timerMap = {};

    const setTimeoutPoly = (callback, delay, ...args) => {
        let startTime = Date.now();
        let id = timerId++;
        timerMap[id] = 1;
        function triggerCallback(){
            let currTime = Date.now();
            if(currTime > startTime + delay){
                if(timerMap[id]){
                    callback.apply(this,...args);
                }
            }
            else {
                requestIdleCallback(triggerCallback);
            }
        }
        requestIdleCallback(triggerCallback);
        return id;
    }

    const clearTimeoutPoly = (timerId) => {
        delete timerMap[timerId];
    }


    return {setTimeoutPoly, clearTimeoutPoly};
}


const {setTimeoutPoly, clearTimeoutPoly} = CreateSetTimeout();


console.log("hello start");
setTimeoutPoly(() => {
    console.log("hello from settimeout")
}, 4000);

console.log("hello end")

