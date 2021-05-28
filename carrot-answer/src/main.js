`use strict`;

import PopUp from "./popup.js";
import GameBuilder from "./game.js";

const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(() => {
  game.start();
});

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
