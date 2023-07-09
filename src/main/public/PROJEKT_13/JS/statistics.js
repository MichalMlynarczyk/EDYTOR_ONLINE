// odmierzanie czasu
var startTestTime = null;
var endTestTime = null;


// pobranie czasu testu
function getTime(){
    var t = endTestTime - startTestTime;
    console.log("t: " + t );
    var time = (endTestTime - startTestTime)/1000;
    var x = Math.floor(time / 60);
    var sekundy;
    var minuts;
    
    if (x > 0){
        sekundy = time - (x * 60);
        minuts =  (x + (sekundy/100));
    } else {
        sekundy = time;
        minuts =  ((sekundy/100));
    }

    return minuts;
}

// zwracanie podobienstwa tekstu
function getCorrectness(){
    const string1 = editor_1.getValue();
    const string2 = editor_2.getValue();
    const similarity = stringSimilarity.compareTwoStrings(string1, string2);

    return similarity;
}

// ilosc znakow na minute
function getSpeed(characterCount){
    var milisekund = endTestTime - startTestTime;
    const minutes = milisekund / 1000 / 60; // Konwersja milisekund na minuty
    const charactersPerMinute = parseInt(characterCount / minutes); // Obliczenie liczby znaków na minutę
  
    return charactersPerMinute;
}