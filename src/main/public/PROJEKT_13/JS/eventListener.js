const resultWindow = document.getElementById("result");

// wykrywanie wciśnięcia przycisku i dodanie dzwięku ! 
editor_2.on("change", function(event) {

    // dźwięk klawiatury
    keySound();

    // aktualizuje vartość accuracy
    accurate();
    end();

    // przesuwanie przepisywanego tekstu tak aby
    // użytkonwik nie musiał się skupiać na 
    // scrollowaniu przepisywanego tekstu !
    // followCaret();
    followCaret_();

    // sprawdzanie poprawności 
    //validation();

    // sprawdzenie ilosci liter w edytorze / porownanie
    // wyznaczenie konca 
    compare();

});

// sprawdzanie ilosci znakow w esytorach !
function compare(){

    var editor_1_letters = editor_1.getValue();
    var editor_2_letters = editor_2.getValue();

    var content_1 = editor_1_letters.replace(/\s/g, '');
    var content_2 = editor_2_letters.replace(/\s/g, '');

    var content_1_length = content_1.length;
    var content_2_length = content_2.length;

    console.log("Editor 1: " + content_1_length + " , " + "Editor 2: " + content_2_length);

    if (content_2_length >= content_1_length){

        clearInterval(speedTime);
        clearInterval(timer);

        // czas zakonczenia testu
        endTestTime = new Date();
        var time = getTime();
        
        // sprawdzanie poprawnosci tekstow
        var correctness = getCorrectness();

        // liczba znakow na minute
        var speed = getSpeed(content_2_length);

        addLabelsToDiv(time, correctness, speed);

        var dataa = {
            speed_: speed,
        }

            
    $.post("/set-result", dataa, function(response) {
console.log("send_result");
       
       });

        // zakonczenie testu 
        // pokazanie statystyk
        resultWindow.showModal();
        resultWindow.style.position = "relative";
        resultWindow.style.margin = "20% auto 20% auto";
    }
}



function addLabelsToDiv(time, correctness, speed) {
    const div = document.getElementById('result');
    const firstChild = div.firstChild;
  
    const label1 = document.createElement('label');
    const span1 = document.createElement('span');
    span1.textContent = 'Writing time: ';
    // Zmiana koloru pierwszej części tekstu
  
    const span2 = document.createElement('span');
    span2.textContent = time;
    span2.style.color = 'red'; 
  
    label1.appendChild(span1);
    label1.appendChild(span2);
    // label1.textContent = 'Czas pisania: ' + time;
    label1.style.display = 'block';
    label1.style.marginBottom = '10px';
    div.insertBefore(label1, firstChild);
  /////////////////////////////////////////////////////////////////////
    const label2 = document.createElement('label');
    const span3 = document.createElement('span');
    span3.textContent = 'Correctness: ';
    // Zmiana koloru pierwszej części tekstu
  
    const span4 = document.createElement('span');
    span4.textContent = correctness;
    span4.style.color = 'red'; 

    label2.appendChild(span3);
    label2.appendChild(span4);
    // label2.textContent = 'Correctness: ' + correctness;
    label2.style.display = 'block';
    label2.style.marginBottom = '10px';
    div.insertBefore(label2, firstChild);
  ////////////////////////////////////////////////////////////////////
    const label3 = document.createElement('label');
    const span5 = document.createElement('span');
    span5.textContent = 'Number of characters per minute: ';
    // Zmiana koloru pierwszej części tekstu
  
    const span6 = document.createElement('span');
    span6.textContent = speed;
    span6.style.color = 'red'; 

    label3.appendChild(span5);
    label3.appendChild(span6);
    // label3.textContent = 'Number of characters per minute: ' + speed;
    label3.style.display = 'block';
    label3.style.marginBottom = '10px';
    div.insertBefore(label3, firstChild);

    
  }

// sprawdzenie poprawnosci tekstu i podkreslenie go 
// w razie pomylki
function validation(){

    //pobranie dokładnych pozycji elementu caret
    var editor = ace.edit("editor_2");
    var selection = editor.getSelection();
    var cursorPos = selection.getCursor();
    var screenPos = editor.renderer.textToScreenCoordinates(cursorPos.row, cursorPos.column);
    var caretX = screenPos.pageX;
    var caretY = screenPos.pageY;

    // pobranie pozycji X editor_2
    var editorX = editor.container.offsetLeft;
    
    // wymiary elementu rect
    var rectWidth = lastPosition.caretX-caretX;
    if (rectWidth < 0){ rectWidth *= -1; }
    console.log("rectWidth: " + rectWidth)
    var rectHeight = 20;

    // zapisanie pozycji caret
    lastPosition.caretX = caretX;
    lastPosition.caretY = caretY;

    var posX = caretX - editorX - 56;
    
    // tworzenie elementu rect
    var svgNS = "http://www.w3.org/2000/svg";
    var rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("width", 10);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("position", "absolute");
    rect.setAttribute("x", posX);
    rect.setAttribute("y", caretY);
    rect.setAttribute("fill", "black");

    svg_element.svg.appendChild(rect);
}

const svg_element = {
    svg : null,
}

// tworzenie elementu svg
window.addEventListener("load", (event) => {

    // dodanie stylu do przycisku panelu 
    addButtonStyle();

    // tworzenie elementu svg
    createSVG();

    // pobranie pozycji caret
    getCaretPositionX();

    createDialogWindow();

});

function getCaretPositionX(){
    //pobranie dokładnych pozycji elementu caret
    var editor = ace.edit("editor_2");
    var selection = editor.getSelection();
    var cursorPos = selection.getCursor();
    var screenPos = editor.renderer.textToScreenCoordinates(cursorPos.row, cursorPos.column);
    var caretX = screenPos.pageX;

    // zapisanie pozycji caret
    lastPosition.caretX = caretX;
}

// tworzenie elementu svg
function createSVG(){

    //pobranie wymiarów ace_content
    var dimensions = document.getElementById("editor_2").getElementsByClassName("ace_content")[0].getBoundingClientRect();
    
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("position", "absolute");
    svg.setAttribute("width", dimensions.width);
    svg.setAttribute("height", dimensions.height);
    svg.setAttribute("top", 0);
    svg.setAttribute("left", 0);
    svg.setAttribute("z-index", 1000);

    document.getElementById("editor_2").getElementsByClassName("ace_content")[0].appendChild(svg);
    svg_element.svg = svg;
}


// zapisywanie ostatniej pozycji caret
const lastPosition = {
    caretX : 0,
    caretY : 0,
}

var key_sound = {
    start : 1, 
}

keySound.start = 1;

// dodanie dzwięki
function keySound(){

    if (keySound.start == 1){

    // utworzenie nowego obiektu Audio
    var key_sound = new Audio('MP3/delete_key_sound.mp3');
    // var key_sound = new Audio('MP3/key_sound.mp3');

    // odtworzenie dźwięku klawisza
    key_sound.play();
    }

}


// podążanie za caret użytkownika
function followCaret(){

    // pobranie aktualnej pozycji z edytora użytkowanika
    var caretY = editor_2.getCursorPosition().row;
    var caretX = editor_2.getCursorPosition().column;

    // ustawienie pozycji kursora w edytorze systemu
    editor_1.gotoLine(caretY+1, caretX); 
  
    // Pobierz pozycję poziomego scrollbara
    var scrollLeft = editor_2.renderer.scrollLeft;

    if (scrollLeft > 40){
        scrollLeft += 30;
    }
    scrollLeft = scrollLeft * -1;

    // ustawienie widoku kodu
    var aceContent = document.getElementsByClassName("ace_content");
    aceContent[0].style.setProperty("--ace_content_left", scrollLeft+"px");

}


function followCaret_(){
// Pobranie zawartości edytora
// var content = editor_2.getValue();

// // Dopisanie litery "s" na koniec wyrazu "slowo"
// var modifiedContent = content + "s";

// // Ustawienie zaktualizowanej zawartości w edytorze
// editor_2.setValue(modifiedContent);


// setTimeout(function() {
//     var cursorDivs = editors[1].querySelector('.ace_cursor');
//     var topValue = cursorDivs.offsetTop;
//     var row_;
//     if (topValue != 0){
//      row_ = topValue/20;
//     }else{
//         row_ = 0;
//     }
//     editor_1.gotoLine(row_ + 1, cursorPositionEditor2.column); 
//     console.log('Wartość top: ', topValue);
//   }, 500); 

setTimeout(function() {

    var cursorPositionEditor2 = editor_2.getCursorPosition();
    var cursorPositionEditor1 = editor_1.getCursorPosition();

    var cursorDivs = editors[1].querySelector('.ace_cursor');
    var topValue = cursorDivs.offsetTop;
    console.log('Wartość top: ', topValue);

    var row_;


    // if (cursorDivs.length > 1) {
    //   var cursorDiv = cursorDivs[1];
    //   var topValue = cursorDiv.offsetTop;
    //   console.log('Wartość top: ', topValue);
    // }


    console.log("ROW: " + cursorPositionEditor2.row);

        // ustawienie pozycji kursora w edytorze systemu
         editor_1.gotoLine(cursorPositionEditor2.row+1, cursorPositionEditor2.column); 
        

    console.log(cursorPositionEditor1 + " , " + cursorPositionEditor2);


    var editorWidth = editor_1.container.clientWidth;
    var charWidth = editor_1.renderer.characterWidth;

    

    var firstLineContent = editor_2.getSession().getLine(cursorPositionEditor2.row);
    //  var firstLineContent = editor_2.getSession().getLine(row_);
    var firstLineLength = firstLineContent.length;
    
    console.log("Długość zawartości pierwszego wiersza:", firstLineLength);
    
    var visibleColumns = Math.floor(editorWidth / charWidth) - 6;

    // Przewijanie do konkretnej kolumny
// Przewijanie do konkretnej kolumny
var container = editor_1.container;
var characterWidth = editor_1.renderer.characterWidth;
var scrollLeft = (firstLineLength * characterWidth) - 80;
if(scrollLeft < 0){
    scrollLeft = 0;
}
console.log("SCroollledt: " + scrollLeft);
container.scrollLeft = scrollLeft;
scrollLeft = scrollLeft * -1;

     var aceContent = document.getElementsByClassName("ace_content");
     aceContent[0].style.setProperty("--ace_content_left", scrollLeft+"px");

//     if (visibleColumns-25 < firstLineLength ){
//         console.log("duuuuupa");
//             // Pobierz pozycję poziomego scrollbara
//     var scrollLeft = editor_2.renderer.scrollLeft;

// //if (scrollLeft > 40){
//         scrollLeft += 70;
//    // }
//     scrollLeft = scrollLeft * -1;

//     // ustawienie widoku kodu
//     var aceContent = document.getElementsByClassName("ace_content");
//     aceContent[0].style.setProperty("--ace_content_left", scrollLeft+"px");
//     }

    
    console.log("Liczba widocznych kolumn: ", visibleColumns);

}, 500);

}
