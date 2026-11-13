// GET DISPLAY ELEMENTS

const previousOperand = document.getElementById("previous-operand");
const currentOperand = document.getElementById("current-operand");


// GET ALL CALCULATOR BUTTONS

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");


// CALCULATOR VARIABLES

let currentNumber = "0";
let previousNumber = "";
let selectedOperator = null;
let shouldResetScreen = false;


// UPDATE DISPLAY

function updateDisplay() {
    currentOperand.textContent = currentNumber;

    if (selectedOperator !== null && previousNumber !== "") {
        previousOperand.textContent = `${previousNumber} ${selectedOperator}`;
    } else {
        previousOperand.textContent = "";
    }
}


// ADD NUMBERS

function appendNumber(number) {

    if (number === "." && currentNumber.includes(".") && !shouldResetScreen) {
        return;
    }

    if (shouldResetScreen) {
        currentNumber = number === "." ? "0." : number;
        shouldResetScreen = false;
    } else if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// CHOOSE AN OPERATOR

function chooseOperator(operator) {

    if (currentNumber === "" || currentNumber === ".") {
        return;
    }

    if (selectedOperator !== null && !shouldResetScreen) {
        calculate();
    }

    previousNumber = currentNumber;
    selectedOperator = operator;
    shouldResetScreen = true;

    updateDisplay();
}


// PERFORM CALCULATIONS

function calculate() {

    if (selectedOperator === null || shouldResetScreen) {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    switch (selectedOperator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentNumber = "Cannot divide by zero";
                previousNumber = "";
                selectedOperator = null;
                shouldResetScreen = true;

                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    // ROUND LONG DECIMAL RESULTS

    currentNumber = String(Number(result.toPrecision(12)));

    previousNumber = "";
    selectedOperator = null;
    shouldResetScreen = true;

    updateDisplay();
}


// CLEAR THE CALCULATOR

function clearCalculator() {

    currentNumber = "0";
    previousNumber = "";
    selectedOperator = null;
    shouldResetScreen = false;

    updateDisplay();
}


// DELETE THE LAST DIGIT

function deleteNumber() {

    if (shouldResetScreen) {
        return;
    }

    if (currentNumber.length === 1 || currentNumber === "Cannot divide by zero") {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}


// NUMBER BUTTON EVENTS

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        appendNumber(button.dataset.number);

    });

});


// OPERATOR BUTTON EVENTS

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        chooseOperator(button.dataset.operator);

    });

});


// ACTION BUTTON EVENTS

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        }

        if (action === "delete") {
            deleteNumber();
        }

        if (action === "equals") {
            calculate();
        }

    });

});


// INITIAL DISPLAY

updateDisplay();