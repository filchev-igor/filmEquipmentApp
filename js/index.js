'use strict';

class allScripts {
    #currentYear;

    constructor() {
        this.#setCurrentYear();
    }

    #setCurrentYear() {
        const date = new Date();

        this.#currentYear = date.getFullYear();
    }

    getCurrentYear() {
        return this.#currentYear;
    }
}

const scripts = new allScripts();
const currentYear = scripts.getCurrentYear();

console.log(currentYear);

document.getElementById("copyright-end").innerHTML = currentYear;