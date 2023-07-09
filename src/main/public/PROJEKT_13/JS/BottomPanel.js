// uchwyty
var accuracy_span = document.getElementById("accuracy_span");
var speed_span = document.getElementById("speed_span");
var time_span = document.getElementById("time_span");
var end_span = document.getElementById("end_span");

/// uchwyty do set interval
var speedTime;
var timer;

// aktualizuje wartość accurate
function accurate(){
    var accuracy = getCorrectness() * 100;
    var accuracy_ = accuracy.toFixed(1);
    accuracy_span.innerHTML = accuracy_ + "%"; // Wyczyść zawartość elementu span
}

function speed(){
    speedTime = setInterval(function() {
        var editor_1_letters = editor_1.getValue();
        var editor_2_letters = editor_2.getValue();
    
        var content_1 = editor_1_letters.replace(/\s/g, '');
        var content_2 = editor_2_letters.replace(/\s/g, '');
    
        var content_1_length = content_1.length;
        var content_2_length = content_2.length;
        
        // czas zakonczenia testu
        endTestTime = new Date();
        var time = getTime();
    
        // liczba znakow na minute
        var speed = getSpeed(content_2_length);
        
        speed_span.innerHTML = speed; 
      }, 1000);
}

function time(){
    var startTime = new Date().getTime(); // Pobranie czasu rozpoczęcia
    timer = setInterval(function() {
      var currentTime = new Date().getTime();
      var elapsedTime = currentTime - startTime;
  
      var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  
      // Dodawanie wiodącego zera dla jednocyfrowych wartości
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      var timeString = hours + ":" + minutes + ":" + seconds;
      time_span.innerHTML = timeString; 
    }, 1000);

}

function end(){
    var editor_1_letters = editor_1.getValue();
    var editor_2_letters = editor_2.getValue();

    var content_1 = editor_1_letters.replace(/\s/g, '');
    var content_2 = editor_2_letters.replace(/\s/g, '');

    var content_1_length = content_1.length;
    var content_2_length = content_2.length;

    var doKonca = content_1_length - content_2_length;

    end_span.innerHTML = doKonca; 
}

var themeSwitches = document.getElementsByName('theme-switch');
var musicSwitches = document.getElementsByName('music-switch');



themeSwitches.forEach(function(switchElement) {
  switchElement.addEventListener('change', function() {
    if (switchElement.checked) {
      console.log('Wybrano temat: ' + switchElement.nextElementSibling.textContent);
      if(switchElement.nextElementSibling.textContent == 'Theme1'){

        document.getElementsByClassName("ace_editor")[0].style.backgroundColor = 'rgba(0,36,81,255)';
        document.getElementById("container").style.backgroundColor = 'rgba(0,36,81,255)';

        var elements = document.querySelectorAll('.ace-monokai.ace_marker-layer.ace_active-line');
        elements.forEach(function(element) {
          element.style.backgroundColor = '#00346e';
        });
        
        var elements1 = document.querySelectorAll('.ace_gutter-active-line');
        elements1.forEach(function(element) {
          element.style.backgroundColor = '#002451 !important';
        });

        // var elements2 = document.querySelectorAll('.ace_active-line');
        // elements2.forEach(function(element) {
        //   element.style.background = '#00346e !important';
        // });


        var elements3 = document.querySelectorAll('.ace_editor');
        elements3.forEach(function(element) {
          element.style.backgroundColor = 'rgba(0,36,81,255)';
        });

        var elements4 = document.querySelectorAll('.ace-tomorrow.ace_marker-layer.ace_selection');
        elements4.forEach(function(element) {
          element.style.backgroundColor = 'rgba(0,36,81,255) !important';
        });

        var elements5 = document.querySelectorAll('.pointer');
        elements5.forEach(function(element) {
          element.style.borderColor = 'rgb(3, 53, 115)';
        });

        var elements6 = document.querySelectorAll('.first');
        elements6.forEach(function(element) {
          element.style.backgroundColor = 'rgba(0,36,81,255)';
        });

        var elements7 = document.querySelectorAll('.second');
        elements7.forEach(function(element) {
          element.style.background = 'linear-gradient(to bottom, rgba(0,36,81,255), rgb(3, 53, 115))';
        });

        var elements8 = document.querySelectorAll('.toggle-switch-container');
        elements8.forEach(function(element) {
          element.style.background = 'linear-gradient(to bottom, rgba(0,36,81,255), rgb(3, 53, 115))';
        });

        // var elements9 = document.querySelectorAll('.button');
        // elements9.forEach(function(element) {
        //   element.style.backgroundColor = '#001c40';
        //   element.style.borderColor = '#1f252d';
        // });

        var elements10 = document.querySelectorAll('#drift');
        elements10.forEach(function(element) {
          element.style.backgroundColor = '#001733';
        });

        var elements11 = document.querySelectorAll('#leftPanel_');
        elements11.forEach(function(element) {
          element.style.backgroundColor = '#001733';
        });

        var elements12 = document.querySelectorAll('#leftPanel');
        elements12.forEach(function(element) {
          element.style.backgroundColor = '#001733';
        });

        var elements13 = document.querySelectorAll('.ace_gutter');
        elements13.forEach(function(element) {
          element.style.backgroundColor = '#002451 !important';
        });

        editors[0].querySelector(".ace_gutter").style.backgroundColor = "#002451";
        editors[1].querySelector(".ace_gutter").style.backgroundColor = "#002451";

        buttonColor.not_active = '#001c40';
        buttonColor.active = '#002451';

        addButtonStyle();
     
      }else{

        document.getElementsByClassName("ace_editor")[0].style.backgroundColor = '#09131b';
        document.getElementById("container").style.backgroundColor = '#09131b';

        var elements = document.querySelectorAll('.ace-monokai.ace_marker-layer.ace_active-line');
        elements.forEach(function(element) {
          element.style.backgroundColor = '#121e29';
        });

        var elements1 = document.querySelectorAll('.ace_gutter-active-line');
        elements1.forEach(function(element) {
          element.style.backgroundColor = '#002451 !important';
        });

        var elements2 = document.querySelectorAll('.ace_active-line');
        elements2.forEach(function(element) {
          // element.style.background = '#121e29';
          element.setAttribute('background', '#121e29', '!important');
        });

        // editors[0].querySelector(".ace_active-line").style.background = "#121e29";
        // editors[1].querySelector(".ace_active-line").style.background = "#121e29";

        // var activeLineElements = document.querySelectorAll('.ace_active-line');
        // activeLineElements.forEach(function(element) {

        //   element.style.background = '#00346e !important';
        // });

        var elements3 = document.querySelectorAll('.ace_editor');
        elements3.forEach(function(element) {
          element.style.backgroundColor = '#09131b';
        });

        var elements4 = document.querySelectorAll('.ace-tomorrow.ace_marker-layer.ace_selection');
        elements4.forEach(function(element) {
          element.style.backgroundColor = '#121e29 !important';
        });

        var elements5 = document.querySelectorAll('.pointer');
        elements5.forEach(function(element) {
          element.style.borderColor = '#112231';
        });

        var elements6 = document.querySelectorAll('.first');
        elements6.forEach(function(element) {
          element.style.backgroundColor = '#09131b';
        });

        var elements7 = document.querySelectorAll('.second');
        elements7.forEach(function(element) {
          element.style.background = 'linear-gradient(to bottom, #09131b, #0e1c27)';
        });

        var elements8 = document.querySelectorAll('.toggle-switch-container');
        elements8.forEach(function(element) {
          element.style.background = 'linear-gradient(to bottom, #09131b, #162b3c)';
        });

        // var elements9 = document.querySelectorAll('.button');
        // elements9.forEach(function(element) {
        //   element.style.backgroundColor = '#0c1a25';
        //   element.style.borderColor = '#071016';
        // });

        var elements10 = document.querySelectorAll('#drift');
        elements10.forEach(function(element) {
          element.style.backgroundColor = '#122534';
        });

        var elements11 = document.querySelectorAll('#leftPanel_');
        elements11.forEach(function(element) {
          element.style.backgroundColor = '#0a1620';
        });

        var elements12 = document.querySelectorAll('#leftPanel');
        elements12.forEach(function(element) {
          element.style.backgroundColor = '#0a1620';
        });

        editors[0].querySelector(".ace_gutter").style.backgroundColor = "#09131b";
        editors[1].querySelector(".ace_gutter").style.backgroundColor = "#09131b";

        buttonColor.not_active = '#0c1a25';
        buttonColor.active = '#1a2c3a';

        
        addButtonStyle();


      }
      // Wykonaj odpowiednie działania dla wybranego tematu
    } else {
      console.log('Temat odznaczony');
      // Wykonaj odpowiednie działania, gdy temat nie jest zaznaczony
    }
  });
});

// Obsługa zmiany stanu w przełącznikach dla muzyki
musicSwitches.forEach(function(switchElement) {
  switchElement.addEventListener('change', function() {
    if (switchElement.checked) {
      var musicStatus = switchElement.nextSibling.textContent;
      console.log('Stan muzyki: ' + musicStatus);
      if(switchElement.nextElementSibling.textContent == 'SoundON'){
        keySound.start = 1;
      } else {
        keySound.start = 0;
      }
      // Wykonaj odpowiednie działania w zależności od stanu muzyki
    }
  });
});