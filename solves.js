let solveTable = document.getElementById("solvesTable");

function rowBuilder(solveList) {
  for (i = 0; i < solves.length; i++) {
    let row = document.createElement("tr");
    let id = document.createElement("td");
    let time = document.createElement("td");

    let date = document.createElement("td");
    let scramble = document.createElement("td");

    id.innerHTML = solveList[i].id;
    row.appendChild(id);
    time.innerHTML = solveList[i].time;
    row.appendChild(time);
    date.innerHTML = solveList[i].date;
    row.appendChild(date);
    scramble.innerHTML = solveList[i].scramble;
    row.appendChild(scramble);
    solvesTable.appendChild(row);
  }
}
loadSolves();
console.log(typeof solves[1].date);
rowBuilder(solves);
