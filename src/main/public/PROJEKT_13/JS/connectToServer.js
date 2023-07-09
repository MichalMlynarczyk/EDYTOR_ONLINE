// pobieranie tekstu do przepisywania z serwera
function send(data){
    // data -> język programowania
    var requestData = data;
    // wysyłanie
    $.post("/get-text", requestData, function(responseData) {
        editor_1.setValue(responseData);
    }, "json");
}
