// handles most game functions

import { playRunSong, stopRunSong } from "./audioManager.js";
import { hideGround } from "./ground.js";
import { getCactusRects, getAppleRects, collect, gameOverObstacles } from "./obstacle.js";
import { onJump, getPlayerRect, setPlayerLose } from "./player.js";
import { pauseUpdate, unPauseUpdate } from "./update.js";
import { windowElements, variableHolder } from "./variableHandler.js";
import { sequence4 } from "./gameSetup.js";


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
        <h2>Paused</h2><br><br>
        Tap Or Space To Unpause
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

export function collectApple() {
  variableHolder.applesCollected += 1;

  updateScore(); // update score UI
  collect(); // remove apple
}

// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite
  stopRunSong();
  hideGround();
  gameOverObstacles();

  windowElements.mainUIElem.innerHTML = `
    <div class="game-over-screen">
      <h1 style="color:#EC472B; font-size: 5vh; margin-left: 1vw; margin-bottom: -1vh">GAME OVER!</h1>
      <div class="row">
        <div class="column">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>
        <div class="column">BRUMB<br>CHLOE<br>JNTHN<br>DOOLS<br>PHOEB<br>TREYY<br>ALEXS<br>COOKI<br>URIBE<br>NICCO</div>
        <div class="column">23,000<br>22,000<br>20,000<br>19,000<br>18,000<br>18,000<br>17,000<br>16,000<br>15,000<br>14,000</div>
      </div>
      <div style="line-height:80%; margin-top: -6vh">
          <center>(Placeholder Leaderboard)</center>
          <div class="text-blink" style="color:#CEFFDE">HIT SPACEBAR TO PLAY AGAIN</div>
          <a
            href="https://brandnewschool.com/"
            class="clickable"
            style="font-size: 1.8vh"
            >VISIT OLD SITE
          </a>
      </div>
    </div>
  `;

  // change screen to solid color
  document.body.classList.remove("hallway");
  document.body.classList.add("black-screen");

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    variableHolder.gameGoing = false;
  }, 300);
}

export function updateScore() {
  variableHolder.score = variableHolder.applesCollected * 1000;
  const score = variableHolder.score;
  if (score >= variableHolder.highScore) variableHolder.highScore = score;
  windowElements.scoreElem[0].textContent = `Score ${~~score}`;
  windowElements.scoreElem[1].textContent = `High Score ${~~variableHolder.highScore}`;
}