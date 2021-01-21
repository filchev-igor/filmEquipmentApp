'use strict';

import UpdateCopyright from "../js/updateCopyright.js";

const updateCopyright = new UpdateCopyright("copyrightEnd");
updateCopyright.updateField();

class SettingsToggleSwitch {
    constructor(settingsInput) {
        const radioElementsNames = settingsInput["radioElements"]["suppliers"];

        for (const radioElementsName of radioElementsNames) {
            const radioElements = document.getElementsByName(radioElementsName);

            const [handledElementsName,,] = radioElementsName.split(/(?=[A-Z])/);

            let handledElements = document.getElementsByClassName(handledElementsName);

            if (!handledElements.length) {
                const id = settingsInput["radioElements"]["consumers"]["footerConsumer"];

                handledElements = document.querySelectorAll("#" + id);
            }

            for (const radioElement of radioElements) {
                const color = radioElement.dataset.bgColor;

                radioElement.labels[0].addEventListener("click", () => this.#handleColorToggle(color, handledElements));
            }
        }
    }

    #handleColorToggle(color, handledElements) {
        for (const handledElement of handledElements) {
            const elementClassList = handledElement.className
                .split(" ")
                .filter(value => value.includes("bg-") && value !== "bg-gradient");

            handledElement.classList.remove(elementClassList[0]);
            handledElement.classList.add(color);
        }
    }
}

const NAVBAR_BG_RADIO_NAME = "navbarColorPicker";
const FOOTER_BG_RADIO_NAME = "footerColorPicker";

const FOOTER_CONSUMER_ID = "footerColorToggleConsumer";

//const navbarColorPicker = document.querySelectorAll("#navbarColorPicker > .bg-gradient");
//const footerColorPicker = document.querySelectorAll("#footerColorPicker > .bg-gradient");

//const settingsInput = [navbarColorPicker, footerColorPicker];
const settingsInput = {
    "radioElements": {
        "suppliers": [NAVBAR_BG_RADIO_NAME, FOOTER_BG_RADIO_NAME],
        "consumers": {
            "footerConsumer": FOOTER_CONSUMER_ID
        }
    }
};

const settingsToggleSwitch = new SettingsToggleSwitch(settingsInput);

//TODO update titles of all pages (they have default name)
//TODO add button with setup via JS