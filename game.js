let activeBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let flag = true;
let done = false;
let p1Score = 0,
  p2Score = 0;
let p1Name, p2Name, a, b;

let b1 = document.querySelector(".b1");
let b2 = document.querySelector(".b2");
let b3 = document.querySelector(".b3");
let b4 = document.querySelector(".b4");
let b5 = document.querySelector(".b5");
let b6 = document.querySelector(".b6");
let b7 = document.querySelector(".b7");
let b8 = document.querySelector(".b8");
let b9 = document.querySelector(".b9");

let converter = (id) => {
  if (id === "b1" || id === "b2" || id === "b3") {
    a = 0;
  } else if (id === "b4" || id === "b5" || id === "b6") {
    a = 1;
  } else {
    a = 2;
  }
  if (id === "b1" || id === "b4" || id === "b7") {
    b = 0;
  } else if (id === "b2" || id === "b5" || id === "b8") {
    b = 1;
  } else {
    b = 2;
  }
};

let xORo = (cell) => {
  if (cell === "x") {
    return "cross";
  } else if (cell === "o") {
    return "circle";
  }
};

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
  let [[c1, c2, c3], [c4, c5, c6], [c7, c8, c9]] = activeBoard;
  for (i = 0; i < 3; i++) {
    if (
      activeBoard[i][0] !== "" &&
      activeBoard[i][0] === activeBoard[i][1] &&
      activeBoard[i][1] === activeBoard[i][2]
    ) {
      winner(player);
      done = true;
      return;
    }
  }
  for (j = 0; j < 3; j++) {
    if (
      activeBoard[0][j] !== "" &&
      activeBoard[0][j] === activeBoard[1][j] &&
      activeBoard[1][j] === activeBoard[2][j]
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
    window.alert("Draw");
    done = true;
    return;
  }
};

let turn = (cell, id) => {
  converter(id);
  if (activeBoard[a][b] === "" && done === false) {
    if (flag === true) {
      activeBoard[a][b] = "x";
      flag = !flag;
      cell.classList.toggle("cross");
      winnerCheck("x");
    } else {
      activeBoard[a][b] = "o";
      flag = !flag;
      cell.classList.toggle("circle");
      winnerCheck("o");
    }
  } else {
    return;
  }
};

let reset = () => {
  activeBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  done = false;
  b1.classList.remove("cross", "circle");
  b2.classList.remove("cross", "circle");
  b3.classList.remove("cross", "circle");
  b4.classList.remove("cross", "circle");
  b6.classList.remove("cross", "circle");
  b5.classList.remove("cross", "circle");
  b7.classList.remove("cross", "circle");
  b8.classList.remove("cross", "circle");
  b9.classList.remove("cross", "circle");
};

b1.addEventListener("click", function () {
  turn(b1, b1.id);
  console.log("click");
});
b2.addEventListener("click", function () {
  turn(b2, b2.id);
});
b3.addEventListener("click", function () {
  turn(b3, b3.id);
  console.log("click");
});
b4.addEventListener("click", function () {
  turn(b4, b4.id);
});
b5.addEventListener("click", function () {
  turn(b5, b5.id);
});
b6.addEventListener("click", function () {
  turn(b6, b6.id);
});
b7.addEventListener("click", function () {
  turn(b7, b7.id);
});
b8.addEventListener("click", function () {
  turn(b8, b8.id);
});
b9.addEventListener("click", function () {
  turn(b9, b9.id);
});
document.querySelector(".reset").addEventListener("click", function () {
  reset();
});
