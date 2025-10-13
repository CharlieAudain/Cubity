const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState;
let heldTime = 0;

let ao5 = [];
let feed = document.getElementById("feed");
let cavg = document.getElementsByClassName("cavg");
let cao5 = document.getElementById("ao5");
let currentScramble = document.getElementById("scramble");
let nextID = 1;

const xbutton = document.getElementById("removeButton");
const penbutton = document.getElementById("penaltyButton");
const dnfbutton = document.getElementById("dnfButton");
const doc = document.querySelector("body");

function Solve(time) {
  this.id = nextID;
  nextID += 1;
  this.time = time;
  this.dnf = false;
  this.penalty = false;
  this.date = new Date();
  this.display = this.time;
  this.scramble = currentScramble.innerHTML;
}
function timerInit() {
  loadSolves();
  ao5Init();
  fixIDs();
  loadScramble("F R2 U2 F' R2 F' L2 U2 B2 L2 D2 F2 D' B2 L2 B R' F2 R' D B'");
  timerText.innerHTML = "0.00";
}

function loadScramble(gen) {
  currentScramble.innerHTML = gen;
}

function calcAvg(avg) {
  let avgLen = avg.length;
  let count = 0;
  let largest = 0;
  let lowest = 0;
  let dnfCount = 0;
  for (let i = 0; i < avgLen; i++) {
    if (lowest == 0 || avg[i].time < lowest) {
      lowest = avg[i].time;
    } else if (avg[i].time > largest) {
      largest = avg[i].time;
    }
    if (avg[i].dnf == true) {
      dnfCount += 1;
      continue;
    }
    count += Number(avg[i].time);
    if (avg[i].penalty == true) {
      count += 2;
    }
  }
  count = count + largest * dnfCount - largest - lowest;
  let finalAvg = count / (avgLen - 2);
  return finalAvg.toFixed(2);
}

function ao5Init() {
  if (solves.length >= 5) {
    ao5 = loadAvg(5);
    runningAvg = calcAvg(ao5);
    cao5.innerHTML = runningAvg;
    for (i = 0; i < 5; i++) {
      cavg[i].firstChild.innerHTML = ao5[i].display ?? "-";
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
  console.log(newSolve.id);
  saveSolves();
  ao5Init();
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
  console.log(nextID - 1);
  removeLast(nextID - 1);
  fixIDs();
  saveSolves();
  ao5Init();
});
penbutton.addEventListener("click", (e) => {
  e.target.blur();
  console.log(nextID - 1);
  penaltySolve(nextID - 1);
  saveSolves();
  ao5Init();
});

dnfbutton.addEventListener("click", (e) => {
  e.target.blur();
  console.log(nextID - 1);
  dnfLast(nextID - 1);
  saveSolves();
  ao5Init();
});

timerInit();
console.log(nextID);
