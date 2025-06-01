const btn_add = document.querySelector("#add");
const btn_subtract = document.querySelector("#subtract");
const btn_multiply = document.querySelector("#multiply");
const btn_divide = document.querySelector("#divide");
const btn_sum = document.querySelector("#sum");
const btn_delete = document.querySelector("#delete");
const btn_clear = document.querySelector("#clear");
const btn_decimals = document.querySelector("#decimals");
const display = document.querySelector(".calc-display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");


let num1 = null;
let num2 = null;
let operator = null;
let isResultShown = false;

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const op = button.textContent;

        if (op === "=") {
            if (num1 !== null && operator !== null && display.textContent !== "") {
                num2 = parseFloat(display.textContent);
                const result = operate(num1, num2, operator);
                display.textContent = result;
                num1 = null;
                num2 = null;
                operator = null;
                isResultShown = true;
                btn_decimals.disabled = false;
            }
        } else {
            if (isResultShown) {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = false;
                display.textContent = "";
                btn_decimals.disabled = false;
                return;
            }
            if (num1 !== null && operator !== null && display.textContent !== "") {
                num2 = parseFloat(display.textContent);
                const result = operate(num1, num2, operator);
                display.textContent = result;
                num1 = result;
                operator = op;
                isResultShown = true;
                btn_decimals.disabled = false;
            } 
            else if (display.textContent !== "") {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = true;
                btn_decimals.disabled = false;
            }
        }
    });
});

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    })
});

btn_decimals.addEventListener ("click", handleDecimal);

function deleteDigit () {
    if (display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, -1);
    } else if (display.textContent.length < 0) {
        display.textContent = "";
        num1 = null;
        num2 = null;
        operator = null;
    }
};

function populateDisplay(value) {
    if (isResultShown) {
        display.textContent = value; 
        isResultShown = false;
        btn_decimals.disabled = false;
        return;
    }
    if (display.textContent.length < 14) {
        display.textContent += value;
    } else {
        display.classList.add("error");
        setTimeout(() => {
            display.classList.remove("error");
        }, 500);
    }
};

function operate(a, b, operator) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return b;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function sum (a, b) {
    let total = 0;
        for (let number of numbers) {
            total += number;
        }
    return total;
};

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? alert("You cannot divide by zero!") : a / b;
}

function handleDecimal() {
    const value = "."
    if (!display.textContent.includes(".") && display.textContent.length > 0) {
        display.textContent += value;
    } else if (display.textContent.includes(".")){
        btn_decimals.disabled = true;
    }
}


btn_delete.addEventListener("click", deleteDigit);
btn_clear.addEventListener("click", () => {
    display.textContent = "";
    num1 = null;
    num2 = null;
    operator = null;
    btn_decimals.disabled = false;
});


//keyboard support 
document.addEventListener('keypress', (event) => {
    const allowedKeys = "0123456789";
    const operatorKeys = ["+", "-", "*", "/", "=", "Enter"];
    if (allowedKeys.includes(event.key)) {
        if (display.textContent.length < 14) {
            if (isResultShown) {
                display.textContent = event.key;
                isResultShown = false;
            } else {
                display.textContent += event.key;
            }
            btn_decimals.disabled = false;
        } else {
            display.classList.add("error");
            setTimeout(() => {
                display.classList.remove("error");
            }, 500);
        }
    }

    if (operatorKeys.includes(event.key)) {
        if (event.key === "=" || event.key === "Enter") {
            if (num1 !== null && operator !== null && display.textContent !== "") {
                num2 = parseFloat(display.textContent);
                const result = operate(num1, num2, operator);
                display.textContent = result;
                num1 = null;
                num2 = null;
                operator = null;
                isResultShown = true;
                btn_decimals.disabled = false;
            }
        } else {
            const op = event.key === "*" ? "x" : event.key; // перетворюємо * на "x"
            if (isResultShown) {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = false;
                display.textContent = "";
                btn_decimals.disabled = false;
            } else if (num1 !== null && operator !== null && display.textContent !== "") {
                num2 = parseFloat(display.textContent);
                const result = operate(num1, num2, operator);
                display.textContent = result;
                num1 = result;
                operator = op;
                isResultShown = true;
                btn_decimals.disabled = false;
            } else if (display.textContent !== "") {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = true;
                btn_decimals.disabled = false;
            }
        }
    }

    if (event.key === ".") {
        if (!display.textContent.includes(".") && display.textContent.length > 0 && display.textContent.length < 14){
            display.textContent += ".";
            btn_decimals.disabled = true;
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") {
        event.preventDefault();
        deleteDigit();
    }
    if (event.key == "Delete") {
        event.preventDefault();
        display.textContent = "";
        num1 = null;
        num2 = null;
        operator = null;
    }
});
