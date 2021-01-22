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

            const handledElementsId = settingsInput["radioElements"]["consumers"][handledElementsName];

            for (const radioElement of radioElements) {
                const bgColor = radioElement.dataset.bgColor;
                const elementLabel = radioElement.labels[0];

                elementLabel.addEventListener("click", () => this.#handleBgColorToggle([bgColor, handledElementsId]));
            }
        }

        const switchElementsId = settingsInput["switchElements"]["suppliers"];

        for (const switchElementId of switchElementsId) {
            const switchElement = document.getElementById(switchElementId);

            //const checked = switchElement.checked;
            const switchElementLabel = switchElement.labels[0];

            const [numberOrder, tag,] = switchElementId.split(/(?=[A-Z])/);

            const switchConsumersId = settingsInput["switchElements"]["consumers"];
            const switchConsumerId = switchConsumersId.filter(value => value.includes(numberOrder + tag))
                .join();

            switchElement.addEventListener("click", () => this.#handleNavbarColorSchemes([numberOrder, switchElement, switchConsumerId]));
        }
    }

    #handleBgColorToggle(props) {
        const [bgColor, handledElementsId] = props;
        for (const handledElementId of handledElementsId) {
            const element = document.getElementById(handledElementId);

            const removableClass = element.className
                .split(" ")
                .filter(value => value.includes("bg-") && value !== "bg-gradient")
                .join();

            element.classList.remove(removableClass);
            element.classList.add(bgColor);
        }
    }

    #handleNavbarColorSchemes(props) {
        const [numberOrder, switchElement, switchConsumerId] = props;

        const consumerElement = document.getElementById(switchConsumerId);

        const checked = switchElement.checked;

        let colorScheme;
        let removeClass = "";
        let addClass = "";

        if (checked) {
            colorScheme = "dark";

            removeClass = "navbar-light";
            addClass = "navbar-dark";
        }
        else {
            colorScheme = "light";

            removeClass = "navbar-dark";

            if (numberOrder !== "first")
                addClass = "navbar-light";
        }

        switchElement.innerText = "first navbar" + colorScheme + "scheme";

        consumerElement.classList.remove(removeClass);
        consumerElement.classList.add(addClass);
    }
}

const NAVBAR_BG_RADIO_NAME = "navbarColorPicker";
const FOOTER_BG_RADIO_NAME = "footerColorPicker";

const FIRST_NAVBAR_CONSUMER_ID = "firstNavbarConsumer";
const SECOND_NAVBAR_CONSUMER_ID = "secondNavbarConsumer";

const FOOTER_CONSUMER_ID = "footerColorToggleConsumer";

const FIRST_NAVBAR_COLOR_SCHEME_SWITCHER = "firstNavbarColorScheme";
const SECOND_NAVBAR_COLOR_SCHEME_SWITCHER = "secondNavbarColorScheme";



const settingsInput = {
    "radioElements": {
        "suppliers": [NAVBAR_BG_RADIO_NAME, FOOTER_BG_RADIO_NAME],
        "consumers": {
            "navbar": [FIRST_NAVBAR_CONSUMER_ID, SECOND_NAVBAR_CONSUMER_ID],
            "footer": [FOOTER_CONSUMER_ID]
        }
    },
    "switchElements": {
        "suppliers": [FIRST_NAVBAR_COLOR_SCHEME_SWITCHER, SECOND_NAVBAR_COLOR_SCHEME_SWITCHER],
        "consumers": [FIRST_NAVBAR_CONSUMER_ID, SECOND_NAVBAR_CONSUMER_ID]
    }
};

const settingsToggleSwitch = new SettingsToggleSwitch(settingsInput);

//TODO update titles of all pages (they have default name)
//TODO add button with setup via JS