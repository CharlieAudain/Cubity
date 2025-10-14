let solveTable = document.getElementById("solvesTable");

function rowDestroyer() {
  solveTable.innerHTML = "";
}

function rowBuilder(solveList) {
  for (let i = 1; i <= solveList.length; i++) {
    let row = document.createElement("tr");
    let id = document.createElement("td");
    let time = document.createElement("td");

    let date = document.createElement("td");
    let scramble = document.createElement("td");

    let actions = document.createElement("td");

    let rButton = document.createElement("button");
    rButton.classList = "btn";
    rButton.innerHTML = "X";
    rButton.addEventListener("click", (e) => {
      e.target.blur();
      console.log(i);
      removeLast(solveList[i].id);
      fixIDs();
      saveSolves();
      rowDestroyer();
      rowBuilder(solves);
    });
    actions.appendChild(rButton);
    let pButton = document.createElement("button");
    pButton.classList = "btn";
    pButton.innerHTML = "+2";
    pButton.addEventListener("click", (e) => {
      e.target.blur();
      console.log(i);
      penaltySolve(solveList[solveList.length - i].id);
      saveSolves();
      rowDestroyer();
      rowBuilder(solves);
    });
    actions.appendChild(pButton);
    let dButton = document.createElement("button");
    dButton.classList = "btn";
    dButton.innerHTML = "DNF";
    dButton.addEventListener("click", (e) => {
      e.target.blur();
      dnfLast(solveList[solveList.length - i].id);
      saveSolves();
      rowDestroyer();
      rowBuilder(solves);
    });
    actions.appendChild(dButton);

    let day = solveList[solveList.length - i].date.slice(8, 10);
    let month = solveList[solveList.length - i].date.slice(5, 7);
    let year = solveList[solveList.length - i].date.slice(0, 4);
    let timeStamp = solveList[solveList.length - i].date.slice(11, 19);
    let dateExport = day + "-" + month + "-" + year + " " + timeStamp;

    id.innerHTML = solveList[solveList.length - i].id;
    row.appendChild(id);
    time.innerHTML = solveList[solveList.length - i].display;
    row.appendChild(time);
    date.innerHTML = dateExport;
    row.appendChild(date);
    scramble.innerHTML = solveList[solveList.length - i].scramble;
    row.appendChild(scramble);
    row.appendChild(actions);

    solvesTable.appendChild(row);
  }
}
loadSolves();

rowBuilder(solves);
