// handles the setup functions of the game

import { skipIntro, updateIntroScene, horizontalScreen } from "./introScene.js";
import {
  playTitleSong,
  stopTitleSong,
  playRunSong,
  stopGameOverSong,
} from "./audioManager.js";
import { showGround, resetGround } from "./ground.js";
import { setupObstacles } from "./obstacle.js";
import { showPet, setupPet } from "./pet.js";
import { showPlayer, setupPlayer } from "./player.js";
import { update } from "./update.js";
import {
  resetVariables,
  variableHolder,
  windowElements,
} from "./variableHandler.js";
import { updateScore } from "./gameHandler.js";
import { resetLeaderboardLimiter } from "./leaderboard.js";

// Start Intro Scene
export function sequence1() {
  if (window.innerWidth < 1000) skipIntro();
  else {
    startIntroScene();
    variableHolder.inputNum = 2;
  }
}

// Skip intro scene
export function sequence2() {
  skipIntro();
}

// Skip first scene or setup first level
export function sequence3() {
  window.cancelAnimationFrame(updateIntroScene);
  setupGame();
  variableHolder.inputNum = 4;
}

// Restart/Load first level and get ready for jump input
export function sequence4() {
  handleGameStart();
  variableHolder.inputNum = 0;
}

function startIntroScene() {
  playTitleSong();
  updateIntroScene();
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  stopTitleSong();
  windowElements.preGameScreen.forEach((item) => item.remove()); // get rid of all title element
  windowElements.worldElem.classList.remove("hide");
  windowElements.mainUIElem.innerHTML = `<div class="home-screen space-to-start text-blink">SPACEBAR TO JUMP</div>`;
  document.body.style.backgroundColor = "#BF92FF";

  windowElements.scoreElem.forEach((item) => item.classList.remove("hide"));
  showPlayer(); // show player
  showPet();
  showGround(); // show scene
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!variableHolder.gameGoing) {
    resetVariables();
    showGround(); // removes "hide" class
    variableHolder.gameGoing = true;
    resetLeaderboardLimiter();

    stopTitleSong();
    stopGameOverSong();
    playRunSong();

    windowElements.scoreElem.forEach((item) => item.classList.remove("hide"));

    setupPlayer();
    setupPet();
    setupObstacles();
    resetGround();
    updateScore();
    windowElements.mainUIElem.innerHTML = "";
    window.requestAnimationFrame(update); // start infinite play loop
  }
}
