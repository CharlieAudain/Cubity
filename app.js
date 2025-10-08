const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let y = Date.now();
const timerLoop = setInterval(timerFunction, 10);

function timerFunction() {
  nowTime = Date.now()
  let delta = nowTime - y;
  
  timerText.innerText = (delta/1000).toFixed(2);
}
