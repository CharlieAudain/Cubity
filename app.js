const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState;
let heldTime = 0;
let solves = [];
let ao5 = [];
let feed = document.getElementById("feed");
let cavg = document.getElementsByClassName("cavg");
let cao5 = document.getElementById("ao5");

const xbutton = document.getElementById("removeButton");
const penbutton = document.getElementById("penaltyButton");
const dnfbutton = document.getElementById("dnfButton");
const doc = document.querySelector("body");

function Solve(time) {
  this.time = time;
  this.dnf = false;
  this.penalty = false;
  this.date = new Date();
  this.display = this.time;
}
function timerInit() {
  loadSolves();
  ao5Init();
  timerText.innerText = "0.00";
}

function calcAvg(avg) {
  let avgLen = avg.length;
  let count = 0;
  for (let i = 0; i < avgLen; i++) {
    count += Number(avg[i].time);
    if (avg[i].penalty == true) {
      count += 2;
    }
  }
  let finalAvg = count / avgLen;

  return finalAvg.toFixed(2);
}

function ao5Init() {
  ao5 = loadAvg(5);
  if (solves.length >= 5) {
    console.log(ao5);
    runningAvg = calcAvg(ao5);
    cao5.innerHTML = runningAvg;
    for (i = 0; i < 5; i++) {
      cavg[i].firstChild.innerHTML = ao5[i].display;
    }
  } else {
    cao5.innerHTML = "?";
    for (i = 0; i < 5; i++) {
      cavg[i].firstChild.innerHTML = "";
    }
  }
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
  let newSolve = new Solve(timerText.innerHTML);
  solves.push(newSolve);
  saveSolves();
  console.log(newSolve.time);
}

function saveSolves() {
  let newSave = JSON.stringify(solves);
  localStorage.setItem("solves", newSave);
  ao5Init();
}

function loadSolves() {
  loadData = JSON.parse(localStorage.getItem("solves"));
  solves = loadData;
}

function loadAvg(avgLength) {
  let avg = [];
  let lastIndex = solves.length;
  if (solves.length >= avgLength) {
    for (i = 1; i < avgLength + 1; i++) {
      avg.push(solves[lastIndex - i]);
    }
  }

  return avg;
}

function removeLast() {
  let lastIndex = solves.length;
  solves.pop();
  lastIndex = solves.length;
  if (lastIndex > 0) {
    timerText.innerHTML = solves[lastIndex - 1].time;
  } else {
    timerText.innerHTML = "0.00";
  }
  saveSolves();
  console.log(solves);
}

function penaltyLast() {
  let lastIndex = solves.length - 1;
  lastSolve = solves[lastIndex];
  if (lastSolve.penalty == false) {
    lastSolve.penalty = true;
    console.log(lastSolve.time);
    lastSolve.display = (Number(lastSolve.time) + 2).toFixed(2) + "+";
    timerText.innerHTML = lastSolve.time + "+";
    ao5Init();
  } else {
    lastSolve.penalty = false;
    lastSolve.display = lastSolve.time;
    timerText.innerHTML = lastSolve.time;
    ao5Init();
  }
  saveSolves();
}
function dnfLast() {
  let lastIndex = solves.length - 1;
  lastSolve = solves[lastIndex];
  if (lastSolve.dnf == false) {
    lastSolve.dnf = true;
    timerText.innerHTML = "DNF";
    lastSolve.display = "DNF";
  } else {
    lastSolve.dnf = false;
    lastSolve.display = lastSolve.time;
    timerText.innerHTML = lastSolve.display;
    ao5Init();
  }
  saveSolves();
}

doc.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    if (timerLoop) {
      timerStop();
    } else {
      timerText.innerHTML = "0.00";
      timerText.classList.add("red");
      if (e.repeat == true) {
        heldTime += 1;
      }
      if (heldTime > 2) {
        timerText.classList.add("green");
        timerText.classList.remove("red");
        timerState = "ready";
      }
    }
  }
});

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
