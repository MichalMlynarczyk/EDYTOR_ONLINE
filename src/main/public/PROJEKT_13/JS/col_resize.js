// uchwyt do col-resize
const drift = document.getElementById("drift");

const editor_1_div = document.getElementById("editor_1");
const editor_2_div = document.getElementById("editor_2");

// drift position
const driftPosition = {
    posX : 0,
};

// wydarzenie
// drift.addEventListener("click", (event) => {

//     // Pobranie pozycji
//     var posX = drift.getBoundingClientRect().left;

//     console.log(posX);

// });


// // po zwolnieniu myszki
// drift.addEventListener("mouseup", function(event) {

//         // Pobranie pozycji
//         var posX = drift.getBoundingClientRect().left;

//         console.log(posX);
// });

var isDragging = false;
var dragOffsetX = 0;
var dragOffsetY = 0;

var startX = 0;
var startY = 0;


drift.addEventListener("mousedown", function(event) {
    isDragging = true;
    dragOffsetX = event.clientX - drift.offsetLeft;
    dragOffsetY = event.clientY - drift.offsetTop;

    startX = event.clientX;
    startY = event.clientY;
});

document.addEventListener("mousemove", function(event) {
    if (isDragging) {
        //drift.style.left = (event.clientX - dragOffsetX) + "px";
         console.log(dragOffsetX + "d");

        var endX = event.clientX;
        var endY = event.clientY;
        var deltaX = endX - startX;
     
        console.log("endX" + deltaX);

        changeEditor_1(deltaX);
        //changeEditor_2(dragOffsetX);
    }
});

document.addEventListener("mouseup", function(event) {
    isDragging = false;
   // var deltaY = endY - startY;
   // var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
});


function changeEditor_1(offset) {

    console.log("offset: " + offset);

    var width = getElementWidth(editor_1_div);

    var offsetX = 0;

    if (offset > 0){
        offsetX = 1;
    } else{
        offsetX = -1;
    }

    width = width + offsetX;

    changeElementWidth(editor_1_div, width);

}

// function changeEditor_2(offset) {
    
//     var width = getElementWidth(editor_2_div);
// }


function getElementWidth(elememnt){
    var width = elememnt.getBoundingClientRect().width;
    return width;
}

function changeElementWidth(element, offset){
    element.style.width = offset + "px";
}

function getElementPositionX(elememnt){
    var positionX = elememnt.offsetLeft;
    return positionX;
}


// rozpoczecie testu pisania ! 
const dialogWindowElement = {
    background : null,
}

function createDialogWindow(){

    var background = document.createElement("div");
    background.id = "dialogBG";


    /// tworzenie okna dialogowego
    var dialogWindow = document.createElement("dialog");
    dialogWindow.id = "dialogWindow";

    // elementy dialog window
    var button = document.createElement("button");

    button.addEventListener("click", function() {
        // zamkniecie okna 
        dialogWindow.close();
        background.style.display = 'none';
        // rozpoczecie liczenia czasu
        startTestTime = new Date();

        speed();
        time();

        // loadRanking();
    });



    button.textContent = "START";

    // dodanie elementów
    dialogWindow.appendChild(button);
    background.appendChild(dialogWindow);
    editor_2_div.appendChild(background);

    dialogWindowElement.background = background;
   // dialogWindow.showModal();
}


function showDialogWindow(){
    dialogWindowElement.background.style.display = "block";
}

