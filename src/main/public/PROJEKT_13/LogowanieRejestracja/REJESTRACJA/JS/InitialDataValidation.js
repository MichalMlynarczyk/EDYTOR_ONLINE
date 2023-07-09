/* 
 SPRAWDZA WSTĘPNĄ POPRAWNOŚĆ DANYCH 
 PRZED WYSŁANIEM NA SERWER
                            */

/* uchwyty do textInput */
const username=document.getElementById('username');
const email=document.getElementById("Email");
const password=document.getElementById("Password");
const confirmPassword=document.getElementById("ConfirmPassword");
/* uchwyty do errorMsg */
const usernameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const cPassError = document.getElementById("cPassError");


/* SPRAWDZANIE DANYCH REJESTRACYJNYCH NA POZIOMIE WSTĘPNYM */
function start(){
    username.addEventListener('input', _usernameVerify);
    email.addEventListener('input', _emailVerify);
    password.addEventListener('input', _passwordVerify);
    confirmPassword.addEventListener('input', _cPasswordVerify);
}

/* username input action */
function _usernameVerify(){
    if (username.value.length < 6) 
      usernameError.style.visibility="visible";
    else 
      usernameError.style.visibility="hidden";
}
/* email input action */
function _emailVerify(){
    if(email.value.match(/^.*@..*$/))
      emailError.style.visibility="hidden";
    else
      emailError.style.visibility="visible";
}
/* password input action*/
function _passwordVerify(){
    if(password.value.length>6)
      passwordError.style.visibility="hidden";
    else
      passwordError.style.visibility="visible";
}
/* confirm password input action*/
function _cPasswordVerify(){
    if(password.value == confirmPassword.value)
      cPassError.style.visibility="hidden";
    else
      cPassError.style.visibility="visible";
}


