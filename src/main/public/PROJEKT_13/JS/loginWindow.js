const saveButton = document.getElementById("saveResult");

saveButton.addEventListener('click', sendPost);


function sendPost(){
    // resultWindow.close();

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/redirect');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function() {
    //     if (xhr.status === 200) {
    //         window.location.href = '/redirect';
    //     }
    // };
    // xhr.onerror = function() {
    //     console.error('An error occurred while sending the request.');
    // };
    // xhr.send();


    $.get("/open-page", function(data) {
        var newWindow = window.open("/LogowanieRejestracja/LOGOWANIE/HTML/LOGIN_WINDOW.html", "_blank", "noopener,noreferrer");
        newWindow.document.write(data);
        newWindow.document.close();
    });
}



// register in the dialog window - old
function addSplitWindowToDiv() {
    const div = document.getElementById('result');

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    loadBootstrapHTML();
    
}
    // Funkcja do załadowania pliku HTML
    function loadBootstrapHTML() {
        $(function(){
            $("#result").load("login.html"); 
          });
      }