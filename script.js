// Working on cleaning up this file,
// the process was very experimental so I havent been able to move functions to their own files yet

import { resetGround, showGround, hideGround } from "./scripts/ground.js";
import {
  setupPlayer,
  getPlayerRect,
  setPlayerLose,
  showPlayer,
  onJump,
} from "./scripts/player.js";
// import { setupCactus, getCactusRects } from "./scripts/cactus.js";
// import { setupApple, getAppleRects, collect } from "./scripts/apple.js";
import {
  playTitleSong,
  stopTitleSong,
  playRunSong,
  stopRunSong,
} from "./scripts/audioManager.js";
import {
  update,
  pauseUpdate,
  unPauseUpdate,
  updateEnvironment,
} from "./scripts/update.js";
import {
  setupObstacles,
  getAppleRects,
  getCactusRects,
  collect,
  createCactus,
  createApple,
} from "./scripts/obstacle.js";

/////////////////////
//   WORLD SETUP   //
/////////////////////
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 65;
document.documentElement.style.setProperty(
  "--doc-height",
  `${window.innerHeight}px`
);

let gameGoing = false; // used to prevent misclicks in handleStart(), handleLose(), and pause()
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
};

//   SPEED AND SCORE   //
let score = 0;
let highScore = 0;

setPixelToWorldScale();

//   EVENT LISTENERS   //
window.addEventListener("resize", setPixelToWorldScale);
export function addStartGameInputListeners() {
  document.addEventListener("keydown", handleFirstInput, { once: true }); // On key down: start game: only do once
  document.addEventListener("mousedown", handleFirstInput, { once: true }); // On key down: start game: only do once
  const button = document.getElementById("sound-toggle");
}
addStartGameInputListeners();

function addPlayerInputListeners() {
  document.removeEventListener("keydown", handleGameInput); // this removes any extra eventListeners from the game before we add a new one
  document.removeEventListener("mousedown", handleGameInput);
  document.addEventListener("keydown", handleGameInput); // this adds a listener to the player that waits for any key press, then it executes the onJump function
  document.addEventListener("mousedown", handleGameInput); // this adds a listener to the player that waits for click, then it executes the onJump function
}

window.onblur = () => pauseGame(); // pause game when player leaves screen

// Handles Start Game Input (eventually hopefully all input)
export function handleFirstInput(event) {
  if (event.code !== "Space" && event.button !== 0) {
    addStartGameInputListeners();
    return;
  } else if (!firstClick) setupGame();
  else handleGameStart();
}

function handleGameInput(event) {
  if (event.code !== "Space" && event.code !== "Escape" && event.button !== 0)
    return;

  if (pause) {
    unpauseGame();
    return;
  }

  if (event.code === "Escape") {
    if (pause) unpauseGame();
    else pauseGame();
    return;
  }

  // handleStart might go here with gameGoing variable:
  //if gameGoing => onJump
  //else => handleStart

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
    elements.preGameScreen.forEach((item) => item.remove()); // get rid of title
    elements.startScreenElem.classList.remove("hide"); // show the title screen
    playTitleSong();
    showPlayer(); // show player
    showGround(); // show scene
    addStartGameInputListeners();
    document.body.classList.add("outside"); // change background color
    firstClick = true;
  }
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!gameGoing) {
    showGround(); // removes "hide" class
    gameGoing = true;
    score = 0;
    applesCollected = 0;

    stopTitleSong();
    playRunSong();

    let fontColor = "Yellow";

    document.body.classList.remove("black-screen");

    fontColor = "Yellow";
    document.body.classList.add("outside");

    elements.scoreElem.style.color = fontColor;

    addPlayerInputListeners();
    setupPlayer(environment);
    updateEnvironment(environment);
    setupObstacles();
    // setupApple();
    resetGround();
    updateScore();
    elements.scoreElem.classList.remove("hide");
    elements.startScreenElem.remove(); // removes "Press Space To Start" text
    elements.gameOverElem.classList.add("hide");
    window.requestAnimationFrame(update); // start infinite play loop
  }
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
  updateScore(); // update score UI
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

// INCREASE SCORE BASED ON DELTA TIME //
export function updateScore(delta) {
  score = applesCollected * 1000;
  if (score >= highScore) highScore = score;
  elements.scoreElem.textContent = `Score: ${~~score} | High Score: ${~~highScore}`;
}

// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite
  stopRunSong();
  hideGround();

  elements.gameOverElem.classList.remove("hide"); // show start screen again
  elements.scoreElem.classList.add("hide"); // hide score

  elements.gameOverElem.textContent = `Game Over
  \r\n\r\nScore: ${~~score} | High Score: ${~~highScore}
  \r\n\r\n\r\nTap Or Space To Start Again `;

  // change screen to solid color
  document.body.classList.remove("outside");
  document.body.classList.add("black-screen");

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    gameGoing = false;
    addStartGameInputListeners();
  }, 500);
}

function setPixelToWorldScale() {
  console.log("Resized");
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  elements.worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  elements.worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
