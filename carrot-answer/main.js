`use strict`;

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(`.game__field`);
const fieldRect = field.getBoundingClientRect();
const gameeBtn = document.querySelector(`.game__button`);
const gameTimer = document.querySelector(`.game__timer`);
const gameScore = document.querySelector(`.game__score`);

let started = false;
let score = 0;
let tiemer = undefined;

gameeBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showTimerAndScore() {
  gameTimer.style.visibility = `visible`;
  gameScore.style.visibility = `visible`;
}

function showStopButton() {
  const icon = gameeBtn.querySelector(`.fa-play`);
  icon.classList.add(`fa-stop`);
  icon.classList.remove(`fa-play`);
}

function stopGame() {}

function initGame() {
  //벌레와 당근을 생성한 뒤, field에 넣어준다.
  field.innerHTML = ``;
  addItem(`carrot`, CARROT_COUNT, `img/carrot.png`);
  addItem(`bug`, BUG_COUNT, `img/bug.png`);
  gameScore.ineerText = CARROT_COUNT;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement(`img`);
    item.setAttribute(`class`, className);
    item.setAttribute(`src`, imgPath);
    item.style.position = `absolute`;
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    field.appendChild(item);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
