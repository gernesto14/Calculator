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

//Function for when operands are pressed
function operandKey() {
  answerDisplay = document.getElementById("display-answer").innerText;
  displayInputText = document.getElementById("display-input").innerText;
  displayInputArray = displayInputText.split("");
  ope = event.target.id;
  lastChar = displayInputArray[displayInputArray.length - 1];

  //Check first nchar is (-)
  //Logic to disable the *,-,+,/ if first char is (-)
  if (
    (answerDisplay.length != 0 && displayInputArray[0] != "-") ||
    (displayInputArray.length != 0 && //If displayInput length NOT zero AND...
      (displayInputArray[0] != "-" || displayInputArray.length > 1)) //if displayInput length is NOT (-) OR length > 1
  ) {
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
  } else {
    //Update displayInput
    document.getElementById("display-input").innerText = displayInputText + ope;
    opeArray.push(ope); //Update array storing operands
  }
  return 0;
}

function calculate() {
  //Loop thru each array index, even indexes are numbers and odd for operands
  //Assign (a) to first index and result of previews operation, (b) for the following number in array
  let result;
  let i = 0;
  while (i < opeArray.length) {
    a = numbersArray[0];
    b = numbersArray[1];
    ope = opeArray[i];

    //Call function operate and get arguments for function
    result = operate(a, ope, b);
    if (result % 1) result = result.toFixed(2);

    //Splice result to numbersArray
    numbersArray.splice(0, 2, result);

    i++;
  }
  answer = result;
  clearStorage();
  document.getElementById("display-answer").innerText = result;

  return 0;
}

//Clear display
function clearStorage() {
  //Empty this arrays
  opeArray = [];
  displayInputArray = [];
  numbersArray = [];

  document.getElementById("display-input").innerText = "";

  return 0;
}

//Create a function to populate the displayInput when btn clicked numbers
//Extract all the numbers into an array 1,2,3,4,...
function clickNumbers() {
  //Get current element text
  displayInputText = document.getElementById("display-input").innerText;
  displayInputArray = displayInputText.split("");
  answerDisplay = document.getElementById("display-answer").innerText;
  //Get last character from displayInput
  const lastChar = displayInputArray[displayInputArray.length - 1];
  //Get last number from numbersArray
  const lastNum = numbersArray[numbersArray.length - 1];
  let swap;
  const pressNumber = event.target.id;

  //Check display length less than n and event matches class="number"
  while (displayInputText.length < 20 && event.target.matches(".number")) {
    //Check display is empty
    if (lastChar === undefined) {
      numbersArray.push(pressNumber);
    } //Check display first char is (-)
    else if (lastChar === "-" && displayInputArray.length === 1) {
      let negNumb;
      negNumb = lastChar + pressNumber;
      numbersArray.pop();
      numbersArray.push(negNumb);
    } //Check for duplicating (-)
    else if (pressNumber === "-" && displayInputArray.length > 1) {
      opeArray.push(pressNumber);
      //Update displayInput
      displayInputText = document.getElementById("display-input").innerText =
        displayInputText + pressNumber;
      break;
    }
    //Check for DOT entered previously
    else if (pressNumber === ".") {
      // Check for floating number
      if (lastNum % 1) {
        break;
      } else {
        swap = lastNum + pressNumber;
        numbersArray.pop();
        numbersArray.push(swap);
      }
    } else if (lastChar.match(/\/|\*|\-|\+/g)) {
      numbersArray.push(pressNumber);
    } else {
      swap = lastNum + pressNumber;
      numbersArray.pop();
      numbersArray.push(swap);
    }

    //Update displayInput
    displayInputText = document.getElementById("display-input").innerText =
      displayInputText + pressNumber;

    break;
  }
  return 0;
}

//-----------All my global variables--------------------------------------------

//Define variables to perform operation
let a; //first number
let b; //second number
let answerDisplay = document.getElementById("display-answer").innerText;
let ope; //operator
let displayInputText = document.getElementById("display-input").innerText; //Store displayInput values
let displayInputArray = displayInputText.split(""); //Create array for displayInputText
let numbersArray = []; //Stores all numbers
let opeArray = []; //Stores all operands
let answer; //Stores answer

// ------------------------Date Display----------------------------------------

let dt = new Date();
$(".clock").text(dt.toLocaleDateString());
$(".clock ").css("text-align", "center");
$(".clock ").css("font-size", "28px");

//--------------------All BUTTONS Events------------------------------------

//Btn Event for numbers pressed
const btnNumbers = document.getElementsByClassName("number");
for (let i = 0; i < btnNumbers.length; i++) {
  btnNumbers[i].addEventListener("click", clickNumbers);
}

//Btn Event for main-operands pressed
const btnOperators = document.getElementsByClassName("main-operators");
for (let i = 0; i < btnOperators.length; i++) {
  answerDisplay = document.getElementById("display-answer").innerText;
  btnOperators[i].addEventListener("click", operandKey);
}

//Btn Create clear button
const btnClear = document.getElementById("clear");
btnClear.addEventListener("click", clearStorage);

//Btn Press = equal
const btnEqual = document.getElementById("=");
btnEqual.addEventListener("click", () => {
  if (numbersArray.length > 1) calculate();
});

//Btn ANS (answer)
const btnAnswer = document.getElementById("ans");
btnAnswer.addEventListener("click", () => {
  displayInputText = document.getElementById("display-input").innerText;
  if (displayInputText != answer) {
    numbersArray.push(answer);
    document.getElementById("display-input").innerText =
      displayInputText + answer;
  }
});
