`use strict`;

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

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
      sound.playAlert();
      break;
    case Reason.win:
      message = `You Win 🎉`;
      sound.playWin();
      break;
    case Reason.lose:
      message = `You Lose 💩`;
      sound.playBug();
      break;
    default:
      throw new Error(`ERROR`);
  }
  gameFinishBanner.showWithText(message);
});
