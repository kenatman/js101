`use strict`;

import PopUp from "./popup.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(3, 2, 2);
game.setGameListener((cb) => {
  console.log(cb);
  let message;
  switch (cb) {
    case `cancel`:
      message = `Replay❓`;
      break;
    case `win`:
      message = `You Win 🎉`;
      break;
    case `lose`:
      message = `You Lose 💩`;
      break;
    default:
      throw new Error(`ERROR`);
  }
  gameFinishBanner.showWithText(message);
});
