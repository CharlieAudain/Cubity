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
