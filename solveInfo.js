let solves = [];
function saveSolves() {
  let newSave = JSON.stringify(solves);
  let currentID = JSON.stringify(nextID);
  localStorage.setItem("solves", newSave);
  localStorage.setItem("id", currentID);
}

function fixIDs() {
  if (solves.length > 0) {
    for (i = 0; i < solves.length; i++) {
      console.log(solves[i]);
      solves[i].id = i + 1;
    }
  }

  nextID = solves.length + 1;
  saveSolves();
}

function loadSolves() {
  loadData = JSON.parse(localStorage.getItem("solves"));
  loadID = JSON.parse(localStorage.getItem("id"));
  console.log(loadData);
  if (loadData) {
    solves = loadData;
  }
  if (loadID) {
    nextID = loadID;
  }
}

function removeLast(id) {
  for (i = 0; i < solves.length; i++) {
    if (solves[i].id == id) {
      solves.splice(i, 1);
      console.log(i);
    }
  }

  saveSolves();
}

function penaltySolve(id) {
  for (i = 0; i < solves.length; i++) {
    if (solves[i].id == id) {
      if (solves[i].penalty == false) {
        solves[i].penalty = true;
        console.log(solves[i].time);
        solves[i].display = (Number(solves[i].time) + 2).toFixed(2) + "+";
        break;
      } else {
        solves[i].penalty = false;
        solves[i].display = solves[i].time;
      }
    }
  }

  saveSolves();
}

function dnfLast(id) {
  for (i = 0; i < solves.length; i++) {
    if (solves[i].id == id) {
      if (solves[i].dnf == false) {
        solves[i].dnf = true;
        solves[i].display = "DNF";
      } else {
        solves[i].dnf = false;
        solves[i].display = solves[i].time;
      }
    }
  }

  saveSolves();
}
