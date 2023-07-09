// uchwyt do diva
const ranking = document.getElementById("leftPanel");
const ranking_ = document.getElementById("leftPanel_");


  
/// WYSUWANIE LEFT PANELU
ranking.addEventListener('click', rankingStyle);

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
      // Strona jest widoczna (użytkownik powrócił na stronę)
      console.log("Strona jest aktywna");

      var loginData = {
        loggedIn: true,
        username: "exampleUser",
        // Inne informacje o zalogowanym użytkowniku
      };

      $.post("/get-info", loginData, function(response) { 
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        refresh()
      });

   

      while (ranking_.firstChild) {
        ranking_.removeChild(ranking_.firstChild);
      }



      loadRanking();
   
      // Wykonaj odpowiednie akcje
    } else {
      // Strona jest ukryta (użytkownik przeszedł do innej karty lub zminimalizował przeglądarkę)
      console.log("Strona jest ukryta");
      // Wykonaj odpowiednie akcje
    }
  });

  function createNotification(){
    var notification = document.createElement('div');
    notification.classList.add('my-notification');
    
    var span = document.createElement('span');
    span.textContent = 'You are logged in!';
    
    notification.appendChild(span);
    document.body.appendChild(notification);
    
    setTimeout(function() {
      document.body.removeChild(notification);
    }, 4000);
}

  function refresh(){
    resultWindow.close();
    rankingStyle();
    createNotification();
  }

function rankingStyle(){
    console.log("Nakliknięto na diva");
    // createVerse();
    // createVerse();
    ranking_.style.width = "400px";
    ranking.removeEventListener('click', rankingStyle);
}

ranking_.addEventListener('click', () => {
    console.log("Nakliknięto na diva");
    ranking_.style.width = "0px";
    setTimeout(() => {
        ranking.addEventListener("click", rankingStyle);
      }, 500);
});

// DODAWANIE ELEMNTÓW DO LEFT PANELU
function createVerse(){
    // tworzenie nowego elementu div
    var divElement = document.createElement("div");

    // ustawianie klasy dla elementu div
    divElement.className = "verse";

    // załaduj zawartość diva
    loadContent(divElement);

    // dodanie diva 
    ranking_.appendChild(divElement);

}

function loadContent(divElement){

    ///  miejsce w rankingu

    // miejsce a rankingu
    var place = document.createElement("div");

    // ustawianie klasy dla elementu div
    place.className = "place";

    // dodanie tekstu
    place.textContent = "1";

    /// nickname

    // nickname
    var nickname = document.createElement("div");

    // ustawianie klasy dla elementu div
    nickname.className = "nickname";

    // dodanie tekstu
    nickname.textContent = "CarroM7";

    /// szybkość pisania

    // nickname
    var bolt_div = document.createElement("div");

    // ustawianie klasy dla elementu div
    bolt_div.className = "bolt_div";

    // nickname
    var bolt = document.createElement("span");

    // ustawianie klasy dla elementu div
    bolt.className = "material-symbols-outlined";
    
    // dodanie tekstu
    bolt.textContent = "electric_bolt";

    bolt_div.appendChild(bolt);

    /// wynik 

    // miejsce a rankingu
    var result = document.createElement("div");

    // ustawianie klasy dla elementu div
    result.className = "result";

    // dodanie tekstu
    result.textContent = "1200";


    // dodanie elemntu
    divElement.appendChild(place);
    divElement.appendChild(nickname);
    divElement.appendChild(bolt_div);
    divElement.appendChild(result);

}

function createVerse_(username, result){
    // tworzenie nowego elementu div
    var divElement = document.createElement("div");

    // ustawianie klasy dla elementu div
    divElement.className = "verse";

    // załaduj zawartość diva
    loadContent_(divElement, username, result);

    // dodanie diva 
    ranking_.appendChild(divElement);

}

function loadContent_(divElement, username, result_){

    ///  miejsce w rankingu

    // miejsce a rankingu
    var place = document.createElement("div");

    // ustawianie klasy dla elementu div
    place.className = "place";

    // dodanie tekstu
    place.textContent = "1";

    /// nickname

    // nickname
    var nickname = document.createElement("div");

    // ustawianie klasy dla elementu div
    nickname.className = "nickname";

    // dodanie tekstu
    nickname.textContent = username;

    /// szybkość pisania

    // nickname
    var bolt_div = document.createElement("div");

    // ustawianie klasy dla elementu div
    bolt_div.className = "bolt_div";

    // nickname
    var bolt = document.createElement("span");

    // ustawianie klasy dla elementu div
    bolt.className = "material-symbols-outlined";
    
    // dodanie tekstu
    bolt.textContent = "electric_bolt";

    bolt_div.appendChild(bolt);

    /// wynik 

    // miejsce a rankingu
    var result = document.createElement("div");

    // ustawianie klasy dla elementu div
    result.className = "result";

    
    // dodanie tekstu
    result.textContent = result_;


    // dodanie elemntu
    divElement.appendChild(place);
    divElement.appendChild(nickname);
    divElement.appendChild(bolt_div);
    divElement.appendChild(result);

}