// TODO: show active operator in UI
// TODO: calculate when tempNum and currentNum are filled and operator is clicked

// TODO: keyboard functionality
// TDOD: handle weird JS behaviour e.g 2.3 - 2.5 = -0.20000000000000018

const display = document.querySelector("#display");
const keys = document.querySelector(".pad");

let currentNum = [];
let tempNum = undefined;
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
  // only switch numbers if no operator set
  // with this you can change operator after currentNum is set
  if (!activeOperator) {
    tempNum = arrToFloat(currentNum);
    currentNum = [];
  }
  activeOperator = operator;
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
  if (/[1-9]/.test(key)) {
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
    activeOperator = "";
    currentNum = [];
    tempNum = [];
    updateDisplay("0");
  }

  if (key === "clear") {
    currentNum = [];
    activeOperator = "";
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
    if (currentNum.length > 0 || !isNaN(tempNum)) {
      setOperator(key);
    }
  }

  if (key === "equals") {
    if (isNaN(tempNum) && currentNum.length > 0) {
      result = calculate(tempNum, activeOperator, arrToFloat(currentNum));
      updateDisplay(result);
      currentNum = [result]; // to work with
      tempNum = undefined;
      activeOperator = "";
    }
  }

  // for behind the scenes / debug purposes
  console.clear();
  console.dir(`
    tempNum: ${tempNum}\n
    activeOperator: ${activeOperator}\n
    currentNum: [ ${currentNum} ]\n
    result: ${result}
  `);
}

keys.addEventListener("click", function(e) {
  // event delegation
  if (e.target.matches("button")) {
    handleClick(e);
  }
});
