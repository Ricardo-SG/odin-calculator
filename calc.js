// constants
const CONSOLE_LOG_ACTIVE = true;
//const CONSOLE_LOG_ACTIVE = false;

// We gonna do this: we set a listener for each button.
// That listener will execute the function distributor
// distributor will validy if button is one of the calculator buttons, else will do nothing.
// once the button is properly identified, it will valid the Output. 
// If we already have an operation ready to be thrown, the distributor will call
// the operator() and resolve it, then, will continue adding the new button.
// 
// If the button to see results is pushed before having an operation set, we will alert the user.
// we're gonna create the object "bttn" to store all related data of the last button pushed
const bttn = {  
    btnClass:'', 
    btnType: '', 
    btnValue:'',
    btnFnc:  ''
};

const calc = {
    firstNumber: 0,
    secondNumber:'',
    signOperator:'',
};

// first, set listeners for all buttons:
const btns = document.querySelectorAll('button');

for (i of btns) {
  (function(i) {
    i.addEventListener('click', distributor);
  })(i);
}

updateOutput(); // cargamos el visor con el 0 por defecto

function distributor(e) {
    e.stopImmediatePropagation(); // as a security measure

    // a new button has been pushed, we got to identify it
    identifyButton(e);
    cl('bttn.btnClass: ' +bttn.btnClass);
    cl('bttn.btnValue: ' +bttn.btnValue);
    cl('bttn.btnType : ' +bttn.btnType );
    cl('bttn.btnFnc  : ' +bttn.btnFnc  );
   
    // we validate is one of our buttons
    // else we do nothing
    if (buttonValidator(bttn.btnClass) === true) {
        cl('validatePoint --> '+validatePoint());
        if (bttn.btnType == 'number') {
            addNumber(bttn.btnValue);
        }
        else if (bttn.btnType == 'point' && validatePoint() == true) {     
            addPoint(bttn.value);
        }
        else {
            cl('bttn.btnFnc: ' + bttn.btnFnc);
            switch(bttn.btnFnc.trim()) {
                case 'delete':
                    deleteLast();
                    break;
                case 'clear':
                    clearAll();
                    break;
                case 'SUM':
                case 'substract':
                case 'multiply':
                case 'divide':
                     
                    if (operationPending() == true) {
                    // If already an operation pending    
                        operate(); 
                        
                    }
                    if (checkInformed(calc.firstNumber) == true ) {
                        addSign(bttn.btnValue);
                    }
                    break;
                case 'operate':
                    cl('estoy aquí'); 
                    if (operationPending() == true) {
                        operate();
                    }
                    // We do nothing if there is not an operation pending
                    break;                
            }
        }
    }
};

function addNumber(numb) {
    cl('<addNumber> -> ' +numb);

    let aux = '';


    if (checkInformed(calc.signOperator)) {
        aux = calc.secondNumber + numb;
        calc.secondNumber = parseFloat(aux);
    }
    else {
        aux = calc.firstNumber + numb;
        calc.firstNumber = parseFloat(aux);        
    }

    cl('calc.secondNumber --> ' + calc.secondNumber);
    cl('calc.firstNumber  --> ' + calc.firstNumber );

    updateOutput();
}

function addSign(sign) {
    cl('<addSign> ' + sign);
    cl('1 calc.signOperator: ' + calc.signOperator);
    calc.signOperator = sign;
    cl('2 calc.signOperator: ' + calc.signOperator);
    updateOutput();
}
function operationPending() {

    cl('<operationPending>');
    cl('checkInformed(calc.firstNumber)  : ' + checkInformed(calc.firstNumber) ); 
    cl('checkInformed(calc.secondNumber) : ' + checkInformed(calc.secondNumber));
    cl('checkInformed(calc.signOperator) : ' + checkInformed(calc.signOperator));
    if (checkInformed(calc.firstNumber)  && 
        checkInformed(calc.secondNumber) &&
        checkInformed(calc.signOperator)) {
        return true;
    }
    else {
        return false;
    }
}

function operate() {
    cl('<operate> ' + calc.signOperator);
    // we're gonna resolve now the operation we have in memory

    
    switch (calc.signOperator) {
        case '+', ' + ':
            calc.firstNumber = calc.firstNumber + calc.secondNumber;
            break;
        case '-', ' - ':
            calc.firstNumber = calc.firstNumber - calc.secondNumber;
            break;
        case '*', ' * ':
            calc.firstNumber = calc.firstNumber * calc.secondNumber;
            break;
        case '/', ' / ':
            if (calc.secondNumber == 0) {
                window.alert('why would you try to destroy the world by dividing by 0??');
            }
            else {
                calc.firstNumber = calc.firstNumber / calc.secondNumber;
            }
            break;
    }
    calc.firstNumber  = truncateDecimals(calc.firstNumber);
    calc.secondNumber = '';
    calc.signOperator = '';
    
    updateOutput();

}

function validatePoint() {

    let aux = '';  
    
    if (checkInformed(calc.signOperator)) {
        // we're treating the second number of the operation
        aux = calc.secondNumber.toString();
        
        if (parseInt(aux.indexOf('.')) == -1)  {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        // we're treating the first number of the operation
        aux = calc.firstNumber.toString();
        
        if (parseInt(aux.indexOf('.')) == -1)  {
            return true;
        }
        else {
            return false;
        }

    }

}

function addPoint() {
    cl('<addPoint>');
    let aux = '';
    if (checkInformed(calc.signOperator)) {
        // we're treating the second number of the operation
        aux = calc.secondNumber.toString();
        aux = aux + '.';
        calc.secondNumber = aux;
    }
    else {
        // we're treating the first number of the operation
        aux = calc.firstNumber.toString();
        aux = aux + '.';
        calc.firstNumber = aux;
    }
    updateOutput();
}


function deleteLast() {

    let aux = '';
    cl('<deleteLast>');
    cl('checkInformed(calc.secondNumber) : ' +checkInformed(calc.secondNumber));
    cl('checkInformed(calc.signOperator) : ' +checkInformed(calc.signOperator));
    cl('checkInformed(calc.firstNumber)  : ' +checkInformed(calc.firstNumber));
    
    if (checkInformed(calc.secondNumber)) {
        aux = calc.secondNumber.toString();
        aux = aux.slice(0,-1);
        calc.secondNumber = aux;
    }
    else if (checkInformed(calc.signOperator)) {
        calc.signOperator = '';
    }
    else if (checkInformed(calc.firstNumber)) {
        aux = calc.firstNumber.toString();
        aux = aux.slice(0,-1);
        calc.firstNumber = aux;
    }

    updateOutput();
}

function clearAll() {
    cl('<clearAll>');
    calc.firstNumber  = 0;
    calc.secondNumber = '';
    calc.signOperator = '';

    updateOutput();
}

function updateOutput() {
    cl('<updateOutput>');

    const outputObj  = document.querySelector('.calc-output');
    //const outputTxt  = outputObj.textContent.trim();
    let fN = calc.firstNumber ? calc.firstNumber:0;
    let sN = calc.secondNumber ? calc.secondNumber:'';
    let sO = calc.signOperator ? calc.signOperator:'';
    outputObj.textContent = fN + sO + sN; 
}

function checkInformed(aux) {

    if ((aux == undefined) || (aux == null) || (aux == '')) {
        return false;
    }
    else {
        return true;
    }
}


function identifyButton(e) {

    // we clear the bttn object data 
    bttn.btnClass   = ''; 
    bttn.btnType    = '';
    bttn.btnValue   = '';
    bttn.btnFnc     = '';

    // we identify it's main class (the first one in the html)
    const btnSmashed = e.currentTarget;
    bttn.btnClass = btnSmashed.className.split(/\s/)[0];;

    
    // thanks to its main class, we identify its value, type and function
    switch(bttn.btnClass) { 
        case 'btn-1'      : 
            bttn.btnValue = '1';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-2'      : 
            bttn.btnValue = '2';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
        break; 
        case 'btn-3'      :
            bttn.btnValue = '3';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
        break; 
        case 'btn-4'      : 
            bttn.btnValue = '4';    
            bttn.btnType = 'number';
            bttn.btnFnc     = ' ';
        break; 
        case 'btn-5'      : 
            bttn.btnValue = '5';    
            bttn.btnType = 'number';
            bttn.btnFnc     = ' ';
            break; 
        case 'btn-6'      : 
            bttn.btnValue = '6';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-7'      : 
            bttn.btnValue = '7';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-8'      : 
            bttn.btnValue = '8';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-9'      : 
            bttn.btnValue = '9';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-0'      : 
            bttn.btnValue = '0';    
            bttn.btnType  = 'number';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-decimal': 
            bttn.btnValue = '.';    
            bttn.btnType  = 'point';
            bttn.btnFnc   = ' ';
            break; 
        case 'btn-delete' : 
            bttn.btnValue = 'DEL';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'delete';
            break; 
        case 'btn-sum'    : 
            bttn.btnValue = ' + ';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'SUM';
            break; 
        case 'btn-sub'    : 
            bttn.btnValue = ' - ';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'substract';
            break; 
        case 'btn-mul'    : 
            bttn.btnValue = ' * ';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'multiply';
            break; 
        case 'btn-divid'  : 
            bttn.btnValue = ' / ';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'divide';
            break; 
        case 'btn-clear'  : 
            bttn.btnValue = 'clear';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'clear';
            break; 
        case 'btn-result' : 
            bttn.btnValue = ' = ';    
            bttn.btnType  = 'funct';
            bttn.btnFnc   = 'operate';
            break; 
        default:            
            bttn.btnValue = ' ';    
            bttn.btnType  = ' ';
            bttn.btnFnc   = ' ';
            break; 
    }

    return; // we end the identifying succesfully
 
}

function buttonValidator(btnClass) {
    // we validate by it's class. We only look at the first one. Other classes may be styles.
    //const btnCl = clName.split(/\s/)[0];

    switch(btnClass) { 
        case 'btn-1'      : return true; break; // it's one of ours!
        case 'btn-2'      : return true; break; // it's one of ours!
        case 'btn-3'      : return true; break; // it's one of ours!
        case 'btn-4'      : return true; break; // it's one of ours!
        case 'btn-5'      : return true; break; // it's one of ours!
        case 'btn-6'      : return true; break; // it's one of ours!
        case 'btn-7'      : return true; break; // it's one of ours!
        case 'btn-8'      : return true; break; // it's one of ours!
        case 'btn-9'      : return true; break; // it's one of ours!
        case 'btn-0'      : return true; break; // it's one of ours!
        case 'btn-decimal': return true; break; // it's one of ours!
        case 'btn-delete' : return true; break; // it's one of ours!
        case 'btn-sum'    : return true; break; // it's one of ours!
        case 'btn-sub'    : return true; break; // it's one of ours!
        case 'btn-mul'    : return true; break; // it's one of ours!
        case 'btn-divid'  : return true; break; // it's one of ours!
        case 'btn-clear'  : return true; break; // it's one of ours!
        case 'btn-result' : return true; break; // it's one of ours!
        default:            return false; // it's not one of ours.

    }

}

function truncateDecimals(number) {

    if (number < 0) {
        return Math.ceil(number*10)/10;
    }
    else {
        return Math.floor(number*10)/10;
    }

}

function cl(aux) {
    // I like to simplify console logs...bear with me
    if (CONSOLE_LOG_ACTIVE)
        console.log(aux);

}







