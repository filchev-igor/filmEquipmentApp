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
        const switchConsumersId = settingsInput["switchElements"]["consumers"];

        for (const switchElementId of switchElementsId) {
            const switchElement = document.getElementById(switchElementId);

            const switchElementLabel = switchElement.labels[0];

            const [numberOrder, tag,] = switchElementId.split(/(?=[A-Z])/);

            const switchConsumerId = switchConsumersId.filter(value => value.includes(numberOrder + tag))
                .join();

            switchElement.addEventListener("click", () => this.#handleNavbarColorSchemes([numberOrder, switchElement, switchConsumerId]));
        }

        const textToggleElementName = settingsInput["textOnPage"]["supplier"];
        const textConsumerElementId = settingsInput["textOnPage"]["consumer"];

        const textToggleElements = document.getElementsByName(textToggleElementName);

        for (const pageToggleElement of textToggleElements) {
            const pageToggleElementLabel = pageToggleElement.labels[0];
            const textColor = pageToggleElement.dataset.textColor;

            pageToggleElementLabel.addEventListener("click", () => this.#handleTextColorToggle([textColor, textConsumerElementId]));
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

    #handleTextColorToggle(props) {
        const [textColor, textConsumerElementId] = props;

        const element = document.querySelector("#" + textConsumerElementId + " p");

        const removableClass = element.className
            .split(" ")
            .filter(value => value.includes("text-"))
            .join();

        if (removableClass !== "")
            element.classList.remove(removableClass);

        element.classList.add(textColor);
    }
}

const NAVBAR_BG_RADIO_NAME = "navbarColorPicker";
const FOOTER_BG_RADIO_NAME = "footerColorPicker";
const PAGE_BG_RADIO_NAME = "pageColorPicker";

const FIRST_NAVBAR_CONSUMER_ID = "firstNavbarConsumer";
const SECOND_NAVBAR_CONSUMER_ID = "secondNavbarConsumer";

const FOOTER_CONSUMER_ID = "footerConsumer";

const PAGE_CONSUMER_ID = "pageConsumer";

const FIRST_NAVBAR_COLOR_SCHEME_SWITCHER = "firstNavbarColorScheme";
const SECOND_NAVBAR_COLOR_SCHEME_SWITCHER = "secondNavbarColorScheme";

const TEXT_COLOR_RADIO_NAME = "textColorPicker";


const settingsInput = {
    "radioElements": {
        "suppliers": [NAVBAR_BG_RADIO_NAME, FOOTER_BG_RADIO_NAME, PAGE_BG_RADIO_NAME],
        "consumers": {
            "navbar": [FIRST_NAVBAR_CONSUMER_ID, SECOND_NAVBAR_CONSUMER_ID],
            "footer": [FOOTER_CONSUMER_ID],
            "page": [PAGE_CONSUMER_ID]
        }
    },
    "switchElements": {
        "suppliers": [FIRST_NAVBAR_COLOR_SCHEME_SWITCHER, SECOND_NAVBAR_COLOR_SCHEME_SWITCHER],
        "consumers": [FIRST_NAVBAR_CONSUMER_ID, SECOND_NAVBAR_CONSUMER_ID]
    },
    "textOnPage": {
        "supplier": TEXT_COLOR_RADIO_NAME,
        "consumer": PAGE_CONSUMER_ID
    }
};

const settingsToggleSwitch = new SettingsToggleSwitch(settingsInput);

//TODO update titles of all pages (they have default name)
//TODO add button with setup via JS