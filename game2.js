let boardState = [
  ["", "", ""],
  ["x", "", "o"],
  ["", "", ""],
];
let board = document.querySelector(".activeBoard");

let flag = true;
let done = false;
let p1Score = 0,
  p2Score = 0;
let p1Name, p2Name, a, b;

let turn = (cell, id) => {
    converter(id);
    if (boardState[a][b] === "" && done === false) {
      if (flag === true) {
        boardState[a][b] = "x";
        flag = !flag;
        cell.classList.toggle("cross");
        winnerCheck("x");
      } else {
        boardState[a][b] = "o";
        flag = !flag;
        cell.classList.toggle("circle");
        winnerCheck("o");
      }
    } else {
      return;
    }
  };

boardState.forEach((rows, ind) => {
  let rowdiv = document.createElement("div");
  rowdiv.classList.add("row");
  rowdiv.classList.add(ind);
  rows.forEach((item, ind2) => {
    let columndiv = document.createElement("div");
    columndiv.id = `${ind},${ind2}`;
    columndiv.classList.add("box");
    columndiv.textContent = item;
    columndiv.addEventListener("click", function () {
        turn(columndiv, columndiv.id);
        console.log("click")
    
    board.appendChild(columndiv);
  });
});


