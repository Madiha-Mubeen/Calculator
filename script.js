let display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") display.value = "";
    if (value === "." && display.value.endsWith(".")) return;
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Error") {
        display.value = "";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function toggleSign() {
    if (display.value) {
        display.value = display.value.startsWoith("-") ? display.value.slice(1) : "-" + display.value;
    }
}

function calculateResult() {
   try {
    const result = computeExpression(display.value);
    display.value = result;
   } catch {
    display.value = "Error";
   }
}

function computeExpression(expr) {
    //Remove Spaces
    expr = expr.replace(/\s+/g, '');

    //Tokenize expression into numbers and operators
    const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/()])/g);
    if (!tokens) throw "Invalid Expression";

    //Use Shunting Yard algorithm to convert to postfix
    const outputQueue = [];
    const operatorStack = [];

    const precedence = {
        '+' : 1,
        '-' : 1,
        '*' : 2,
        '/' : 2,
    };

    const applyOperator = (a,b, op) => {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op)  {
            case '+' : return a + b;
            case '-' : return a-b;
            case '*' : return a * b;
            case '/' : return b !== 0 ? a / b : (() => { throw "Division by zero";})();
            default: throw "Unknown operator";
        }
    };

    for (let token of tokens) {
        if (!isNaN(token)) {
            outputQueue.push(token);
        } else if ('+-*/'.includes(token)) {
            while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
             outputQueue.push(operatorStack.pop())   
            }
            operatorStack.push(token);
        } else if (token ===
    }

    while (operatorStack.length) outputQueue.push(operatorStack.pop());


    //Evaluate postfix expression
    const stack = [];
    for (let token of outputQueue) {
        if (!isNaN(token)) stack.push(token);
        else stack.push(applyOperator(stack.pop(), stack.pop(), token));
    }
    if (stack.length !== 1) throw "Invalid Expression";
    return stack[0];

} 


//Scientific Functions
function squareRoot() {
    display.value = Math.sqrt(parseFloat(display.value));
}

function square() {
    display.value = Math.pow(parseFloat(display.value), 2);
}

function inverse() {
    const val = parseFloat(display.value);
    if(val !== 0) display.value = 1 / val;
    else display.value = "Error";
}

function absValue() {
    display.value = Math.abs(parseFloat(display.value));
}

function exp() {
    display.value = Math.exp(parseFloat(display.value));
}

function log10() {
    display.value = Math.log10(parseFloat(display.value));
}

function ln() {
    display.value = Math.log(parseFloat(display.value));
}

function power10() {
    display.value = Math.pow(10, parseFloat(display.value));
}

function power(n) {
    display.value = Math.pow(parseFloat(display.value), n);
}

function factorial() {
    const num = parseInt(display.value);
    if (num < 0) {
        display.value = "Error";
        return;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    display.value = result;
}

function modulo() {
    const tokens = display.value.split("mod");
    if(tokens.length === 2) {
        const a = parseFloat(tokens[0]);
        const b = parseFloat(tokens[1]);
        display.value = a % b;
    } else {
        display.value = "Error";
    }
}

function percent() {
    display.value = parseFloat(display.value) / 100;
}

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});