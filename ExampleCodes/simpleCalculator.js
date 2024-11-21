(() => {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #333;
        border-radius: 20px;
        box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.25),
                    10px 10px 70px rgba(0, 0, 0, 0.25),
                    inset -5px -5px 15px rgba(0, 0, 0, 0.5),
                    inset 5px 5px 15px rgba(0, 0, 0, 0.5);
        padding: 20px;
        z-index: 10000;
        min-width: 350px;
        `;
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.5em;
        padding: 5px 10px;
        `;
    closeButton.onclick = () => modal.remove();
    modal.appendChild(closeButton);
    const container = document.createElement("div");
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        `;
    modal.appendChild(container);
    const calculatorStyle = `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        width: 100%;
        max-width: 300px;
        `;
    const buttonStyle = `
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, #2f2f2f, #3f3f3f);
        color: white;
        font-size: 1.2em;
        cursor: pointer;
        border: none;
        border-radius: 10px;
        height: 60px;
        box-shadow: inset -5px 0 8px rgba(0, 0, 0, 0.15),
                    inset 0 -5px 8px rgba(0, 0, 0, 0.25);
        `;
    const inputStyle = `
        grid-column: span 4;
        height: 50px;
        margin-bottom: 10px;
        border: none;
        border-radius: 10px;
        background: #a7af7c;
        text-align: right;
        font-size: 1.5em;
        padding: 5px 10px;
        `;

    const calculator = document.createElement("form");
    calculator.name = "calc";
    calculator.style.cssText = calculatorStyle;

    const input = document.createElement("input");
    input.type = "text";
    input.name = "txt";
    input.readOnly = true;
    input.style.cssText = inputStyle;
    calculator.appendChild(input);

    const buttons = [
        { text: "C", action: () => (input.value = ""), style: "background: #f00;" },
        { text: "/", action: () => (input.value += "/") },
        { text: "*", action: () => (input.value += "*") },
        { text: "-", action: () => (input.value += "-") },
        { text: "7", action: () => (input.value += "7") },
        { text: "8", action: () => (input.value += "8") },
        { text: "9", action: () => (input.value += "9") },
        {
        text: "+",
        action: () => (input.value += "+"),
        style: "grid-row: span 2;",
        },
        { text: "4", action: () => (input.value += "4") },
        { text: "5", action: () => (input.value += "5") },
        { text: "6", action: () => (input.value += "6") },
        { text: "1", action: () => (input.value += "1") },
        { text: "2", action: () => (input.value += "2") },
        { text: "3", action: () => (input.value += "3") },
        { text: "0", action: () => (input.value += "0") },
        { text: "00", action: () => (input.value += "00") },
        { text: ".", action: () => (input.value += ".") },
        {
        text: "=",
        action: () => {
            try {
            input.value = eval(input.value);
            } catch {
            input.value = "Error";
            }
        },
        style: "background: #2196f3;",
        },
    ];

    buttons.forEach((btn) => {
        const button = document.createElement("span");
        button.textContent = btn.text;
        button.style.cssText = buttonStyle + (btn.style || "");
        button.onclick = btn.action;
        calculator.appendChild(button);
    });

    container.appendChild(calculator);

    document.body.appendChild(modal);
})();
