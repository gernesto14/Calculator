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


//Define variables to perform operation 
let a; //first number
let b; //second number
let ope; //operator

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


function extractNumbersOperand(){
   

    //Loop thru each character
    let i = 0;
    newText =[]; //New array for numbers and ope.
    console.log(text.length)
    while(i < text.length){    
        //Find if characters are numbers or operands
        if(/\d/g.test(text[i]) ||  /(\/|-|\+|\*)/g.test(text[i])){ 
            //Check for negative number
            if(i === 0 && text[0] === '-'){
                let negNumb = text[0] + text[i+1];  
                newText.push(negNumb); //Add negative number to array
                i += 2; //Step over two indexes
                continue;
            }
            //Create new array of numbers and operands
            newText.push(text[i]);
        }else{
            //Break out of the loop if wrong input from user
            console.log('Wrong input!!!  ----> ' + text[i]);
            newText = [];  //Clear out array
            break;
        }
        i++;
    }

    console.log('New array length of:  ' + newText.length)

    //Separate numbers and operands 
    i = 0;
    let numbers = [];
    ope = [];
    while(i < newText.length){
        //Even arrays indexes are numbers while odd are operands
        if(!(i % 2)){ //True is even 0,2,4,6,8,...
            numbers.push(newText[i])
        }else{ //False is odd 1,3,5,...
            ope.push(newText[i]);
        }
    
        i++;
    }
    console.log("Numbers:  " + numbers);
    // Numbers:  -2,3,5,1,5,4
    console.log("Operands:  " + ope);

    return numbers;
}


const clickedNumber = document.querySelectorAll('.number');
document.addEventListener('click', display);
let displayText;

//Create a function to populate the display when btn clicked
function display(){
    
    //Get current element text
    displayText = document.getElementsByClassName('display')[0].innerText
    
    while(displayText.length < 10){
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

// document.getElementById('display').innerText;