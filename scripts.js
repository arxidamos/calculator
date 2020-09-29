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
        return "Don't divide to zero, douche!"
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
let symbolOne = symbolTwo = '';

updateDisplay = (value) => {
    const display = document.querySelector('.item-display');
    

    // Strip possible starting zero
    if (display.textContent === '0' || display.textContent == 0) {
        display.textContent = "";
    }
    display.textContent += value.replace(/\r?\n| |\r/g, "");
    
    if(display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }    

    // If AC pressed, clear the display
    if (value === 'clear') {
        display.textContent = '0';
    }
    // Store the current display in the global variable
    displayNum = display.textContent;
}

const buttons = document.querySelectorAll('button');
buttonClick = () => {

    for (let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {

            if (buttons[i].classList == "item-number") {
                // Typing 1st operand
                if (operandTwo === null) {
                    updateDisplay(buttons[i].textContent);
                }
                // Got 1st operand, pressed a symbol, going for 2nd
                else if (operandTwo === 0) {
                    updateDisplay("clear");
                    updateDisplay(buttons[i].textContent);
                    operandTwo = Number(displayNum);
                }
                // Typing 2nd operand
                else {
                    updateDisplay(buttons[i].textContent);
                }

                // console.log(`here printing...`, buttons[i].textContent);
            } else if (buttons[i].classList == "item-symbol") {

                // First symbol (no 2nd operand yet)
                if (symbolOne === '') {
                    operandOne = Number(displayNum);
                    operandTwo = 0;
                    symbolOne = buttons[i].textContent.replace(/\r?\n| |\r/g, "");
                } 
                // Second symbol (we need to calculate first two operands)
                else {
                    symbolTwo = buttons[i].textContent.replace(/\r?\n| |\r/g, "");
                    operandTwo = Number(displayNum);
                    console.log(`operandOne is ${operandOne}`);
                    console.log(`symbol is ${operandOne}`);
                    console.log(`operandTwo is ${operandTwo}`);
                    console.log(`symbol one is ${symbolOne}`);
                    
                    // Update display with result
                    updateDisplay("clear");
                    displayNum = (operate(symbolOne, operandOne, operandTwo).toString());
                    updateDisplay(displayNum);
                    console.log(operate(symbolOne, operandOne, operandTwo));

                    // Get ready for next calculation
                    symbolOne = '';
                    symbolTwo = '';
                    operandOne = displayNum;
                    operandTwo = 'null';

                }


                // console.log(buttons[i].innerHTML);
            } else if (buttons[i].id == "clear") {
                updateDisplay('clear');
                displayNum = '0';
                operandOne = operandTwo = null;
                symbolOne = symbolTwo = '';
                console.log("marika");
            }

        });
    }
}

buttonClick();