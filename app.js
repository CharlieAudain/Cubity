const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState;
let heldTime = 0;
let solves = [];
let a05 = [];

const xbutton = document.getElementById("removeButton");
const penbutton = document.getElementById("penaltyButton");
const dnfbutton = document.getElementById("dnfButton");
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
          timerText.innerHTML = "0.00";
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

function a05Init() {
  ao5 = loadAvg(5);
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

function loadAvg(avgLength) {
  let avg = [];
  let lastIndex = solves.length;
  for (i = 1; i < avgLength + 1; i++) {
    avg.push(solves[lastIndex - i]);
  }
  return avg;
}

function removeLast() {
  let lastIndex = solves.length;
  solves.pop();
  lastIndex = solves.length;
  if (lastIndex > 0) {
    timerText.innerHTML = solves[lastIndex - 1];
  } else {
    timerText.innerHTML = "0.00";
  }
  saveSolves();
  console.log(solves);
}

function penaltyLast() {
  lastSolve = timerText.innerHTML;
  if (lastSolve.includes("+") == false) {
    lastNumber = Number(lastSolve);
    lastNumber += 2;
    let lastIndex = solves.length;
    penaltySolve = lastNumber.toFixed(2) + "+";
    timerText.innerHTML = penaltySolve;
    solves[lastIndex - 1] = penaltySolve;
    saveSolves();
  }
}
function dnfLast() {
  lastSolve = timerText.innerHTML;
  let lastIndex = solves.length;
  if (lastSolve.includes("DNF") == false) {
    timerText.innerHTML = "DNF";
    solves[lastIndex - 1] = "DNF";
    saveSolves();
  }
}

xbutton.addEventListener("click", (e) => {
  e.target.blur();
  removeLast();
});
penbutton.addEventListener("click", (e) => {
  e.target.blur();
  penaltyLast();
});
dnfbutton.addEventListener("click", (e) => {
  e.target.blur();
  dnfLast();
});

timerInit();
