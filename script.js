//--------------------All functions for calculator-----------------------------

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

//Create a function to populate the displayInput when btn clicked numbers
//Extract all the numbers into an array 1,2,3,4,...
function display() {
  //Get current element text
  displayInputText = document.getElementById("display-input").innerText;
  displayInputArray = displayInputText.split("");
  lastChar = lastCharacter();
  lastNum = lastNumber();

  console.log("Number Array: " + numbersArray);
  console.log("Last Char: " + lastChar);
  console.log("Last Number: " + lastNum);

  while (displayInputText.length < 12) {
    //Get button clicked value
    const pressNumber = event.target.id;

    if (event.target.matches(".number")) {
      //If first number on displayInput has a prefix of (-) is a negative, join the first two indexes then, producing a single negative number
      if (displayInputArray.length === 1 && lastChar === "-") {
        const negNumb = lastChar + pressNumber;
        document.getElementById("display-input").innerText = negNumb;
        numbersArray.push(negNumb);
      } else if (displayInputArray.length > 0 && /([0-9]||\.)/.test(lastChar)) {
        //If last number in array matches a DOT
        if (/\./.test(lastNum) && pressNumber == ".") break; //Break loop
        //if last index is number
        a = numbersArray[numbersArray.length - 1] + pressNumber; //Combine last index with pressNumber
        numbersArray.pop(); //Remove last index
        numbersArray.push(a); //Add combine numbers}
      } else numbersArray.push(pressNumber); //Update array storing numbers

      //Update displayInput
      displayInputText = document.getElementById("display-input").innerText =
        displayInputText + pressNumber;

      break;
    }
    return 0;
  }
}

//Function for when operands are pressed
function operandKey() {
  displayInputText = document.getElementById("display-input").innerText;
  displayInputArray = displayInputText.split("");

  //Logic to disable the *,-,+,/ if first char is (-)
  if (
    displayInputArray.length != 0 && //If displayInput length equal zero is NOT true AND...
    (displayInputArray[0] != "-" || displayInputArray.length > 1) //if displayInput length is NOT (-) OR length > 1
  ) {
    ope = event.target.id;
    //Get last char on array
    lastChar = displayInputArray[displayInputArray.length - 1];

    //Extract all operands into an array +,*,-,/,...
    //If last char is number, enter to update
    if (lastChar.match(/[0-9]/g) && displayInputArray.length >= 1) {
      //add ope and update displayInput
      document.getElementById("display-input").innerText =
        displayInputText + ope;
      opeArray.push(ope); //Update array storing operands
    } else if (lastChar.match(/[^0-9]/g)) {
      //if different ope delete existing operand and update with this.id
      displayInputArray.pop(); //Delete last char
      displayInputArray.push(ope); //Add ope to array
      //Update displayInput
      document.getElementById("display-input").innerText = displayInputText =
        displayInputArray.join("");
      opeArray.push(ope); //Update array storing operands
    }
  }
  return 0;
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

    //Splice result to numbersArray
    numbersArray.splice(0, 2, result);

    i++;
  }
  clearStorage();
  numbersArray.push(result);
  document.getElementById("display-input").innerText = result;
  document.getElementById("display-answer").innerText = result;

  return 0;
}

//Clear display
function clearStorage() {
  //Empty this arrays
  numbersArray = [];
  opeArray = [];
  displayInputArray = [];
  return (displayInputText = document.getElementById(
    "display-input"
  ).innerText =
    "");
}

//Get last character from displayInput
function lastCharacter() {
  return (lastChar = displayInputArray[displayInputArray.length - 1]);
}
function lastNumber() {
  return numbersArray[numbersArray.length - 1];
}
//-----------All my global variables--------------------------------------------

//Define variables to perform operation
let a; //first number
let b; //second number

let ope; //operator
let displayInputText = document.getElementById("display-input").innerText; //Store displayInput values
let displayInputArray = displayInputText.split(""); //Create array for displayInputText
let lastChar; //last character on displayInput
let lastNum; //last numbersArray
let numbersArray = []; //Stores all numbers
let opeArray = []; //Stores all operands

//--------------------All BUTTONS Events------------------------------------

//Btn Event for numbers pressed
const btnNumbers = document.getElementsByClassName("number");
for (let i = 0; i < btnNumbers.length; i++) {
  btnNumbers[i].addEventListener("click", display);
}

//Btn Event for main-operands pressed
const btnOperators = document.getElementsByClassName("main-operators");
for (let i = 0; i < btnOperators.length; i++) {
  btnOperators[i].addEventListener("click", operandKey);
}

//Btn Create clear button
const btnClear = document.getElementById("clear");
btnClear.addEventListener("click", clearStorage);

//Btn Create btn for negative numbers only for empty displayInput
const btnNegative = document.getElementById("negative");
btnNegative.addEventListener("click", (e) => {
  if (displayInputText.length === 0)
    return (displayInputText = document.getElementById(
      "display-input"
    ).innerText =
      "-");
});

//Btn Press = equal
const btnEqual = document.getElementById("=");
btnEqual.addEventListener("click", calculate);


// Doing some test
const str = [56, "hsk"];
const abc = str[0];
const result = String(abc).match(/[0-9]/g);
console.log(result); // true
