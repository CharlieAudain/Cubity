const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState;
let heldTime = 0;
let solves = [];
const xbutton = timer.lastChild
const doc = document.querySelector("body");
function timerInit() {
  loadSolves();
  timerText.innerText = "0.00";
  doc.addEventListener("keypress", (e) => {
    if (e.key === " ") {
      if (timerLoop) {
        timerStop();
      } else {
        if (e.repeat == true) {
          timerText.innerHTML = "0.00"
          timerText.classList.add("red");
          heldTime += 1;
          console.log(heldTime);
        }
        if (heldTime > 10) {
          timerText.classList.add("green");
          timerText.classList.remove("red");
          timerState = "ready";
        }
      }
    }
  });
}
doc.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    heldtime = 0;
    timerText.classList.remove("green");
    timerText.classList.remove("red");
    timerStart();
  }
});

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
  } else {
    heldTime = 0;
  }
}

function timerStop() {
  clearInterval(timerLoop);
  timerLoop = null;
  solves.push(timerText.innerHTML);
  saveSolves();
  console.log(solves);
}

function saveSolves() {
  let newSave = JSON.stringify(solves);
  localStorage.setItem("solves", newSave);
}

function loadSolves() {
  loadData = JSON.parse(localStorage.getItem("solves"));
  solves = loadData;
}

function removeLast(){
  solves.pop()
  timerText.innerHTML = "0.00"

}

console.log(xbutton)
timerInit();
