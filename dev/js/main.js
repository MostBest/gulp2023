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