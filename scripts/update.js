import { updateGround } from "../ground.js";
import { updatePlayer } from "../player.js";
import { updateCactus } from "../cactus.js";
import { updateApple } from "./apple.js";
import { updateScore, handleLose, collectApple, checkApple, checkLose } from "../script.js";

let pause = false;
const speed = 0.04
const speedScale = 1
const SPEED_SCALE_INCREASE = 0.0000; // Rate of player speed increase // Works with updateSpeedScale()
let environment = 1

export function pauseUpdate(){
    pause = true
}

export function unPauseUpdate(){
    pause = false
}

// FRAMERATE LOOP SETUP //
let lastTime = null;
export function update(time) {
  console.log("here")
  if(!pause) {
    
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
      updateCactus(delta, speed, speedScale, environment);
      updateApple(delta, speed, speedScale);
      // updateSpeedScale(delta);
      updateScore(delta);
      if (checkLose()) return handleLose(); // if checkLose is true then end the game
      if (checkApple()) collectApple();
  
      lastTime = time;
  }
  else {
    lastTime = time // keeps refreshing lastTime so deltaTime doesn't think pause is a framerate drop (causes huge time jumps)
  }   

  window.requestAnimationFrame(update); // calls itself infinitly to create framerate loop
}