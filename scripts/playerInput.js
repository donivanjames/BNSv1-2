// Handles All Player Input

import {
  sequence1,
  sequence2,
  sequence3,
  sequence4,
  playerJump,
  pauseGame,
  unpauseGame,
  inputNum
} from "./gameHandler.js";

export function handleAllInput(event) {
  if (event.target.classList.contains("clickable")) return;

  if (event.code !== "Space" && event.code !== "Escape" && event.button !== 0)
    return;

  if (event.code === "Escape") {
    if (!gameGoing) return;

    if (pause) unpauseGame();
    else pauseGame();
    return;
  }

  switch (inputNum) {
    case 0: // putting jump at 0 improves fps slightly
      playerJump();
      break;
    case 1:
      // start first scene/handleFirstInput()
      sequence1();
      break;
    case 2:
      sequence2();
      break;
    case 3:
      sequence3();
      break;
    default:
      sequence4();
  }
}
