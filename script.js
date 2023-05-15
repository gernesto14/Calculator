//Creating functions for calculator
//Add
function add(a, b){
    return a + b;
}

//Subtract
function subtract(a, b){
    return a - b;
}

//Multiply
function multiply(a, b){
    return a * b;
}

//Divide
function divide(a, b){
    return a / b;
}

//Operate with two numbers based in case selected
function operate(a, ope, b){
    //Parse string a/b to Number type
    a = Number(a); 
    b = Number(b);
    //Create a switch case flow to select function
    switch(ope){
        case '+':
            return add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
        default:
            console.log("Wrong operand!!!");
    }
}

//Create a function to populate the display when btn clicked
function display(){
    //Get current element text
    displayText = document.getElementsByClassName('display')[0].innerText
    
    while(displayText.length < 15){
        //Get button clicked value
        if(event.target.matches('.number')){
        var pressNumber = event.target.id;
        
        //Update display text value
        displayText = document.getElementsByClassName('display')[0].innerText = displayText + pressNumber;   
        break;
    }   
    return displayText;
}
}

//Define variables to perform operation 
let a; //first number
let b; //second number
let ope; //operator
let displayText; //Store display values

//Event for numbers pressed
document.addEventListener('click', display);

//Event for main-operands pressed
const operators = document.getElementsByClassName('main-operators');
for(var i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', operandKey);
}

//Create clear even for button
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    return document.getElementById('display').innerText = '';
})

//Function for when operands are pressed
function operandKey(){
    displayText = document.getElementById('display').innerText;
    ope = event.target.id;
    //Convert displayText to array
    const myArray = displayText.split('');
    //Get last char on array
    const lastChar = myArray[myArray.length-1];
    
    //If last char is number, enter to update
    if(lastChar.match(/[0-9]/g)){
        //add ope and update display
        document.getElementById('display').innerText = displayText + ope;
    }else if(lastChar.match(/[^0-9]/g)){
        //if different ope delete existing operand and update with this.id
        myArray.pop(); //Delete last char
        myArray.push(ope); //Add ope to array
        //Update display
        document.getElementById('display').innerText = displayText = myArray.join('');
    }
return 0;  
}








// //Check for negative number
// if(i === 0 && text[0] === '-'){
//     let negNumb = text[0] + text[i+1];  
//     newText.push(negNumb); //Add negative number to array
//     i += 2; //Step over two indexes
//     continue;
// }

 //Separate numbers and operands 
//  i = 0;
//  let numbers = [];
//  ope = [];
//  while(i < newText.length){
//      //Even arrays indexes are numbers while odd are operands
//      if(!(i % 2)){ //True is even 0,2,4,6,8,...
//          numbers.push(newText[i])
//      }else{ //False is odd 1,3,5,...
//          ope.push(newText[i]);
//      }
 
//      i++;
//  }
//  console.log("Numbers:  " + numbers);
//  // Numbers:  -2,3,5,1,5,4
//  console.log("Operands:  " + ope);