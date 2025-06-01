const btn_add = document.querySelector("#add");
const btn_subtract = document.querySelector("#subtract");
const btn_multiply = document.querySelector("#multiply");
const btn_divide = document.querySelector("#divide");
const btn_sum = document.querySelector("#sum");
const display = document.querySelector(".calc-display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const btn_delete = document.querySelector("#delete");
const btn_clear = document.querySelector("#clear");

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
            }
        } else {
            if (isResultShown) {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = false;
                display.textContent = "";
                return;
            }
            if (num1 !== null && operator !== null && display.textContent !== "") {
                num2 = parseFloat(display.textContent);
                const result = operate(num1, num2, operator);
                display.textContent = result;
                num1 = result;
                operator = op;
                isResultShown = true;
            } 
            else if (display.textContent !== "") {
                num1 = parseFloat(display.textContent);
                operator = op;
                isResultShown = true;
            }
        }
    });
});

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    })
});

function deleteDigit () {
    if (display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, -1);
    }
};

function populateDisplay(value) {
    if (isResultShown) {
        display.textContent = value; // Починаємо з нового числа
        isResultShown = false;
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
        case "x": return multiply(a, b);
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
    return b === 0 ? "Error" : a / b;
}


btn_delete.addEventListener("click", deleteDigit);
btn_clear.addEventListener("click", () => {
    display.textContent = "";
    num1 = null;
    num2 = null;
    operator = null;
});


//keyboard support 
document.addEventListener('keypress', (event) => {
    if (event.key == "1") {display.textContent += event.key;}
    if (event.key == "2") {display.textContent += event.key;}
    if (event.key == "3") {display.textContent += event.key;}
    if (event.key == "4") {display.textContent += event.key;}
    if (event.key == "5") {display.textContent += event.key;}
    if (event.key == "6") {display.textContent += event.key;}
    if (event.key == "7") {display.textContent += event.key;}
    if (event.key == "8") {display.textContent += event.key;}
    if (event.key == "9") {display.textContent += event.key;}
    if (event.key == "0") {display.textContent += event.key;}
    if (event.key == "*") {}
    if (event.key == ".") {}
    if (event.key == "/") {}
    if (event.key == "=") {}
    if (event.key == "+") {}
    if (event.key == "-") {}
    
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
