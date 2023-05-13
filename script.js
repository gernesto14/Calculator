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
let ope; //operator
let b; //second number

let text = '-2*3+5+1-5+4';
console.log(text.length);
console.log("Text:  " + text)

//Loop thru each character
let i = 0;
newText =[]; //New array for numbers and ope.
while(i < text.length){    
    //Find if character is number or operand
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
console.log("Operands:  " + ope);

// console.log(1%2)

//if n%2 is 0 then is even