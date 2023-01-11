// Working on cleaning up this file,
// the process was very experimental so I havent been able to move functions to their own files yet

import {
  changeGround,
  resetGround,
  showGround,
  hideGround,
} from "./scripts/ground.js";
import {
  setupPlayer,
  getPlayerRect,
  setPlayerLose,
  showPlayer,
  onJump,
} from "./scripts/player.js";
import { setupCactus, getCactusRects } from "./scripts/cactus.js";
import { setupApple, getAppleRects, collect } from "./scripts/apple.js";
import {
  playTitleSong,
  stopTitleSong,
  playRunSong,
  stopRunSong,
} from "./scripts/audioManager.js";
import { giveRandomFact } from "./scripts/BNS_Facts.js";
import { update, pauseUpdate, unPauseUpdate, updateEnvironment } from "./scripts/update.js";

/////////////////////
//   WORLD SETUP   //
/////////////////////
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 65;
document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
let gameGoing = false;
let applesCollected = 0;
let environment = 1;
let firstClick = false; // to set up first screen
let pause = false;


//   UI ELEMENTS   //
let elements = {
  worldElem: document.querySelector("[data-world]"),
  scoreElem: document.querySelector("[data-score]"),
  startScreenElem: document.querySelector("[data-title-screen]"),
  gameOverElem: document.querySelector("[data-game-over-screen]"),
  pauseElem: document.querySelector("[data-pause]"),
  preGameScreen: document.querySelectorAll("[data-start-screen]"),
  randomFact: document.querySelector("[data-fact]"),
};

//   SPEED AND SCORE   //
let score = 0;
let highScore = 0;
const speed = 0.04;
let speedScale = 1; // Gets multiplied by speed to increase player speed over time
const SPEED_SCALE_INCREASE = 0.0; // Rate of player speed increase // Works with updateSpeedScale()

setPixelToWorldScale();

//   EVENT LISTENERS   //
window.addEventListener("resize", setPixelToWorldScale);
export function addStartGameInputListeners() {
  document.addEventListener("keydown", handleFirstInput, { once: true }); // On key down: start game: only do once
  document.addEventListener("mousedown", handleFirstInput, { once: true }); // On key down: start game: only do once
  const button = document.getElementById('sound-toggle');
}
addStartGameInputListeners();

button.addEventListener('click', (event) => {
	soundToggle()
  button.blur()
})

function addPlayerInputListeners() {
  document.removeEventListener("keydown", handleGameInput); // this removes any extra eventListeners from the game before we add a new one
  document.removeEventListener("mousedown", handleGameInput); // this removes any extra eventListeners from the game before we add a new one
  document.addEventListener("keydown", handleGameInput); // this adds a listener to the player that waits for any key press, then it executes the onJump function
  document.addEventListener("mousedown", handleGameInput); // this adds a listener to the player that waits for click, then it executes the onJump function
}

window.onblur = function () {
  pauseGame();
};


// Handles Start Game Input (eventually hopefully all input)
export function handleFirstInput(event) {
  if (event.code !== "Space" && event.button !== 0) {
    addStartGameInputListeners();
    return;
  } else if (!firstClick) setupGame();
  else handleGameStart();
}

function handleGameInput(event) {
  if (event.code !== "Space" && event.code !== "Escape" && event.button !== 0) return;

  if (pause) {
    unpauseGame();
    return;
  }

  if (event.code === "Escape") {
    if (pause) unpauseGame();
    else pauseGame();
    return;
  }

  onJump();
}

function pauseGame() {
  if (gameGoing) {
    pause = true;
    stopRunSong();
    pauseUpdate();
    elements.pauseElem.classList.remove("hide");
  }
}

function unpauseGame() {
  pause = false;
  playRunSong();
  unPauseUpdate();
  elements.pauseElem.classList.add("hide");
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  if (!firstClick) {
    elements.preGameScreen.forEach(item => item.remove()) // get rid of title
    elements.startScreenElem.classList.remove("hide"); // add the other
    playTitleSong();
    showPlayer(); // show player
    showGround(); // show scene
    addStartGameInputListeners();
    document.body.classList.add("outside");
    firstClick = true;
  }
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!gameGoing) {
    showGround();
    gameGoing = true;
    speedScale = 1; // sets speedscale
    score = 0;
    applesCollected = 0;

    stopTitleSong();
    playRunSong();

    let fontColor = "Yellow";
    removeAllBodyStyles();
    switch (environment) {
      case 1: // Outside
        fontColor = "Yellow";
        document.body.classList.add("outside");
        break;
      case 2: // Hallway
        fontColor = "Red";
        document.body.classList.add("hallway");
        break;
      case 3: // Lab
        fontColor = "Yellow";
        document.body.classList.add("lab");
        break;
      case 4: // Library
        fontColor = "Yellow";
        document.body.classList.add("library");
        break;
      case 5: // Gym
        fontColor = "#C53A99";
        document.body.classList.add("gym");
        break;
    }

    elements.scoreElem.style.color = fontColor;

    //setupGround(environment); // places 2 starting ground pieces in order
    addPlayerInputListeners();
    setupPlayer(environment);
    updateEnvironment(environment);
    setupCactus();
    setupApple();
    resetGround();
    updateScore()
    elements.scoreElem.classList.remove("hide");
    elements.startScreenElem.remove(); // removes "Press Space To Start" text
    elements.gameOverElem.classList.add("hide");
    window.requestAnimationFrame(update); // start infinite play loop
  }
}

function chooseEnvironment() {
  //Randomly assigns one of the 5 environments
  environment = ~~(Math.random() * 5) + 1;
}

// CHECK FOR GAME OVER
export function checkLose() {
  const playerRect = getPlayerRect();
  return getCactusRects().some((rect) => isCollision(rect, playerRect)); // if any of the obstacles are touching the player: lose the game
}

// CHECK FOR GAME OVER
export function checkApple() {
  const playerRect = getPlayerRect();
  return getAppleRects().some((rect) => isCollision(rect, playerRect)); // if any of the apples touch player, add to score
}

export function collectApple() {
  applesCollected += 1; // add to score
  updateScore()
  collect(); // remove apple
}

// COLLISION CHECKER
function isCollision(rect1, rect2) {
  // return true if there is overlap on any of the sides of the objects
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

// SLOWLY INCREASE SPEED OVER TIME - NO LONGER SPEEDING UP GAME  //
// function updateSpeedScale(delta) {
//   speedScale += delta * SPEED_SCALE_INCREASE;
// }

// INCREASE SCORE BASED ON DELTA TIME //
export function updateScore(delta) {
  // score += delta * 0.01 * (applesCollected * 0.1 + 1); // without +1 it sets score to 0 // OLD SCORE METHOD

  score = applesCollected * 1000
  if (score >= highScore) highScore = score;
  elements.scoreElem.textContent = `Score: ${~~score} | High Score: ${~~highScore}`;
}

// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite

  stopRunSong();

  hideGround();

  chooseEnvironment();
  changeGround(environment);
  elements.gameOverElem.classList.remove("hide"); // show start screen again
  elements.scoreElem.classList.add("hide");

  elements.gameOverElem.textContent = `Game Over
  \r\n\r\nScore: ${~~score} | High Score: ${~~highScore}
  \r\nApples Collected: ${applesCollected}
  \r\n\r\nTap Or Space To Start Again`;

  // Need To Change Score Font Color And Background CSS For Each Environment
  
  elements.randomFact.textContent = giveRandomFact();
  removeAllBodyStyles();
  document.body.classList.add("black");

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    gameGoing = false;
    addStartGameInputListeners();
  }, 200);
}

function removeAllBodyStyles() {
  document.body.classList.remove("black");
  document.body.classList.remove("outside");
  document.body.classList.remove("hallway");
  document.body.classList.remove("library");
  document.body.classList.remove("lab");
  document.body.classList.remove("gym");
}

// Get Ground Dimensions
const groundElem = document.querySelector("[data-ground]");
const getGroundHeight = () => groundElem.getBoundingClientRect().height;
const getGroundWidth = () => groundElem.getBoundingClientRect().width;
console.log("GroundHeight: ", getGroundHeight());
console.log("Groundwidth: ", getGroundWidth());

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  elements.worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  elements.worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
