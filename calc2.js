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
const bttn = {  btnClass:'', 
                btnType: '', 
                btnValue:'',
                btnFnc:  ''};

// first, set listeners for all buttons:
const btns = document.querySelectorAll('button');

for (i of btns) {
  (function(i) {
    i.addEventListener('click', distributor);
  })(i);
}


function distributor(e) {
    e.stopImmediatePropagation(); // as a security measure

    // a new button has been pushed, we got to identify it
    bttn = identifyButton(e);

   
    const outputObj  = document.querySelector('.calc-output');
    const outputTxt  = outputObj.textContent.trim();

    cl('outputObj --> ' +outputObj);
    cl('outputTxt --> ' +outputTxt);
    if (buttonValidator(btnClass) == true) {
        // if the user inputs a number, it just adds to the last number
        // if the user inputs a sign, it resolves previous equation (operate)
        //  then it adds the sign. if there is no previous operation, it just adds the sign.
        // if the user inputs result, it resolves previous equation (operate).
        //  if it doesn't have a previous equation, it does nothing.
        
        switch (calcButtonType(btnClass)) {
            case 'number', 'point': calcAddTxt(btnClass);
            break;
            case 'operator': 
                operate(outputTxT); // does nothing if there is not an operation
                calcAddTxt();
            break;
            case 'clear': calcClear();
            break;
            case 'result': operate();
            default: 
                console.alert('wtf?');
            break;
        }

        if (outputValidator(outputTxt) == true) {
            cl('here be dragons');
        }
    }
    else
    {
        cl('we do nothing.');
    }
}

function identifyButton(e) {

    const bttn = {btnClass:'', btnType='', btnValue='',btnFnc=''};
    const btnSmashed = e.currentTarget;
        
    bttn.btnClass = btnSmashed.className.split(/\s/)[0];;

    switch(bttn.btnClass) { 
        case 'btn-1'      : 
            bttn.btnValue = '1';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-2'      : 
            bttn.btnValue = '2';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
        break; 
        case 'btn-3'      :
            bttn.btnValue = '3';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
        break; 
        case 'btn-4'      : 
            bttn.btnValue = '4';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
        break; 
        case 'btn-5'      : 
            bttn.btnValue = '5';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-6'      : 
            bttn.btnValue = '6';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-7'      : 
            bttn.btnValue = '7';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-8'      : 
            bttn.btnValue = '8';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-9'      : 
            bttn.btnValue = '9';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-0'      : 
            bttn.btnValue = '0';    
            bttn.btnType = 'number';
            bttn.Fnc     = '';
            break; 
        case 'btn-decimal': 
            bttn.btnValue = '.';    
            bttn.btnType = 'point';
            bttn.Fnc     = '';
            break; 
        case 'btn-delete' : 
            bttn.btnValue = 'DEL';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'delete';
            break; 
        case 'btn-sum'    : 
            bttn.btnValue = ' + ';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'SUM';
            break; 
        case 'btn-sub'    : 
            bttn.btnValue = ' - ';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'substract';
            break; 
        case 'btn-mul'    : 
            bttn.btnValue = ' * ';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'multiply';
            break; 
        case 'btn-divid'  : 
            bttn.btnValue = ' / ';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'divide';
            break; 
        case 'btn-clear'  : 
            bttn.btnValue = 'clear';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'clear';
            break; 
        case 'btn-result' : 
            bttn.btnValue = ' = ';    
            bttn.btnType = 'funct';
            bttn.Fnc     = 'operate';
            break; 
        default:            
            bttn.btnValue = '';    
            bttn.btnType = '';
            bttn.Fnc     = '';
            break; 
    }

    return bttn;
 
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

function calcButtonValue(btnClass) {
    let btnVal = '';

    switch(btnClass) { 
        case 'btn-1'      : btnVal = '1';    break; 
        case 'btn-2'      : btnVal = '2';    break; 
        case 'btn-3'      : btnVal = '3';    break; 
        case 'btn-4'      : btnVal = '4';    break; 
        case 'btn-5'      : btnVal = '5';    break; 
        case 'btn-6'      : btnVal = '6';    break; 
        case 'btn-7'      : btnVal = '7';    break; 
        case 'btn-8'      : btnVal = '8';    break; 
        case 'btn-9'      : btnVal = '9';    break; 
        case 'btn-0'      : btnVal = '0';    break; 
        case 'btn-decimal': btnVal = '.';    break; 
        //case 'btn-delete' : btnVal = 'delete';    break; 
        case 'btn-sum'    : btnVal = ' + ';  break; 
        case 'btn-sub'    : btnVal = ' - ';  break; 
        case 'btn-mul'    : btnVal = ' * ';  break; 
        case 'btn-divid'  : btnVal = ' / ';  break; 
        //case 'btn-clear'  : btnVal = 'clear';     break; 
        //case 'btn-result' : btnVal = 'result';    break; 
        default:            btnVal = '';
    }
        return btnVal;
}




function calcAddTxt(btnClass) {

}
// function outputValidator(clName) {
//     // you know the rules and so do I
//     // we can't have anything dividing 0. World could end.
//     // probably the only rule we have for now, maybe more are added
//     // remember never to speak about the fight's club.


    

// }







function cl(aux) {
    // I like to simplify console logs...bear with me
    if (CONSOLE_LOG_ACTIVE)
        console.log(aux);

}







