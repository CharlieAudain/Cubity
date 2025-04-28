const timer = document.getElementById("timer");
const timerText = timer.firstChild;
console.log(timerText.innerHTML);

timer.addEventListener("click", () => setInterval(incrementTimer, 10));

let timerValue = 0;

function incrementTimer() {
  timerValue += 1;

  console.log(timerValue);
}
