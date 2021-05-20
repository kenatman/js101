//DOM
const playBtn = document.querySelector(`.playBtn`);
const timer = document.querySelector(`.timer`);
const counter = document.querySelector(`.counter`);
const field = document.querySelector(`.field`);
const resultContainer = document.querySelector(`.resultContainer`);
const resultBtn = document.querySelector(`.resultContainer__Btn`);
const resultTitle = document.querySelector(`.resultContainer__title`);
const carrots = document.querySelectorAll(`.carrot`);
const bugs = document.querySelectorAll(`.bug`);

//Audio
const bg = new Audio(`./sound/bg.mp3`);
const alert = new Audio(`./sound/alert.wav`);
const bugPull = new Audio(`./sound/bug_pull.mp3`);
const carrotPull = new Audio(`./sound/carrot_pull.mp3`);
const gameWin = new Audio(`./sound/game_win.mp3`);

let metaTime;
let timeLeft = 10;

function gameOver() {
  bg.pause();
  alert.play();
  clearInterval(metaTime);
  resultContainer.style.visibility = `initial`;
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) {
    timer.innerText = timeLeft;
  } else {
    gameOver();
  }
}

function positionCarrots() {
  for (let i = 0; i < 10; i++) {
    carrots[i].style.transform = `translate(${Math.floor(
      Math.random() * 570
    )}px, ${Math.floor(Math.random() * 120)}px)`;
  }

  for (let j = 0; j < 7; j++) {
    bugs[j].style.transform = `translate(${Math.floor(
      Math.random() * 570
    )}px, ${Math.floor(Math.random() * 120)}px)`;
  }
}

function startGame() {
  bg.play();
  playBtn.innerText = `◼️`;
  playBtn.removeEventListener("click", startGame);
  playBtn.addEventListener("click", gameOver);
  field.style.display = `initial`;
  metaTime = setInterval(updateTimer, 1000);
  updateTimer();
}

function refreshGame() {
  sessionStorage.setItem("reloading", "true");
  location.reload();
}

function countCarrot() {
  const count = field.childElementCount - 7;
  counter.innerText = count;
  if (count === 0) {
    gameWin.play();
    resultTitle.innerText = `YOU WIN!!!`;
    gameOver();
  }
}

function clickCarrot(e) {
  const { id } = e.target.dataset;
  if (id === `carrot`) {
    const li = e.target.parentNode;
    li.remove();
    carrotPull.play();
    countCarrot();
  }
}

function clickBug(e) {
  const { id } = e.target.dataset;
  if (id === `bug`) {
    bugPull.play();
    gameOver();
  }
}

function init() {
  positionCarrots();
  playBtn.addEventListener("click", startGame);
  resultBtn.addEventListener("click", refreshGame);
  field.addEventListener("click", clickBug);
  field.addEventListener("click", clickCarrot);
  window.onload = () => {
    const reloading = sessionStorage.getItem("reloading");
    if (reloading) {
      sessionStorage.removeItem("reloading");
      startGame();
    }
  };
}

init();
