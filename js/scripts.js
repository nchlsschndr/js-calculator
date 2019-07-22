// Basically the numbers get pushed to currentNum
// when clicking an operator, currentNum gets tempNum
// new numbers get pushed to currentNum again
// in the end its tempNum *operator* currentNum

// TODO: optimize setOperator
// TODO: Round numbers

// TODO: keyboard functionality
// TODO: handle weird JS behaviour e.g 2.3 - 2.5 = -0.20000000000000018
//       probably a library like decimals.js or big.js

const display = document.querySelector("#display");
const keys = document.querySelector(".pad");

let currentNum = [];
let tempNum = null;
let activeOperator = "";
let result = null;

keys.addEventListener("click", function (e) {
  // event delegation
  if (e.target.matches("button")) {
    handleClick(e);
  }
});

function handleClick(e) {
  const key = e.target.dataset.key;

  // check if key is a number
  if (/[0-9]/.test(key)) {
    // empty everything after there was a previous operation to start over
    if (result) {
      currentNum = [];
      result = null;
      updateDisplay("0");
    }
    currentNum.push(parseInt(key));
    updateDisplay(arrToFloat(currentNum));

  }

  if (key === "comma") {
    // dont set comma if there is a comma already or currentNum is empty
    if ((currentNum.indexOf('.') > -1) || currentNum.length === 0) {
      return;
    }
    currentNum.push(".");
    updateDisplay(arrToFloat(currentNum) + ".");
  }

  if (key === "allClear") {
    currentNum = [];
    tempNum = null;
    result = null;
    setOperator('reset');
    updateDisplay("0");
  }

  if (key === "clear") {
    currentNum = [];
    updateDisplay("0");
  }

  // Operators
  if (
    key === "plus" ||
    key === "minus" ||
    key === "divide" ||
    key === "multiply"
  ) {
    // only if a number was clicked or tempNum is not empty
    if (currentNum.length > 0 || tempNum != null) {
      equals();
      setOperator(key);
    }
  }

  if (key === "equals") {
    equals();
  }

  // debug
  document.querySelector('.temp-num').textContent = `-------tempNum: ${tempNum}`;
  document.querySelector('.active-operator').textContent = `activeOperator: ${activeOperator}`;
  document.querySelector('.current-num').textContent = `----currentNum: [${currentNum}]`;
  document.querySelector('.result').textContent = `--------result: ${result}`;
}



function updateDisplay(value) {
  display.textContent = value;
}

// converts array (currenNum) to float to calculate with
function arrToFloat(array) {
  return parseFloat(array.join(""));
}

function setOperator(operator) {
  const buttons = document.querySelectorAll(`button[data-key-type="operator"]`);
  buttons.forEach(function (el) {
    el.classList.remove("active");
  });

  if (operator === 'reset') {
    activeOperator = '';
    return;
  }

  // only switch numbers if no operator set
  // with this you can change operator after currentNum is set
  if (!activeOperator) {
    tempNum = arrToFloat(currentNum);
    currentNum = [];
  }
  activeOperator = operator;

  const button = document.querySelector(`button[data-key="${operator}"]`);
  button.classList.add("active");
}

function equals() {
  if (tempNum != null && currentNum.length > 0) {
    result = calculate(tempNum, activeOperator, arrToFloat(currentNum));
    tempNum = null;
    currentNum = [result]; // to calculate with
    setOperator('reset');
    updateDisplay(result);
  }
}

function calculate(n1, operator, n2) {
  switch (operator) {
    case "plus":
      return n1 + n2;
    case "minus":
      return n1 - n2;
    case "divide":
      return n1 / n2;
    case "multiply":
      return n1 * n2;
    default:
      return "operator error";
  }
}