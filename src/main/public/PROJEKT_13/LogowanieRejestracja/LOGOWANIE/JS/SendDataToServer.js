/* wyświetlanie okna "spróbuj ponownie !" */
const sign_in = document.getElementById('loginButton');
const closeDialog = document.getElementById('closeDialogWindow');
const dialogWindow = document.getElementById('dialogWindow');

// otwieranie okna TRY AGAIN
function openDialog(){
  dialogWindow.showModal();
  dialogWindow.style.position = "relative";
  dialogWindow.style.margin = "20% auto 20% auto";
}

// zamykanie okna TRY AGAIN
closeDialog.addEventListener('click', () => {
  window.location.href="../HTML/LOGIN_WINDOW.html";
})

// wysyłanie emaila i password do serweru
sign_in.addEventListener('click', () => {

  // dane do logowania
  var data = {
    Email : document.getElementById("Email").value,
    Password : document.getElementById("Password").value,
  }

  // wyświetlenie informacji
  console.log("Proba logowania: " + Email + " , " + Password);

  // wysyłanie na serwer
  $.post("/sign-in", data, function(response) {
    console.log(response);
    // kod, który zostanie wykonany po uzyskaniu odpowiedzi z serwera
    if(response == "true"){
      
      var loginData = {
        loggedIn: true,
        username: "exampleUser",
        // Inne informacje o zalogowanym użytkowniku
      };
  
      $.post("/set-info", loginData, function(response) {
        console.log("dd" + response);
        window.close();
       });

    }
    else { 
      openDialog();
    }
    
  });

})


