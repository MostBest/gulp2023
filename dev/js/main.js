function getElement(name) {
    return document.querySelector(name);
}

function changeStatus(element) {
    let domElement = getElement(element) 

    if (domElement.classList.contains('drop')) {
        domElement.classList.remove('drop');
        return;
    }
    domElement.classList.add('drop');
}

setInterval(() => changeStatus('.callback'), 2500);

// функция получает элемнт в тело которого затем выводит текущий год

class Year {
    constructor(elem) {
        this.elem = elem;
    }

    init() {
        this.elem.innerHTML = new Date().getFullYear();
    }
}

const year = new Year(document.getElementById('year'));