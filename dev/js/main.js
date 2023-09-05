const log = (e) => console.log(e);

function getDomElementByClassName(name) {
    return document.querySelector(name);
}

function getElem(name) {
    
}

function callbackAnimate(time) {
    let elem = getDomElementByClassName('.callback');

    setInterval(() => {
        elem.classList.add('animate-drop');

        setTimeout(() => {
            elem.classList.remove('animate-drop');
        }, 1000);
    }, time);
}

function hideCallback(name) {
    let node = getDomElementByClassName(name);
    let btn = getDomElementByClassName('.callback__btn-close'); 

    node.addEventListener('click', () => {
        log();
    });

    // node.classList.add('animate-hide');
    // node.classList.remove('callback_show');
}




function showCallback(params) {
    let node = getDomElementByClassName(params.nodeClassName);
    setTimeout(() => {
        node.classList.add('animate-show');
        node.addEventListener('animationend', () => {
            node.classList.add('callback_show');
            node.classList.remove('animate-show');
            if (params.addAnimationDrop) callbackAnimate(params.timeAnimateDrop);
        });
    }, params.timeAnimateShow);
}

showCallback({
    nodeClassName: '.callback',
    timeAnimateShow: 2000,
    addAnimationDrop: false,
    timeAnimateDrop: 6000
});