/* wysyłanie danych rejestracyjnych do bazy danych */
/* sprawdzanie informacji */

/* wyświetlanie okna "spróbuj ponownie !" */
const sign_up = document.getElementById('registartionButton');
const closeDialog = document.getElementById('closeDialogWindow');
const dialogWindow = document.getElementById('dialogWindow');

function openDialog(){
  dialogWindow.showModal();
  dialogWindow.style.position = "relative";
  dialogWindow.style.margin = "20% auto 20% auto";
  //dialogWindow.style.margin = "40%";
}

closeDialog.addEventListener('click', () => {
  window.location.href="../HTML/REGISTRATION_WINDOW.html";
})

// Rejestracja //
function validateSignUp(){
    if( usernameError.style.visibility == "hidden" &&
        emailError.style.visibility == "hidden" &&
        passwordError.style.visibility == "hidden" &&
        cPassError.style.visibility == "hidden"){
        return true;
    }
    return false;
}

sign_up.addEventListener('click', () => {

    if (validateSignUp() == true){
        sendData();
    }

})

function sendData(){
  // dane do rejestracji
  var data = {
    UserName : document.getElementById("username").value,
    Email : document.getElementById("Email").value,
    Password : document.getElementById("Password").value,
  }

  // wyświetlenie informacji
  console.log("Proba Rejestracji: " + Email + " , " + Password + " , " + data.UserName);

  // Przykład przekazania informacji o zalogowaniu do istniejącej karty
var loginData = {
  loggedIn: true,
  username: "exampleUser",
  // Inne informacje o zalogowanym użytkowniku
};


// window.close(); // Opcjonalnie zamknij okno logowania

  // wysyłanie na serwer
  $.post("/sign-up", data, function(response) {
    var parsedResponse = JSON.parse(response);
    console.log(response);
    if (parsedResponse == 'userName'){
      console.log("username");
      document.getElementById("text").textContent = "This username already exists!";
      openDialog();
    } else if (parsedResponse == 'email'){
      console.log("email");
      document.getElementById("text").textContent = "This email already exists!";
      openDialog();
    } else {
      // Przykład po zamknięciu okna logowania
      // Po zalogowaniu
    var loginData = {
      loggedIn: true,
      username: "exampleUser",
      // Inne informacje o zalogowanym użytkowniku
    };

    $.post("/set-info", loginData, function(response) {
      console.log("dd" + response);
      window.close();
     });
      // window.close();

    }
    // kod, który zostanie wykonany po uzyskaniu odpowiedzi z serwera
  });
}

