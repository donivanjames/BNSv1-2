// Working on cleaning up this file,
// the process was very experimental so I havent been able to move functions to their own files yet

import {
  updateGround,
  changeGround,
  resetGround,
  showGround,
  hideGround,
} from "./ground.js";
import {
  updateDino,
  setupDino,
  getDinoRect,
  setDinoLose,
  showPlayer,
} from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";
import {
  updateApple,
  setupApple,
  getAppleRects,
  removeAllApples,
  collect,
} from "./apple.js";
import {
  playTitleSong,
  stopTitleSong,
  playRunSong,
  stopRunSong,
} from "./audioManager.js";
import { giveRandomFact } from "./BNS_Facts.js";

/////////////////////
//   WORLD SETUP   //
/////////////////////
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 65;
let gameGoing = false;
let applesCollected = 0;
let environment = 1;
let firstClick = false; // to set up first screen

//   UI ELEMENTS   //
let elements = {
  worldElem: document.querySelector("[data-world]"),
  scoreElem: document.querySelector("[data-score]"),
  startScreenElem: document.querySelector("[data-start-screen]"),
  gameOverElem: document.querySelector("[data-game-over-screen]"),
  preGameScreen: document.querySelector("[data-pregame-screen]"),
  randomFact: document.querySelector("[data-fact]"),
};

//   SPEED AND SCORE   //
let score = 0;
let highScore = 0;
let speedScale = 1; // Gets multiplied by speed to increase player speed over time
const SPEED_SCALE_INCREASE = 0.000005; // Rate of player speed increase // Works with updateSpeedScale()

setPixelToWorldScale();

//   EVENT LISTENERS   //
window.addEventListener("resize", setPixelToWorldScale);
export function addInputListeners() {
  console.log("Input");
  document.addEventListener("keydown", handleInput, { once: true }); // On key down: start game: only do once
  document.addEventListener("mousedown", handleInput, { once: true }); // On key down: start game: only do once
}
addInputListeners();

// Handles Start Game Input (eventually hopefully all input)
export function handleInput(event) {
  if (event.code != "Space" && event.button !== 0) {
    addInputListeners();
    return;
  } else if (!firstClick) setupGame();
  else handleGameStart();
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  console.log("Here");
  if (!firstClick) {
    elements.preGameScreen.classList.add("hide"); // get rid of title
    elements.startScreenElem.classList.remove("hide"); // add the other
    playTitleSong();
    showPlayer(); // show player
    showGround(); // show scene
    addInputListeners();
    firstClick = true;
  }
  console.log("End");
}

// HANDLES GAME START WHEN SPACE IS PRESSED
export function handleGameStart() {
  if (!gameGoing) {
    showGround();
    gameGoing = true;
    lastTime = null;
    speedScale = 1; // sets speedscale
    score = 0;
    applesCollected = 0;

    stopTitleSong();
    playRunSong();

    elements.randomFact.textContent = giveRandomFact();
    //setupGround(environment); // places 2 starting ground pieces in order
    setupDino(environment);
    setupCactus();
    setupApple();
    resetGround();
    elements.scoreElem.classList.remove("hide");
    elements.startScreenElem.classList.add("hide"); // hides "Press Space To Start" text
    elements.gameOverElem.classList.add("hide");

    window.requestAnimationFrame(update); // start infinite play loop
  }
}

function chooseEnvironment() {
  //Randomly assigns one of the 5 environments
  environment = Math.floor(Math.random() * 5) + 1;
}

// FRAMERATE LOOP SETUP //
let lastTime;
function update(time) {
  if (!document.hidden) {
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

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale, environment);
    updateApple(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkLose()) return handleLose(); // if checkLose is true then end the game
    if (checkApple()) collectApple();

    lastTime = time;
    window.requestAnimationFrame(update); // calls itself infinitly to create framerate loop
  }
}

// CHECK FOR GAME OVER
function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect)); // if any of the obstacles are touching the player: lose the game
}

// CHECK FOR GAME OVER
function checkApple() {
  const dinoRect = getDinoRect();
  return getAppleRects().some((rect) => isCollision(rect, dinoRect)); // if any of the apples touch player, add to score
}

function collectApple() {
  console.log("Apple Grabbed");
  // add to score
  applesCollected += 1;
  // remove apple
  collect();
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

// SLOWLY INCREASE SPEED OVER TIME   //
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

// INCREASE SCORE BASED ON DELTA TIME //
function updateScore(delta) {
  score += delta * 0.01 * (applesCollected * 0.1 + 1); // without +1 it sets score to 0
  if (score >= highScore) highScore = score;
  elements.scoreElem.textContent = `High Score: ${Math.floor(
    highScore
  )}  | Apple Bonus: ${applesCollected}0% |  Score: ${Math.floor(score)}`;
}

// HANDLE LOSE
function handleLose() {
  setDinoLose(); // set player to losing sprite

  stopRunSong();

  hideGround();

  chooseEnvironment();
  changeGround(environment);
  elements.gameOverElem.classList.remove("hide"); // show start screen again
  elements.scoreElem.classList.add("hide");

  elements.gameOverElem.textContent = `Game Over
  \r\n\r\nScore: ${Math.floor(score)} | High Score: ${Math.floor(highScore)}
  \r\nApples Collected: ${applesCollected}
  \r\n\r\nTap Or Space To Start Again`;

  // Need To Change Score Font Color For Each Environment
  let fontColor = "Yellow";
  switch (environment) {
    case 1: // Outside
    case 3: // Lab
    case 4: // Library
      fontColor = "Yellow";
      break;
    case 2: // School
      fontColor = "Red";
      break;
    case 5: // Gym
      fontColor = "#C53A99";
      break;
  }

  elements.scoreElem.style.color = fontColor;

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    gameGoing = false;
    addInputListeners();
  }, 200);
}

// Get Ground Dimensions
const groundElem = document.querySelector("[data-ground]");
const getGroundHeight = () => groundElem.getBoundingClientRect().height;
const getGroundWidth = () => groundElem.getBoundingClientRect().width;
console.log("GroundHeight: " + getGroundHeight());
console.log("Groundwidth: " + getGroundWidth());

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  elements.worldElem.style.width = `${
    (WORLD_WIDTH * worldToPixelScale) / 1.5
  }px`;
  elements.worldElem.style.height = `${
    (WORLD_HEIGHT * worldToPixelScale) / 1.5
  }px`;
}
