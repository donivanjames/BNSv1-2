// runs every frame 

import { updateGround } from "./ground.js";
import { updatePlayer } from "./player.js";
import { updatePet } from "./pet.js";
import { updateCactus } from "./obstacle.js";
import { variableHolder } from "./variableHandler.js";
import { checkLose, checkApple, collectApple, handleLose } from "./gameHandler.js";

const speed = 0.03;
const speedScale = 1;

export function pauseUpdate() {
  variableHolder.pause = true;
}

export function unPauseUpdate() {
  variableHolder.pause = false;
}

// FRAMERATE LOOP SETUP //
let lastTime = null;
export function update(time) {
  if (!variableHolder.pause) {
    // BEFORE GAME RUNS //

    // if lastTime is null then only call this block
    if (lastTime == null) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }

    // DURING GAME RUN //

    // Set deltatime for constant update speed regardless of framerate
    const delta = time - lastTime;

    updateGround(delta, speed, speedScale);
    updatePlayer(delta, speedScale);
    updatePet(delta);
    updateCactus(delta, speed, speedScale);
    lastTime = time;

    if (checkLose()) return handleLose(); // if checkLose is true then end the game
    if (checkApple()) collectApple();
  } else {
    lastTime = time; // keeps refreshing lastTime so deltaTime doesn't think pause is a framerate drop (causes huge time jumps)
  }

  window.requestAnimationFrame(update); // calls itself infinitly to create framerate loop
}
