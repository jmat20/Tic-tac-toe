//Variables
let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let boardHistory = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let board = document.querySelector(".activeBoard");
let p1Status = document.querySelector("[data-p1-status]");
let p2Status = document.querySelector("[data-p2-status]");
let winnerDisp = document.querySelector(".winnerBox");
let dispDismiss = document.querySelector("[data-dismiss]");
let flag = true;
let done = false;
let p1Score = 0,
  p2Score = 0;
let p1Name, p2Name, a, b, moveString;
let moveCounter = 0,
  dispMove = 0;
let initializer = document.querySelector(".complete");
let winnerText = document.createElement("div");
let list = document.createElement("ul");
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");

let funct = () => {
  setInterval(getNames, 1000);
};

let dismiss = () => {
  winnerDisp.classList.toggle("hidden");
};

let getNames = () => {
  p1Name = window.localStorage.getItem("p1Name");
  p2Name = window.localStorage.getItem("p2Name");
  document.querySelector("#p1Name").innerText = `${p1Name}:`;

  document.querySelector("#p2Name").innerText = `${p2Name}:`;

  getScores();
};

let getScores = () => {
  document.querySelector("#p1Score").innerText = p1Score;
  document.querySelector("#p2Score").innerText = p2Score;
};

//Win Conditions
let winner = (player) => {
  if (player === "x") {
    winnerText.innerText = `${p1Name} wins`;
    winnerDisp.prepend(winnerText);
    winnerDisp.classList.toggle("hidden");
    dispMove = moveCounter;
    p1Score++;
    getScores();
    enablestates();
  } else {
    winnerText.innerText = `${p2Name} wins`;
    winnerDisp.prepend(winnerText);
    winnerDisp.classList.toggle("hidden");
    dispMove = moveCounter;
    p2Score++;
    getScores();
    enablestates();
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
  } else if (
    c1 !== "" &&
    c2 !== "" &&
    c3 !== "" &&
    c4 !== "" &&
    c5 !== "" &&
    c6 !== "" &&
    c7 !== "" &&
    c8 !== "" &&
    c9 !== ""
  ) {
    winnerText.innerText = `It's a draw`;
    winnerDisp.prepend(winnerText);
    winnerDisp.classList.toggle("hidden");
    done = true;
    dispMove = moveCounter;
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
      storeHistory(boardState);
      console.log(boardHistory);
      moveList(flag, id, moveCounter);
      p1Status.classList.toggle("active");
      p2Status.classList.toggle("active");
      boardUpdate();
      winnerCheck("x");
    } else {
      boardState[a][b] = "o";
      flag = !flag;
      moveCounter++;
      storeHistory(boardState);
      console.log(boardHistory);
      moveList(flag, id, moveCounter);
      p1Status.classList.toggle("active");
      p2Status.classList.toggle("active");
      boardUpdate();
      winnerCheck("o");
    }
  } else {
    return;
  }
};

//board history
let storeHistory = (state) => {
  let stringMove = JSON.stringify(state);
  let arrMove = JSON.parse(stringMove);
  boardHistory[moveCounter - 1] = arrMove;
};

let toStringMove = (id) => {
  if (id === "0,0") {
    moveString = "top left";
    return moveString;
  }
  if (id === "0,1") {
    moveString = "top center";
    return moveString;
  }
  if (id === "0,2") {
    moveString = "top right";
    return moveString;
  }
  if (id === "1,0") {
    moveString = "mid left";
    return moveString;
  }
  if (id === "1,1") {
    moveString = "center";
    return moveString;
  }
  if (id === "1,2") {
    moveString = "mid right";
    return moveString;
  }
  if (id === "2,0") {
    moveString = "bottom left";
    return moveString;
  }
  if (id === "2,1") {
    moveString = "bottom center";
    return moveString;
  }
  if (id === "2,2") {
    moveString = "bottom right";
    return moveString;
  }
};

let moveList = (flag, id, moveCounter) => {
  let historyWrapper = document.querySelector(".moveHistory");
  let move = document.createElement("li");
  player = flag ? p1Name : p2Name;
  toStringMove(id);
  move.innerText = `${moveCounter}: ${player} to ${moveString}`;
  list.appendChild(move);
  historyWrapper.appendChild(list);
};

let showHideHistory = () => {
  let history = document.querySelector(".moveHistory");
  history.classList.toggle("min");
};

let prevState = () => {
  if (done === false) {
    return;
  }
  if (dispMove <= 1) {
    return;
  }
  dispMove--;
  let stringBoard = JSON.stringify(boardHistory[dispMove - 1]);
  let arrBoard = JSON.parse(stringBoard);
  boardState = arrBoard;
  boardUpdate();
  if (dispMove <= 1) {
    prevButton.classList.toggle("disabled");
  }
};

let nextState = () => {
  if (done === false) {
    return;
  }
  if (dispMove === boardHistory.length || dispMove === 0) {
    return;
  }
  dispMove++;
  let stringBoard = JSON.stringify(boardHistory[dispMove - 1]);
  let arrBoard = JSON.parse(stringBoard);
  boardState = arrBoard;
  boardUpdate();
  if (dispMove === boardHistory.length) {
    nextButton.classList.toggle("disabled");
  }
};

let enablestates = () => {
  prevButton.classList.toggle("disabled");
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
  list.innerHTML = "";
  dispMove = 0;
  moveCounter = 0;
  boardHistory = [];
};

let resetAll = () => {
  boardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  boardHistory = [];
  window.localStorage.clear();
  startScreen.classList.toggle("hidden");
  gameScreen.classList.toggle("hidden");
  p1Score = 0;
  p2Score = 0;
  dispMove = 0;
  moveCounter = 0;
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

document.querySelector(".home").addEventListener("click", function () {
  resetAll();
});

document
  .querySelector("#historyMin")
  .addEventListener("click", showHideHistory);

dispDismiss.addEventListener("click", dismiss);

prevButton.addEventListener("click", prevState);

nextButton.addEventListener("click", nextState);

funct();
