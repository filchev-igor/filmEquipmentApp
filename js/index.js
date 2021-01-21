'use strict';

import UpdateCopyright from "../js/updateCopyright.js";

const updateCopyright = new UpdateCopyright("copyrightEnd");
updateCopyright.updateField();

class SettingsToggleSwitch {
    constructor(settingsInput) {
        for (const input of settingsInput) {
            if (input.length) {
                const id = input[0].parentNode.id;
                const [elementName,,] = id.split(/(?=[A-Z])/);

                let elements = document.getElementsByClassName(elementName);

                if (!elements.length)
                    elements = document.querySelectorAll("#footerColorToggleConsumer");

                for (const selector of input) {
                    const elementClassList = selector.className
                        .split(" ")
                        .filter(value => value.includes("bg-") && value !== "bg-gradient");

                    const color = elementClassList[0];

                    selector.addEventListener("click", () => this.#handleColorToggle(color, elements));
                }
            }
        }
    }

    #handleColorToggle(color, elements) {
        for (const element of elements) {
            const elementClassList = element.className
                .split(" ")
                .filter(value => value.includes("bg-") && value !== "bg-gradient");

            console.log(color);

            element.classList.remove(elementClassList[0]);
            element.classList.add(color);
        }
    }
}

const navbarColorPicker = document.querySelectorAll("#navbarColorPicker > .bg-gradient");
const footerColorPicker = document.querySelectorAll("#footerColorPicker > .bg-gradient");

const settingsInput = [navbarColorPicker, footerColorPicker];

const settingsToggleSwitch = new SettingsToggleSwitch(settingsInput);

//TODO update titles of all pages (they have default name)
//TODO add button with setup via JS