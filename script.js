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
} from "./scripts/obstacle.js";
import { updateIntroScene } from "./scripts/introScene.js";

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
let introSceneGoing = false;
let pause = false;
let introSceneDone = false;

let mainUIElem = document.querySelector("[data-main-ui]");

//   UI ELEMENTS   //
let elements = {
  worldElem: document.querySelector("[data-world]"),
  scoreElem: document.querySelectorAll("[data-score]"),
  preGameScreen: document.querySelectorAll("[data-start-screen]"),
};

//   SPEED AND SCORE   //
let score = 0;
let highScore = 0;

setPixelToWorldScale();

//   EVENT LISTENERS   //
window.addEventListener("resize", setPixelToWorldScale);

function addPlayerInputListeners() {
  document.addEventListener("keydown", handleAllInput); // this adds a listener to the player that waits for any key press, then it executes the onJump function
  document.addEventListener("mousedown", handleAllInput); // this adds a listener to the player that waits for click, then it executes the onJump function
}
addPlayerInputListeners();

window.onblur = () => pauseGame(); // pause game when player leaves screen


// Input Handler
let inputNum = 1;
export function handleAllInput(event) {
  if (event.code !== "Space" && event.code !== "Escape" && event.button !== 0)
    return;

  if (event.code === "Escape") {
    // remove gameGoing from other places
    if (!gameGoing) return;

    if (pause) unpauseGame();
    else pauseGame();
    return;
  }

  switch (inputNum) {
    case 0: // putting jump at 0 improves fps slightly
      playerJump()
      break;
    case 1:
      // start first scene/handleFirstInput()
      sequence1();
      break;
    case 2:
      sequence2();
      break;
    default:
      sequence3();
  }
}

function playerJump(){
  if(pause) unpauseGame()
  else if (gameGoing) onJump();
  else sequence3(); //jump if game going: else restart level
}

// Start Intro Scene
function sequence1(event) {
  introSceneGoing = true;
  startIntroScene();
  inputNum = 2;
}

//Skip first scene or setup first level
export function sequence2() {
  window.cancelAnimationFrame(updateIntroScene);
  setupGame();
  inputNum = 3;
}

// Restart/Load first level and get ready for jump input
function sequence3() {
  handleGameStart();
  inputNum = 0;
}

function pauseGame() {
  pause = true;

  mainUIElem.innerHTML = `
      <div class="pause-screen">
        <h2>Paused</h2><br><br>
        Tap Or Space To Unpause
      </div>
    `;
  stopRunSong();
  pauseUpdate();
}

function unpauseGame() {
  pause = false;
  mainUIElem.innerHTML = ``;
  playRunSong();
  unPauseUpdate();
}

function startIntroScene() {
  console.log("startIntroScene");
  playTitleSong();
  updateIntroScene();
}

// Removes Black Screen And Reveals Game
export function setupGame() {
  if (!firstClick) {
    elements.preGameScreen.forEach((item) => item.remove()); // get rid of all title element
    elements.worldElem.classList.remove("hide");
    mainUIElem.innerHTML = `
    <div class="home-screen">
      <div class="blink_me">Tap Or Space To Jump</div>
    </div>
    `;

    showPlayer(); // show player
    showGround(); // show scene
    //addStartGameInputListeners();
    document.body.classList.add("hallway"); // change background color
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

    let fontColor = "White";
    document.body.classList.remove("black-screen");
    document.body.classList.add("hallway");
    elements.scoreElem.forEach(item => item.style.color = fontColor);

    //addPlayerInputListeners();
    setupPlayer(environment);
    updateEnvironment(environment);
    setupObstacles();
    // setupApple();
    resetGround();
    updateScore();
    elements.scoreElem.forEach(item => item.classList.remove("hide"));
    mainUIElem.innerHTML = "";
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
  elements.scoreElem[0].textContent = `Score: ${~~score}`;
  elements.scoreElem[1].textContent = `High Score: ${~~highScore}`;
}

// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite
  stopRunSong();
  hideGround();

  elements.scoreElem.forEach(item => item.classList.add("hide"));

  mainUIElem.innerHTML = `
    <div class="game-over-screen"">
      \nScore: ${~~score}
      \nHigh Score: ${~~highScore}
      \n\n\n\n<h1>GAME OVER!</h1>
      \n\n\n\n\n\n\n\n<div class="blink_me">Tap Or Space To Play Again</div>
    </div>
  `;

  // change screen to solid color
  document.body.classList.remove("hallway");
  document.body.classList.add("black-screen");

  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    gameGoing = false;
    //addStartGameInputListeners();
  }, 300);
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
