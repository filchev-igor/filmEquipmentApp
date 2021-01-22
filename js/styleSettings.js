class StyleSettings {
    constructor(settingsInput) {
        const radioElementsNames = settingsInput["radioElements"]["suppliers"];

        for (const radioElementsName of radioElementsNames) {
            const radioElements = document.getElementsByName(radioElementsName);

            const [handledElementsName, ,] = radioElementsName.split(/(?=[A-Z])/);

            const handledElementsId = settingsInput["radioElements"]["consumers"][handledElementsName];

            for (const radioElement of radioElements) {
                const bgColor = radioElement.dataset.bgColor;
                const elementLabel = radioElement.labels[0];

                elementLabel.addEventListener("click",
                    () => this.#handleBgColorToggle([bgColor, handledElementsId])
                );
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

            switchElement.addEventListener("click",
                () => this.#handleNavbarColorSchemes([numberOrder, switchElement, switchConsumerId])
            );
        }

        const textToggleElementName = settingsInput["textOnPage"]["color"]["supplier"];
        const textConsumerElementId = settingsInput["textOnPage"]["color"]["consumer"];

        const textToggleElements = document.getElementsByName(textToggleElementName);

        for (const pageToggleElement of textToggleElements) {
            const pageToggleElementLabel = pageToggleElement.labels[0];
            const textColor = pageToggleElement.dataset.textColor;

            pageToggleElementLabel.addEventListener("click",
                () => this.#handleTextColorToggle([textColor, textConsumerElementId])
            );
        }

        const textSizeSupplierId = settingsInput["textOnPage"]["size"]["supplier"];
        const textSizeConsumerId = settingsInput["textOnPage"]["size"]["consumer"];

        const textSizeSupplier = document.getElementById(textSizeSupplierId);

        textSizeSupplier.addEventListener("input",
            (e) => this.#handleTextSize([textSizeSupplier, textSizeConsumerId])
        );
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
        } else {
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

        const element = document.getElementById(textConsumerElementId);

        const removableClass = element.className
            .split(" ")
            .filter(value => value.includes("text-"))
            .join();

        if (removableClass !== "")
            element.classList.remove(removableClass);

        element.classList.add(textColor);
    }

    #handleTextSize(props) {
        const [textSizeSupplier, textSizeConsumerId] = props;

        const elements1 = document.querySelectorAll("#" + textSizeConsumerId + " p");
        const elements2 = document.querySelectorAll("#" + textSizeConsumerId + " ul.list-group");

        for (const element of elements1)
            element.style.fontSize = textSizeSupplier.value + "rem";

        for (const element of elements2)
            element.style.fontSize = textSizeSupplier.value + "rem";
    }
}

export default StyleSettings;