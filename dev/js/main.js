const l = (e) => console.log(e);

function getDomElementByClassName(name) {
    return document.querySelector(name);
}


function callbackAnimate(time) {
    let elem = getDomElementByClassName('.callback');

    setInterval(() => {
        elem.classList.add('drop');
        setTimeout(() => {
            elem.classList.remove('drop');
        }, 1000);
    }, time);
}

setTimeout(() => {
    let elem = getDomElementByClassName('.callback');
    elem.classList.add('show');
}, 1000);

callbackAnimate(15000);