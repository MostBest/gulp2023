const log = (e) => console.log(e);
const mTruns = (x) => Math.trunc(x);


log('Hello, World!');

const btnGetTime = document.getElementById("btn__stop-timer");
const btnResTime = document.getElementById("btn__reset-timer");
const outputBestTime = document.getElementById("best-time");
const outputCounter = document.getElementById("counter");

let bestTime = 0;

makeDate();

function makeDate() {
    let date = new Date().getTime();


    btnGetTime.addEventListener("click", () => {
        let newDate = new Date().getTime();
        let result = mTruns((newDate - date)/1000);
        
        
        
        date = null;
        date = new Date().getTime();

        if(bestTime === 0) {
            outputBestTime.innerHTML =  result;
            bestTime = result;
        }
        if(result < bestTime) {
            outputBestTime.innerHTML = result;
            bestTime = result;
        }
        log(result);
    });

    btnResTime.addEventListener("click", () => {
        date = null;
        date = new Date().getTime();
    });
}

function makeCounter() {
    let count = 1;
    return function () {
       return count++;
    }
}

let counter = makeCounter();


btnGetTime.addEventListener("click", () => {
    counter()	
   
});



{

    function clock () {
        let date = new Date();
        let time = {
           hours: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
           minutes: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
           seconds: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        }
        document.querySelector('.clock').innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
    }

    setInterval(clock, 1000);
}