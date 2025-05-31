const btn_add = document.querySelector("#add");
const btn_subtract = document.querySelector("#subtract");
const btn_multiply = document.querySelector("#multiply");
const btn_divide = document.querySelector("#divide");
const btn_sum = document.querySelector("#sum");
const display = document.querySelector(".calc-display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const btn_delete = document.querySelector("#delete");

let num1 = null;
let num2 = null;
let operator = null;

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const op = button.textContent;
        if (op === "=") {
            num2 = parseFloat(display.textContent);
                if (num1 !== null && operator !== null) {
                    const result = operate(num1, num2, operator);
                    display.textContent = result;
                    num1 = null;
                    num2 = null;
                    operator = null;
                } else {
                num1 = parseFloat(display.textContent);
                operator = op;
                display.textContent = "";
            }
        }
    })
});

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    })
});

function operate (a, b, operator) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        case "=": return sum(a, b);
        default: return b;
    }
    
};

function deleteDigit () {
    display.textContent = display.textContent.slice(0, -1);
}

function populateDisplay (value) {
    display.textContent += value;
};

function add (numbers) {
    let sum = 0;
	    for (let number of numbers) {
            sum += number;
        }
    return sum;
};

function subtract (...numbers) {
	let sum = numbers[0];
	    for (let number of numbers.slice(1)) {
            sum -= number;
        }
    return sum;
};

function sum (numbers) {
    let total = 0;
        for (let number of numbers) {
            total += number;
        }
    return total;
};

function multiply (numbers) {
    let product = 1;
	    for (let number of numbers) {
            product *= number;
        }
    return product;
};

 function divide (...numbers) {
    let product = numbers[0];
        for (let number of numbers.slice(1)) {
            product /= number;
        }
    return product; 
};

btn_delete.addEventListener("click", deleteDigit);