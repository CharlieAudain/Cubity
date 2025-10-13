let solveTable = document.getElementById("solvesTable");

function rowBuilder(solveList) {
  for (i = 0; i < solves.length; i++) {
    let row = document.createElement("tr");
    let id = document.createElement("td");
    let time = document.createElement("td");

    let date = document.createElement("td");
    let scramble = document.createElement("td");

    let actions = document.createElement("td");

    let rButton = document.createElement("button");
    rButton.classList = "btn";
    rButton.innerHTML = "X";
    actions.appendChild(rButton);
    let pButton = document.createElement("button");
    pButton.classList = "btn";
    pButton.innerHTML = "+2";
    actions.appendChild(pButton);
    let dButton = document.createElement("button");
    dButton.classList = "btn";
    dButton.innerHTML = "DNF";
    actions.appendChild(dButton);

    let day = solveList[i].date.slice(8, 10);
    let month = solveList[i].date.slice(5, 7);
    let year = solveList[i].date.slice(0, 4);
    let timeStamp = solveList[i].date.slice(11, 19);
    let dateExport = day + "-" + month + "-" + year + " " + timeStamp;

    id.innerHTML = solveList[i].id;
    row.appendChild(id);
    time.innerHTML = solveList[i].display;
    row.appendChild(time);
    date.innerHTML = dateExport;
    row.appendChild(date);
    scramble.innerHTML = solveList[i].scramble;
    row.appendChild(scramble);
    row.appendChild(actions);

    solvesTable.appendChild(row);
  }
}
loadSolves();
console.log(solves[1].date);
rowBuilder(solves);
