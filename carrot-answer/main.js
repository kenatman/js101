`use strict`;

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(`.game__field`);
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(`.game__button`);
const gameTimer = document.querySelector(`.game__timer`);
const gameScore = document.querySelector(`.game__score`);
const popUp = document.querySelector(`.pop-up`);
const popUpRefresh = document.querySelector(`.pop-up__refresh`);
const popUpText = document.querySelector(`.pop-up__message`);

const carrotSound = new Audio(`./sound/carrot_pull.mp3`);
const alertSound = new Audio(`./sound/alert.wav`);
const bgSound = new Audio(`./sound/bg.mp3`);
const bugSound = new Audio(`./sound/bug_pull.mp3`);
const winSound = new Audio(`./sound/game_win.mp3`);

let started = false;
let score = 0;
let tiemer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText(`Replay❓`);
  stopSound(bgSound);
  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? `You Win 🎉` : `You Lose 💩`);
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
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
  const icon = gameBtn.querySelector(`.fas`);
  icon.classList.add(`fa-stop`);
  icon.classList.remove(`fa-play`);
  gameBtn.style.visibility = `visible`;
}

function hideGameButton() {
  gameBtn.style.visibility = `hidden`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove(`pop-up--hide`);
}

function hidePopUp() {
  popUp.classList.add(`pop-up--hide`);
}

function initGame() {
  //벌레와 당근을 생성한 뒤, field에 넣어준다.
  field.innerHTML = ``;
  score = 0;
  addItem(`carrot`, CARROT_COUNT, `img/carrot.png`);
  addItem(`bug`, BUG_COUNT, `img/bug.png`);
  gameScore.innerText = CARROT_COUNT;
}

function onFieldClick(e) {
  const target = e.target;
  if (!started) {
    return;
  }
  if (target.matches(`.carrot`)) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(`.bug`)) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
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
