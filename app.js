const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let timerStarted = false;
console.log(timerText.innerHTML);

timer.addEventListener("click", startTimer());

function startTimer() {
  let start = new Date();
  let startTime = start.getTime();
  timerStarted = true;
  while (timerStarted == true) {
    incrementTimer(start);
  }
}
function incrementTimer(orig) {
  now = new Date();
  atm = now.getTime();
  delta = atm - orig;
  timerContent = delta / 100;
  newFeed = timerContent.toFixed(2);
  console.log;
  timerText.textContent = newFeed;
}
