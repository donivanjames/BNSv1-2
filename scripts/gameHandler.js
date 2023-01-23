
import { playTitleSong, stopTitleSong, playRunSong, stopRunSong } from "./audioManager.js";
import { showGround, resetGround } from "./ground.js";
import { updateIntroScene, skipIntro } from "./introScene.js";
import { setupObstacles } from "./obstacle.js";
import { showPet, setupPet } from "./pet.js";
import { showPlayer, setupPlayer, onJump } from "./player.js";
import { updateScore, } from "../script.js";
import { update, pauseUpdate, unPauseUpdate } from "./update.js";
import { windowElements, variableHolder, resetVariables } from "./variableHandler.js";

window.onblur = () => pauseGame(); // pause game when player leaves screen

export function playerJump() {
  if (variableHolder.pause) unpauseGame();
  else if (variableHolder.gameGoing) onJump();
  else sequence4(); //jump if game going: else restart level
}

// Start Intro Scene
export function sequence1(event) {
  startIntroScene();
  variableHolder.inputNum = 2;
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

function startIntroScene() {
  playTitleSong();
  updateIntroScene();
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  stopTitleSong();
  windowElements.preGameScreen.forEach((item) => item.remove()); // get rid of all title element
  windowElements.worldElem.classList.remove("hide");
  windowElements.mainUIElem.innerHTML = `
    <div class="home-screen">
      <div class="text-blink">Tap Or Space To Jump</div>
    </div>
    `;

  windowElements.scoreElem.forEach((item) => item.classList.remove("hide"));
  showPlayer(); // show player
  showPet();
  showGround(); // show scene
  document.body.classList.add("hallway"); // change background color
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!variableHolder.gameGoing) {
    
    resetVariables()
    showGround(); // removes "hide" class
    variableHolder.gameGoing = true;

    stopTitleSong();
    playRunSong();

    document.body.classList.remove("black-screen");
    document.body.classList.add("hallway");

    setupPlayer();
    setupPet();
    setupObstacles();
    resetGround();
    updateScore();
    windowElements.mainUIElem.innerHTML = "";
    window.requestAnimationFrame(update); // start infinite play loop
  }
}
