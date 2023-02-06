// handles most game functions

import { playRunSong, stopRunSong, playGameOverSong } from "./audioManager.js";
import { hideGround } from "./ground.js";
import {
  getCactusRects,
  getAppleRects,
  collect,
  gameOverObstacles,
} from "./obstacle.js";
import { onJump, getPlayerRect, setPlayerLose } from "./player.js";
import { pauseUpdate, unPauseUpdate } from "./update.js";
import { windowElements, variableHolder } from "./variableHandler.js";
import { sequence4 } from "./gameSetup.js";
import { returnLeaderboard, setupLeaderboard2 } from "./leaderboard.js";
import { leaderboardLimiter } from "./leaderboard.js";
import { horizontalScreen } from "./introScene.js";

window.onblur = () => pauseGame(); // pause game when player leaves screen

export function playerJump() {
  if (variableHolder.pause) unpauseGame();
  else if (variableHolder.gameGoing) onJump();
  else sequence4(); //jump if game going: else restart level
}

export function pauseGame() {
  if (!variableHolder.gameGoing) return;
  variableHolder.pause = true;

  windowElements.mainUIElem.innerHTML = `
      <div class="pause-screen">
        <h2>PAUSED</h2><br><br>
        SPACE TO UNPAUSE
      </div>
    `;
  stopRunSong();
  pauseUpdate();
}

export function unpauseGame() {
  variableHolder.pause = false;
  windowElements.mainUIElem.innerHTML = ``;
  playRunSong();
  unPauseUpdate();
}

// CHECK FOR GAME OVER
export function checkLose() {
  const playerRect = getPlayerRect();
  // if any of the obstacles are touching the player: lose the game
  return getCactusRects().some((rect) => isCollision(rect, playerRect));
}

export function checkApple() {
  const playerRect = getPlayerRect();
  return getAppleRects().some((rect) => isCollision(rect, playerRect)); // if any of the apples touch player, add to score
}

export function collectApple() {
  variableHolder.applesCollected += 1;

  updateScore(); // update score UI
  collect(); // remove apple
}

// COLLISION CHECKER
function isCollision(rect1, rect2) {
  // return true if there is overlap on any of the sides of the objects
  if (rect1) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
  }
}


// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite
  stopRunSong();
  hideGround();
  gameOverObstacles();

  setupLeaderboard2()
  windowElements.mainUIElem.innerHTML = returnLeaderboard();
  let focusedInput = null
  if(leaderboardLimiter == 1) focusedInput = document.getElementById("playerName")
  if(focusedInput) focusedInput.focus();

  // change screen to solid color
  document.body.classList.remove("hallway");
  document.body.classList.add("black-screen");
  if(!horizontalScreen)
    windowElements.scoreElem.forEach(item => item.classList.add("hide"))

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    variableHolder.gameGoing = false;
    playGameOverSong()
  }, 400);
}

export function updateScore() {
  variableHolder.score = variableHolder.applesCollected * 100;
  const score = variableHolder.score;
  if (score >= variableHolder.highScore || !variableHolder.highScore) variableHolder.highScore = score;
  windowElements.scoreElem[0].textContent = `SCORE ${~~score}`;
  windowElements.scoreElem[1].textContent = `HI SCORE ${~~variableHolder.highScore}`;
}
