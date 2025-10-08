const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState = "ready";

const doc = document.querySelector("body");
function timerInit() {
  timerText.innerText = "0.00";
  doc.addEventListener("keypress", (e) => {
    if (e.key === " ") {
      if (timerLoop) {
        timerStop();
      } else {
        timerStart();
      }
    }
  });
}

function timerFunction(initial) {
  let elapsed = Date.now();
  let delta = elapsed - initial;

  timerText.innerText = (delta / 1000).toFixed(2);
  console.log(delta);
}

function timerStart() {
  startTime = Date.now();
  if (timerState == "ready") {
    timerState = "engaged";
    timerLoop = setInterval(() => {
      timerFunction(startTime);
    });
  }
}

function timerStop() {
  clearInterval(timerLoop);
  timerLoop = null;
  setTimeout(() => {
    timerState = "ready";
  }, 2000);
}

timerInit();
