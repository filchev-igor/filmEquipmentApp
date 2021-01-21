"use strict";

class UpdateCopyright {
    #currentYear;
    #copyrightId;

    constructor(id) {
        this.#setCurrentYear();

        this.#copyrightId = id;
    }

    #setCurrentYear() {
        const date = new Date();

        this.#currentYear = date.getFullYear();
    }

    #getCurrentYear() {
        return this.#currentYear;
    }

    updateField() {
        document.getElementById(this.#copyrightId).innerHTML = this.#getCurrentYear();
    }
}

export default UpdateCopyright;