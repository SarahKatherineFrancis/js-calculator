// Declare variables to keep track of the current state of the calculator
let runningTotal = 0;
let buffer = "0";
let previousOperator;

// Get a reference to the calculator screen element
const screen = document.querySelector(".screen");

// Function to handle button clicks
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    // If the button clicked is not a number, handle it as a symbol
    handleSymbol(value);
  } else {
    // If the button clicked is a number, handle it as such
    handleNumber(value);
  }
  // Update the calculator screen
  rerender();
}

// Function to handle number input
function handleNumber(value) {
  if (buffer === "0") {
    // If the buffer is currently "0", replace it with the new number
    buffer = value;
  } else {
    // If the buffer already contains a number, append the new number to it
    buffer += value;
  }
}

// Function to handle mathematical operations
function handleMath(value) {
  if (buffer === "0") {
    // If the buffer is currently "0", do nothing and return
    return;
  }

  // Convert the buffer to an integer
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    // If this is the first operation, set the running total to the current buffer value
    runningTotal = intBuffer;
  } else {
    // If this is not the first operation, perform the previous operation with the current buffer value
    flushOperation(intBuffer);
  }

  // Store the current operator for the next operation
  previousOperator = value;

  // Reset the buffer to "0"
  buffer = "0";
}

// Function to perform the previous operation with the given buffer value
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

// Function to handle symbol input
function handleSymbol(value) {
  switch (value) {
    case "C":
      // Clear the buffer and running total
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      // Perform the previous operation with the current buffer value
      flushOperation(parseInt(buffer));
      // Reset the previous operator and set the buffer to the running total
      previousOperator = null;
      buffer = +runningTotal;
      // Reset the running total to 0
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        // If the buffer contains only one character, reset it to "0"
        buffer = "0";
      } else {
        // Otherwise, remove the last character from the buffer
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      // Handle the current button as a mathematical operation
      handleMath(value);
      break;
  }
}

// Function to update the calculator screen
function rerender() {
  screen.innerText = buffer;
}

// Function to initialize the calculator
function init() {
  // Add a click event listener to the calculator buttons
  document
    .querySelector(".cal-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
