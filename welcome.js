let p1 = "Player 1";
let p2 = "Player 2";

let gameStartButton = document.querySelector(".complete");
let startScreen = document.querySelector(".nameInput");
let gameScreen = document.querySelector(".gameWrapper");

let gameInitialize = () => {
  p1 = document.querySelector("#p1Input").value;
  p2 = document.querySelector("#p2Input").value;
  if (
    window.localStorage.getItem("p1Name") === null ||
    window.localStorage.getItem("p1Name") === ""
  ) {
    window.localStorage.setItem("p1Name", p1);
  }
  if (
    window.localStorage.getItem("p2Name") === null ||
    window.localStorage.getItem("p2Name") === ""
  ) {
    window.localStorage.setItem("p2Name", p2);
  }
  startScreen.classList.toggle("hidden");
  gameScreen.classList.toggle("hidden");
};

let nameCheck = () => {
  if (
    window.localStorage.getItem("p1Name") === "" ||
    (window.localStorage.getItem("p1Name") === null &&
      window.localStorage.getItem("p2Name") === "") ||
    window.localStorage.getItem("p2Name") === null
  ) {
    return;
  } else {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  }
};

gameStartButton.addEventListener("click", function () {
  gameInitialize();
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    gameInitialize();
  }
});

nameCheck();
