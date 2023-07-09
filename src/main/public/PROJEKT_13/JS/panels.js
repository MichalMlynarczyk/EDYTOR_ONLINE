// uchwyt do paneli 
const button = document.getElementsByClassName("button");

//  kolekcja elementów na tablicę
const buttonArray = Array.from(button);

// przypisanie nazw
const languages = {
    name : ['JavaScript', 'JAVA', 'PYTHON', 'C++', 'C#', 'GO', 'RUST'],
};

for (var i = 0; i < languages.name.length; i++){
    button[i].textContent = languages.name[i];
}


// koloru przyciku
var buttonColor = {
    not_active : '#001c40',
    active : '#002451',
    number : 3, // numer przycisku aktywnego
};

// dodawanie event listenera do przycisków zmiany języka
for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener('click', function() {
      // tutaj umieść kod, który ma być wykonany po kliknięciu przycisku
      var number = buttonArray.indexOf(this);

      buttonColor.number = number;

      addButtonStyle();

      // usuwanie kodu użytkownika
      resetUserEditor();

      // pokaż dialog window
      showDialogWindow();

      // zmień kolorowanie składni
      change_language(this.textContent);

      // wysyłanie danych do serweru
      send(this.textContent);

      clearInterval(speedTime);
      clearInterval(timer);
      speed_span.innerHTML = "0"; 
      time_span.innerHTML = "00:00:00"; 
      end_span.innerHTML = "NaN"; 
      end();
      
    });
}

function changeColor(){
    console.log('changeColor');
}
// zmiana stylu button
function addButtonStyle(){
    for (var i = 0; i < button.length; i++){
        button[i].style.backgroundColor = buttonColor.not_active;
    }

    button[buttonColor.number].style.backgroundColor = buttonColor.active;
}


// resetowanie edytora -> usuwanie wszystkich znaków wpisanych przez użytkownika
function resetUserEditor(){
    editor_2.setValue("");
}


// zmiana języka
function change_language(language){

    console.log("lang: " +  language);

    if(language == 'PYTHON'){
        editor_1.session.setMode("ace/mode/python");
        editor_2.session.setMode("ace/mode/python");
    }
    else if (language == 'C++'){
        editor_1.session.setMode("ace/mode/c_cpp");
        editor_2.session.setMode("ace/mode/c_cpp");
    }
    else if (language == 'GO'){
        editor_1.session.setMode("ace/mode/golang");
        editor_2.session.setMode("ace/mode/golang");
    }
    else if (language == 'RUST'){
        editor_1.session.setMode("ace/mode/rust");
        editor_2.session.setMode("ace/mode/rust");
    }
    else if (language == 'JavaScript'){
        editor_1.session.setMode("ace/mode/javascript");
        editor_2.session.setMode("ace/mode/javascript");
    }
    else if (language == 'JAVA'){
        editor_1.session.setMode("ace/mode/java");
        editor_2.session.setMode("ace/mode/java");
    }
}