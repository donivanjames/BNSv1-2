
import { playTitleSong, stopTitleSong, playRunSong, stopRunSong } from "./audioManager.js";
import { showGround, resetGround } from "./ground.js";
import { updateIntroScene, skipIntro } from "./introScene.js";
import { setupObstacles } from "./obstacle.js";
import { showPet, setupPet } from "./pet.js";
import { showPlayer, setupPlayer, onJump } from "./player.js";
import { updateScore, } from "../script.js";
import { update, pauseUpdate, unPauseUpdate } from "./update.js";
import { variableHolder, resetVariables } from "./variableHandler.js";

const worldElem = document.querySelector("[data-world]");
const mainUIElem = document.querySelector("[data-main-ui]");
const preGameScreen = document.querySelectorAll("[data-start-screen]");
const scoreElem = document.querySelectorAll("[data-score]");
export let inputNum = 1;

export let gameGoing = false; // used to prevent misclicks in handleStart(), handleLose(), and pause()
export const makeGameGoingFalse = () => gameGoing = false;


export function playerJump() {
  if (variableHolder.pause) unpauseGame();
  else if (gameGoing) onJump();
  else sequence4(); //jump if game going: else restart level
}

// Start Intro Scene
export function sequence1(event) {
  startIntroScene();
  inputNum = 2;
}

// Skip intro scene
export function sequence2() {
  skipIntro();
}

//Skip first scene or setup first level
export function sequence3() {
  window.cancelAnimationFrame(updateIntroScene);
  setupGame();
  inputNum = 4;
}

// Restart/Load first level and get ready for jump input
export function sequence4() {
  handleGameStart();
  inputNum = 0;
}

export function pauseGame() {
  if (!gameGoing) return;
  variableHolder.pause = true;

  mainUIElem.innerHTML = `
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
  mainUIElem.innerHTML = ``;
  playRunSong();
  unPauseUpdate();
}

function startIntroScene() {
  playTitleSong();
  updateIntroScene();
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  stopTitleSong();
  preGameScreen.forEach((item) => item.remove()); // get rid of all title element
  worldElem.classList.remove("hide");
  mainUIElem.innerHTML = `
    <div class="home-screen">
      <div class="text-blink">Tap Or Space To Jump</div>
    </div>
    `;

  scoreElem.forEach((item) => item.classList.remove("hide"));
  showPlayer(); // show player
  showPet();
  showGround(); // show scene
  //addStartGameInputListeners();
  document.body.classList.add("hallway"); // change background color
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!gameGoing) {
    showGround(); // removes "hide" class
    gameGoing = true;
    resetVariables()

    stopTitleSong();
    playRunSong();

    document.body.classList.remove("black-screen");
    document.body.classList.add("hallway");

    //addPlayerInputListeners();
    setupPlayer();
    setupPet();
    setupObstacles();
    // setupApple();
    resetGround();
    updateScore();
    mainUIElem.innerHTML = "";
    window.requestAnimationFrame(update); // start infinite play loop
  }
}
