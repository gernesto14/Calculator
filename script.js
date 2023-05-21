//Creating functions for calculator

//Add
function add(a, b) {
  return a + b;
}

//Subtract
function subtract(a, b) {
  return a - b;
}

//Multiply
function multiply(a, b) {
  return a * b;
}

//Divide
function divide(a, b) {
  return a / b;
}

//Operate with two numbers based in case selected
function operate(a, ope, b) {
  //Parse string a/b to Number type
  a = Number(a);
  b = Number(b);
  //Create a switch case flow to select function
  switch (ope) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      console.log("Wrong operand!!!");
  }
}

//Create a function to populate the display-container when btn clicked numbers
//Extract all the numbers into an array 1,2,3,4,...
function display-container() {
  //Get current element text
  display-containerText = document.getElementById("display-container").innerText;
  display-containerArray = display-containerText.split("");
  lastChar = display-containerArray[display-containerArray.length - 1];

  while (display-containerText.length < 12) {
    //Get button clicked value

    if (event.target.matches(".number")) {
      const pressNumber = event.target.id;

      //If first number on display-container has a prefix of (-) is a negative, join the first two indexes then, producing a single negative number
      if (display-containerArray.length === 1 && lastChar === "-") {
        const negNumb = lastChar + pressNumber;
        document.getElementById("display-container").innerText = negNumb;
        numbersArray.push(negNumb);
      } else if (display-containerArray.length > 0 && lastChar.match(/[0-9]/g)) {
        //if last index is number
        a = numbersArray[numbersArray.length - 1] + pressNumber; //Combine last index with pressNumber
        numbersArray.pop(); //Remove last index
        numbersArray.push(a); //Add combine numbers
      } else numbersArray.push(pressNumber); //Update array storing numbers

      //Update display-container
      display-containerText = document.getElementById("display-container").innerText =
        display-containerText + pressNumber;

      break;
    }
    return 0;
  }
}

//Function for when operands are pressed
function operandKey() {
  display-containerText = document.getElementById("display-container").innerText;
  display-containerArray = display-containerText.split("");

  //Logic to disable the *,-,+,/ if first char is (-)
  if (
    display-containerArray.length != 0 && //If display-container length equal zero is NOT true AND...
    (display-containerArray[0] != "-" || display-containerArray.length > 1) //if display-container length is NOT (-) OR length > 1
  ) {
    ope = event.target.id;
    //Get last char on array
    lastChar = display-containerArray[display-containerArray.length - 1];

    //Extract all operands into an array +,*,-,/,...
    //If last char is number, enter to update
    if (lastChar.match(/[0-9]/g) && display-containerArray.length >= 1) {
      //add ope and update display-container
      document.getElementById("display-container").innerText = display-containerText + ope;
      opeArray.push(ope); //Update array storing operands
    } else if (lastChar.match(/[^0-9]/g)) {
      //if different ope delete existing operand and update with this.id
      display-containerArray.pop(); //Delete last char
      display-containerArray.push(ope); //Add ope to array
      //Update display-container
      document.getElementById("display-container").innerText = display-containerText =
        display-containerArray.join("");
      opeArray.push(ope); //Update array storing operands
    }
  }
  return 0;
}

//Define variables to perform operation
let a; //first number
let b; //second number
let lastChar;
let ope; //operator
let display-containerText = document.getElementById("display-container").innerText; //Store display-container values
let display-containerArray = display-containerText.split(""); //Create array for display-containerText
let numbersArray = []; //Stores all numbers
let opeArray = []; //Stores all operands

//Event for numbers pressed
const btnNumbers = document.getElementsByClassName("number");
for (let i = 0; i < btnNumbers.length; i++) {
  btnNumbers[i].addEventListener("click", display-container);
}

//Event for main-operands pressed
const btnOperators = document.getElementsByClassName("main-operators");
for (let i = 0; i < btnOperators.length; i++) {
  btnOperators[i].addEventListener("click", operandKey);
}

//Create clear button
const btnClear = document.getElementById("clear");
btnClear.addEventListener("click", clearStorage);

//Create btn for negative numbers only for empty display-container
const btnNegative = document.getElementById("negative");
btnNegative.addEventListener("click", (e) => {
  if (display-containerText.length === 0)
    return (display-containerText = document.getElementById("display-container").innerText = "-");
});

//Press = equal
const btnEqual = document.getElementById("=");
btnEqual.addEventListener("click", calculate);

function clearStorage() {
  //Empty this arrays
  numbersArray = [];
  opeArray = [];
  display-containerArray = [];
  return (display-containerText = document.getElementById("display-container").innerText = "");
}

function calculate() {
  //Loop thru each array index, even indexes are numbers and odd for operands
  //Assign (a) to first index and result of previews operation, (b) for the following number in array
  let i = 0;
  while (i < opeArray.length) {
    a = numbersArray[0];
    b = numbersArray[1];
    ope = opeArray[i];

    //Call function operate and get arguments for function
    result = operate(a, ope, b);
    console.log("result: " + result + " --- " + typeof result);

    //Splice result to numbersArray
    numbersArray.splice(0, 2, a);

    i++;
  }
  clearStorage();
  numbersArray.push(result);
  document.getElementById("display-container").innerText = result;
  return 0;
}

//This is a TESTING btn ONLY
const btnTest = document.getElementById("test");
btnTest.addEventListener("click", (e) => {
  console.log("Na: " + a);
  console.log("Ope: " + ope);
  const display-containerArray = display-containerText.split("");
  console.log("Nb: " + display-containerArray);
});
