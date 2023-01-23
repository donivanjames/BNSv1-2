// handles the setup functions of the game

import { startIntroScene, skipIntro, updateIntroScene } from "./introScene";
import { playTitleSong, stopTitleSong } from "./audioManager";
import { showGround, resetGround } from "./ground";
import { setupObstacles } from "./obstacle";
import { showPet, setupPet } from "./pet";
import { showPlayer, setupPlayer } from "./player";
import { update } from "./update";
import { resetVariables } from "./variableHandler";

// Start Intro Scene
export function sequence1() {
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