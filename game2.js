//Variables
let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let boardHistory = [];
let board = document.querySelector(".activeBoard");

let flag = true;
let done = false;
let p1Score = 0,
  p2Score = 0;
let p1Name, p2Name, a, b;
let moveCounter = 0;

//Win Conditions
let winner = (player) => {
  if (player === "x") {
    window.alert("x wins");
    p1Score++;
  } else {
    window.alert("o wins");
    p2Score++;
  }
};

let winnerCheck = (player) => {
  let [[c1, c2, c3], [c4, c5, c6], [c7, c8, c9]] = boardState;
  for (i = 0; i < 3; i++) {
    if (
      boardState[i][0] !== "" &&
      boardState[i][0] === boardState[i][1] &&
      boardState[i][1] === boardState[i][2]
    ) {
      winner(player);
      done = true;
      return;
    }
  }
  for (j = 0; j < 3; j++) {
    if (
      boardState[0][j] !== "" &&
      boardState[0][j] === boardState[1][j] &&
      boardState[1][j] === boardState[2][j]
    ) {
      winner(player);
      done = true;
      return;
    }
  }
  if (c1 !== "" && c1 === c5 && c5 === c9) {
    winner(player);
    done = true;
    return;
  }
  if (c3 !== "" && c3 === c5 && c5 === c7) {
    winner(player);
    done = true;
    return;
  }

  if (
    boardState.every(
      (checkitem = (cell) => {
        cell !== "";
      })
    ) === true
  ) {
    window.alert("Draw");
    done = true;
    return;
  }
};
//

//player input
let turn = (cell, id) => {
  a = parseInt(id.match(/\d/)[0]);
  b = parseInt(id.match(/\d+$/)[0]);
  if (boardState[a][b] === "" && done === false) {
    if (flag === true) {
      boardState[a][b] = "x";
      flag = !flag;
      moveCounter++;
      boardHistory[boardHistory.length] = boardState;
      console.log(boardHistory);
      boardUpdate();
      winnerCheck("x");
    } else {
      boardState[a][b] = "o";
      flag = !flag;
      moveCounter++;
      boardHistory[boardHistory.length] = boardState;
      console.log(boardHistory);
      boardUpdate();
      winnerCheck("o");
    }
  } else {
    return;
  }
};

//board manipulation
let reset = () => {
  boardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  done = false;
  boardUpdate();
};

let boardUpdate = () => {
  boardState.forEach((rows, y) => {
    rows.forEach((item, x) => {
      cell = document.getElementById(`${y},${x}`);
      if (item === "x") {
        cell.classList.add("cross");
      } else if (item === "o") {
        cell.classList.add("circle");
      } else {
        if (cell.classList.contains("cross") === true) {
          cell.classList.remove("cross");
        } else if (cell.classList.contains("circle") === true) {
          cell.classList.remove("circle");
        }
        return;
      }
    });
  });
};

boardState.forEach((rows, y) => {
  rows.forEach((item, x) => {
    let columndiv = document.createElement("div");
    columndiv.id = `${y},${x}`;
    columndiv.classList.add("box");
    columndiv.textContent = item;
    columndiv.addEventListener("click", function () {
      turn(columndiv, columndiv.id);
      console.log("click");
    });
    board.appendChild(columndiv);
  });
});

document.querySelector(".reset").addEventListener("click", function () {
  reset();
  console.log("click");
});
