// TODO: optimize setOperator/setoperatorUI … maybe put together 

// TODO: calculate when tempNum and currentNum are filled and operator is clicked

// TODO: keyboard functionality
// TDOD: handle weird JS behaviour e.g 2.3 - 2.5 = -0.20000000000000018

const display = document.querySelector("#display");
const keys = document.querySelector(".pad");

let currentNum = [];
let tempNum = null;
let activeOperator = "";
let result = undefined;

function updateDisplay(value) {
  display.textContent = value;
}

// converts array (currenNum) to float to calculate with
function arrToFloat(array) {
  return parseFloat(array.join(""));
}

function setOperator(operator) {
  // only switch numbers if no operator previously set
  // with this you can change operator after currentNum is set
  if (!activeOperator) {
    tempNum = arrToFloat(currentNum);
    currentNum = [];
  }
  setOperatorUI(operator);
  activeOperator = operator;
}

function setOperatorUI(operator) {
  const buttons = document.querySelectorAll(`button[data-key-type="operator"]`);
  buttons.forEach(function(el){
    el.classList.remove("active");
  });
  if (operator === 'reset'){
    return;
  }
  const button = document.querySelector(`button[data-key="${operator}"]`);
  button.classList.add("active");
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

function handleClick(e) {
  const key = e.target.dataset.key;

  // check if key is a number
  if (/[0-9]/.test(key)) {
    // empty everything after 'equals' was clicked to start over
    if (result) {
      currentNum = [];
      updateDisplay("0");
      result = 0;
    }
    currentNum.push(parseInt(key));
    updateDisplay(arrToFloat(currentNum));
    
  }

  if (key === "comma") {
    // dont set comma if there is a comma already or currentNum is empty
    if (currentNum[currentNum.length - 1] === "." || currentNum.length == 0) {
      return;
    }
    currentNum.push(".");
    updateDisplay(arrToFloat(currentNum) + ".");
  }

  if (key === "allClear") {
    setOperatorUI('reset');
    currentNum = [];
    tempNum = null;
    activeOperator = "";
    result = undefined;
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
    // set only if a number was clicked or tempNum is set
    if (currentNum.length > 0 || tempNum != null) {
      setOperator(key);
    }
  }

  if (key === "equals") {
    if (tempNum != null && currentNum.length > 0) {
      result = calculate(tempNum, activeOperator, arrToFloat(currentNum));
      updateDisplay(result);
      currentNum = [result]; // to work with
      tempNum = null;
      setOperatorUI('reset');
      activeOperator = "";      
    }
  }

  document.querySelector('.temp-num').textContent = `
    -------tempNum: ${tempNum}
  `;
  document.querySelector('.active-operator').textContent = `
    activeOperator: ${activeOperator}
  `;
  document.querySelector('.current-num').textContent = `
    ----currentNum: [${currentNum}]
  `;
  document.querySelector('.result').textContent = `
  --------result: ${result}
  `;
}

keys.addEventListener("click", function(e) {
  // event delegation
  if (e.target.matches("button")) {
    handleClick(e);
  }
});
