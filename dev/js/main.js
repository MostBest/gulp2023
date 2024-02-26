const log = (e) => console.log(e);

log('Hello, World!');

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