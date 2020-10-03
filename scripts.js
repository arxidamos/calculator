add = (a, b) => {
    return a + b;
}

substract = (a, b) => {
    return a - b;
}

multiply = (a, b) => {
    return a * b;
}

divide = (a, b) => {
    if (b == 0) {
        return "Nope!"
    } else {
        return (a / b);
    }
}

operate = (operator, a, b) => {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let displayNum = '0';
let operandOne = operandTwo = null;
let symbolOne = symbolTwo = null;
let result = null;

updateDisplay = () => {
    const display = document.querySelector('.item-display'); 
    display.textContent = displayNum;
    // Show first 9 digits, calc screen can't fit in more
    if(display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }
}
// updateDisplay();

const buttons = document.querySelectorAll('button');
buttonClick = () => {
    for (let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {

            // On number press
            if (buttons[i].classList == "item-number") {
                inputOperand(buttons[i].value);
                updateDisplay();
            }
            // On symbol press
            else if (buttons[i].classList == "item-symbol") {
                inputSymbol(buttons[i].value);
            }
            else if (buttons[i].id == "clear") {
                inputAC();
                updateDisplay();
            }
            else if (buttons[i].classList == "item-equals") {
                inputEquals();
                updateDisplay();
            }

        });
    }
}

inputOperand = (value) => {
    // Define operand 1
    if (symbolOne === null) {
        // First entry for operand 1 (display is 0)
        if (displayNum === 0 || displayNum === '0') {
            displayNum = value;
            console.log(`Inserting nums - First entry for operand 1`);
            // operandOne = displayNum;
        }
        // First entry for operand 1 (display not 0 but we are after a calculation)
        else if (displayNum === operandOne) {
            displayNum = value;
            console.log(`Inserting nums - First entry for operand 1 after a calculation`);            
        }
        // Continue entries for operand 1 (display not 0)
        else {
            displayNum += value;
            console.log(`Inserting nums - Continuing entries for operand 1`);
        }
    }
    // Define operand 2
    else {
        // First entry for operand 2
        if (displayNum === operandOne) {
            displayNum = value;
            console.log(`Inserting nums - First entry for operand 2`);
        }
        // Continue entries for operand 2
        else {
            displayNum += value;
            console.log(`Inserting nums - Continuing entries for operand 2`);
        }
    }
}

inputAC = () => {
    displayNum = '0';
    operandOne = operandTwo = null;
    symbolOne = symbolTwo = null;
    result = null;
}

inputEquals = () => {
    if (symbolOne === null) {
        displayNum = displayNum;
    }
    else if (symbolTwo !== null) {
        operandTwo = displayNum;
        result = operate(symbolOne, Number(operandOne), Number(operandTwo));
        displayNum = result;
        operandOne = displayNum;
        operandTwo = null;
        symbolOne = symbolTwo = null;
        result = null;
    }
    else {
        operandTwo = displayNum;
        result = operate(symbolOne, Number(operandOne), Number(operandTwo));
        displayNum = result;
        operandOne = displayNum;
        operandTwo = null;
        symbolOne = symbolTwo = null;
        result = null;
    }

}

inputSymbol = (symbol) => {

    // First symbol, first time ever
    if (symbolOne === null && symbolTwo === null) {
        operandOne = displayNum;
        console.log("SYMBOL: Our first operand is finished. It is ", operandOne);
        symbolOne = symbol;
        console.log("SYMBOL: Our first symbol is ", symbolOne);
    }
    // Second symbol, gotta compute now
    else if (symbolOne !== null && symbolTwo === null) {
        symbolTwo = symbol;
        operandTwo = displayNum;
        console.log("SYMBOL: Our second symbol is ", symbolOne);
        result = operate(symbolOne, Number(operandOne), Number(operandTwo));
        console.log(`Latest result is: ${result}`);

        displayNum = Number(result);
        operandOne = displayNum;
        result = null;
        updateDisplay();
    }
    // We' ve done at least one computation, move on
    else if (symbolOne !== null && symbolTwo !== null) {
        symbolOne = symbolTwo;
        symbolTwo = symbol;
        operandTwo = displayNum;
        result = operate(symbolOne, Number(operandOne), Number(operandTwo));
        displayNum = Number(result);
        updateDisplay();
        operandOne = displayNum;
        result = null;
    }
    return;
}


buttonClick();