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

document.getElementById("copyright-end").innerHTML = currentYear;

//TODO update titles of all pages (they have default name)