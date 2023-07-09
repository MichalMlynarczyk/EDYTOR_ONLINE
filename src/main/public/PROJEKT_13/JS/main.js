// Ustawienie stylu dla edytora 1

var editor_1 = ace.edit("editor_1");
 editor_1.setTheme("ace/theme/tomorrow");
editor_1.session.setMode("ace/mode/c_cpp");
// Wyłącz wyświetlanie błędów w edytorze
editor_1.session.setOption("useWorker", false);
editor_1.session.setOption("showErrors", false);

// // Wyłączenie edytowania
editor_1.setReadOnly(true);
editor_1.renderer.$cursorLayer.element.style.display = "none";
editor_1.textInput.getElement().disabled = true;
editor_1.commands.commmandKeyBinding = {};

// Ustawienie stylu dla edytora 2
var editor_2 = ace.edit("editor_2");
editor_2.setTheme("ace/theme/tomorrow");
editor_2.session.setMode("ace/mode/c_cpp");
editor_2.session.setOption("useWorker", false);
editor_2.session.setOption("showErrors", false);

//linie numeryczne 
const editors = document.getElementsByClassName("editor");

editors[0].querySelector(".ace_gutter").style.backgroundColor = "#002451";
editors[1].querySelector(".ace_gutter").style.backgroundColor = "#002451";

//editors[0].querySelector(".ace_gutter").style.transition = "1s";
//editors[1].querySelector(".ace_gutter").style.transition = "1s";


// editors[0].querySelector(".ace_gutter").style.backgroundColor = "#09131b";
// editors[1].querySelector(".ace_gutter").style.backgroundColor = "#09131b";

loadRanking(); 

function loadRanking(){

    var requestData = "true";
    // wysyłanie
    $.post("/get-ranking", requestData, function(responseData) {
        console.log(responseData);

        var parsedData = responseData.split("\n") // Podziel dane na linie
        .map(function(line) {
            var parts = line.trim().split(" "); // Podziel linię na części
            return {
            name: parts[0],
            value: parts[1]
            };
        });

        console.log("VAlue: " + parsedData[1].value);



        for (var i = 0; i < parsedData.length - 1; i++) {
            var item = parsedData[i];
            createVerse_(parsedData[i].name, parsedData[i].value);
          }

    

        // console.log(parsedData);
        // var nameOfSecondRow = parsedData[1].name;

    }, "json");



}

  

  
  
  