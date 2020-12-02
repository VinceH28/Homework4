var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 120;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Timer: " + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage() {
  timeEl.textContent = "Timer has expired!";

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "https://github.com/VincentH28/Homework4/blob/main/timer%20expired.png?raw=true");
  mainEl.appendChild(imgEl);

}

setTime();