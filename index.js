const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[length-number]");
const indicator = document.querySelector("[data-indicator]");
const symbols = '`~!@#$%^&*()_-+=[]{}|';
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const uppercaseCheck = document.querySelector("#Uppercase");
const lowercaseCheck = document.querySelector("#Lowercase");
const numberscheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#Symbols");
const passwordDisplay = document.querySelector("[data-password-display]");
const copyMsg = document.querySelector("[data-copy-msg]");
const copyBtn = document.querySelector("[data-copy]");
const generateBtn = document.querySelector(".generate-button");




// initally

// let password = "";
let passwordLength = 10;
// let checkCount = 0;

handleSlider();

function handleSlider(){
    lengthDisplay.innerText = passwordLength;
    inputSlider.value = passwordLength;

}

function setIndiactor(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min,max){

   return Math.floor(Math.random() * (max-min))+min;
   
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97,123));
    
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);

}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberscheck.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndiactor("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
      ) {
        setIndiactor("#ff0");
      } else {
        setIndiactor("#f00");
      }




}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied11";

    }
    catch(e){
        copyMsg.innerText = "Failed";

    }
    // to make copied span visible 
    copyMsg.classList.add('active');

    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);
    
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckboxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if (checkbox.checked){
            checkCount++;
        }

    })

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckboxChange)
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{

    if (checkCount==0){
        return;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    console.log('start the journey');

    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numberscheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory edition

    for(let i=0; i<funcArr.length;i++){
        password = password+funcArr[i]();
    }

    console.log('compusory edition');

    for(let i=0; i < passwordLength-funcArr.length;i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log('randindex',randIndex);
        password = password+funcArr[randIndex]();
    }

    console.log('remaining edition');

    password = shufflePassword(Array.from(password));

    console.log('shuffling done ');

    passwordDisplay.value = password;

    console.log('UI');
    calcStrength();
});





