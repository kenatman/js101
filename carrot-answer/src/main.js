`use strict`;

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";

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
    case Reason.cancel:
      message = `Replay❓`;
      break;
    case Reason.win:
      message = `You Win 🎉`;
      break;
    case Reason.lose:
      message = `You Lose 💩`;
      break;
    default:
      throw new Error(`ERROR`);
  }
  gameFinishBanner.showWithText(message);
});
