let solves = [];
function saveSolves() {
  let newSave = JSON.stringify(solves);
  localStorage.setItem("solves", newSave);
}

function loadSolves() {
  loadData = JSON.parse(localStorage.getItem("solves"));

  if (loadData) {
    solves = loadData;
  }
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
}

function penaltyLast() {
  let lastIndex = solves.length - 1;
  if (lastIndex > 0) {
    lastSolve = solves[lastIndex];
    if (lastSolve.penalty == false) {
      lastSolve.penalty = true;
      console.log(lastSolve.time);
      lastSolve.display = (Number(lastSolve.time) + 2).toFixed(2) + "+";
    } else {
      lastSolve.penalty = false;
      lastSolve.display = lastSolve.time;
    }
    saveSolves();
  }
}

function dnfLast() {
  let lastIndex = solves.length - 1;
  if (lastIndex > 0) {
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
}