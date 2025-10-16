const timer = document.getElementById("timer");
const timerText = timer.firstChild;
let startTime;
let timerLoop = null;
let timerState;
let heldTime = 0;

let ao5 = [];
let ao12 = [];
let ao50 = [];
let ao100 = [];
let ao200 = [];
let ao500 = [];
let ao1000 = [];
let feed = document.getElementById("feed");
let cavg = document.getElementsByClassName("cavg");
let cao5 = document.getElementById("ao5");
let cao12 = document.getElementById("ao12");
let cao50 = document.getElementById("ao50");
let cao100 = document.getElementById("ao100");
let cao200 = document.getElementById("ao200");
let cao500 = document.getElementById("ao500");
let cao1000 = document.getElementById("ao1000");
let currentScramble = document.getElementById("scramble");
let best = document.getElementById("best");
let todayBest = document.getElementById("todayBest");
let worst = document.getElementById("worst");
let todayWorst = document.getElementById("todayWorst");

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
  avgInit();
  bestsInit();
  todayInit();
  fixIDs();
  loadScramble(scrambleGen(20));
  timerText.innerHTML = "0.00";
}

function scrambleGen(length) {
  let gen = "";
  let last;
  let rng;
  let rng2;
  for (i = 0; i < length; i++) {
    while (last == rng) {
      // make sure you dont ge the same moves twice

      rng = Math.floor(Math.random() * (7 - 1) + 1);
    }

    switch (rng) {
      case 1:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "F";
        } else {
          gen += "F2";
        }
        break;
      case 2:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "B";
        } else {
          gen += "B2";
        }
        break;
      case 3:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "L";
        } else {
          gen += "L2";
        }
        break;
      case 4:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "R";
        } else {
          gen += "R2";
        }
        break;
      case 5:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "D";
        } else {
          gen += "D2";
        }
        break;
      case 6:
        rng2 = Math.floor(Math.random() * (3 - 1) + 1);
        if (rng2 == 1) {
          gen += "U";
        } else {
          gen += "U2";
        }
        break;
    }
    last = rng;
    gen += " ";
    console.log(gen);
  }

  return gen;
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

function avgInit() {
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
  if (solves.length >= 12) {
    ao12 = loadAvg(12);
    runningAvg = calcAvg(ao12);
    cao12.innerHTML = runningAvg;
  } else {
    cao12.innerHTML = "?";
  }
  if (solves.length >= 50) {
    ao50 = loadAvg(50);
    runningAvg = calcAvg(ao50);
    cao50.innerHTML = runningAvg;
  } else {
    cao50.innerHTML = "?";
  }
  if (solves.length >= 100) {
    ao100 = loadAvg(100);
    runningAvg = calcAvg(ao100);
    cao100.innerHTML = runningAvg;
  } else {
    cao100.innerHTML = "?";
  }
  if (solves.length >= 200) {
    ao200 = loadAvg(200);
    runningAvg = calcAvg(ao200);
    cao200.innerHTML = runningAvg;
  } else {
    cao200.innerHTML = "?";
  }
  if (solves.length >= 500) {
    ao500 = loadAvg(500);
    runningAvg = calcAvg(ao500);
    cao500.innerHTML = runningAvg;
  } else {
    cao500.innerHTML = "?";
  }
  if (solves.length >= 1000) {
    ao200 = loadAvg(1000);
    runningAvg = calcAvg(ao1000);
    cao1000.innerHTML = runningAvg;
  } else {
    cao1000.innerHTML = "?";
  }
}

function todayInit() {
  todaySolves = [];
  today = new Date();
  todayDate = today.toISOString(); //get full date

  if (solves.length > 0) {
    for (i = 0; i < solves.length; i++) {
      console.log(solves[i].date);
      if (solves[i].date.slice(0, 10) == todayDate.slice(0, 10)) {
        //compare date to each solve to build today solves list
        todaySolves.push(solves[i]);
      }
    }
  } else {
    todayBest.innerHTML = "?";
    todayWorst.innerHTML = "?";
  }

  todayBest.innerHTML = getBest(todaySolves);
  todayWorst.innerHTML = getWorst(todaySolves);
}

function bestsInit() {
  best.innerHTML = getBest(solves);
  worst.innerHTML = getWorst(solves);
}

function getBest(list) {
  if (list.length > 0) {
    best = list[0].time;
    for (i = 0; i < list.length; i++) {
      if (best > list[i].time) {
        best = list[i].time;
      }
    }
    return best;
  } else {
    return "?";
  }
}
function getWorst(list) {
  if (list.length > 0) {
    best = list[0].time;
    for (i = 0; i < list.length; i++) {
      if (best < list[i].time) {
        best = list[i].time;
      }
    }
    return best;
  } else {
    return "?";
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
  currentScramble.innerHTML = scrambleGen(20);
  saveSolves();
  avgInit();
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
  removeLast(nextID - 1);
  fixIDs();
  saveSolves();
  avgInit();
});
penbutton.addEventListener("click", (e) => {
  e.target.blur();
  penaltySolve(nextID - 1);
  saveSolves();
  avgInit();
});

dnfbutton.addEventListener("click", (e) => {
  e.target.blur();
  dnfLast(nextID - 1);
  saveSolves();
  avgInit();
});

timerInit();
