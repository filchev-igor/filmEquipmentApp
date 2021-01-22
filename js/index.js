'use strict';

import UpdateCopyright from "../js/updateCopyright.js";
import StyleSettings from "../js/styleSettings.js";

const updateCopyright = new UpdateCopyright("copyrightEnd");
updateCopyright.updateField();

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

const FONT_SIZE_RANGE_ID = "fontSizeRange";

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
        "color": {
            "supplier": TEXT_COLOR_RADIO_NAME,
            "consumer": PAGE_CONSUMER_ID
        },
        "size": {
            "supplier": FONT_SIZE_RANGE_ID,
            "consumer": PAGE_CONSUMER_ID
        }
    },
};

new StyleSettings(settingsInput);

const toggleActiveLink = () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const element = document.querySelectorAll("a[href='" + page + "']");

    element[0].classList.add("active");
    element[0].setAttribute("aria-current", "page");
}

toggleActiveLink();

//TODO update titles of all pages (they have default name)