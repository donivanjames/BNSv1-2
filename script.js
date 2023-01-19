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
import { setupPet } from "./scripts/pet.js";
import {
  playTitleSong,
  stopTitleSong,
  playRunSong,
  stopRunSong,
  soundToggle,
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
import { updateIntroScene, skipIntro } from "./scripts/introScene.js";


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
let pause = false;

//   UI ELEMENTS   //
const mainUIElem = document.querySelector("[data-main-ui]");
const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelectorAll("[data-score]");
const preGameScreen = document.querySelectorAll("[data-start-screen]");
const soundButton = document.querySelector("[data-sound-toggle]")

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
soundButton.addEventListener("click", () => soundToggle(soundButton))


// Input Handler
let inputNum = 1;
export function handleAllInput(event) {
  if(event.target.classList.contains("button")) return

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
      playerJump();
      break;
    case 1:
      // start first scene/handleFirstInput()
      sequence1();
      break;
      case 2:
        sequence2()
        break;
    case 3:
      sequence3();
      break;
    default:
      sequence4();
  }
}

function playerJump() {
  if (pause) unpauseGame();
  else if (gameGoing) onJump();
  else sequence4(); //jump if game going: else restart level
}

// Start Intro Scene
function sequence1(event) {
  startIntroScene();
  inputNum = 2;
}

// Skip intro scene
function sequence2(){
  skipIntro()
}

//Skip first scene or setup first level
export function sequence3() {
  window.cancelAnimationFrame(updateIntroScene);
  setupGame();
  inputNum = 4;
}

// Restart/Load first level and get ready for jump input
function sequence4() {
  handleGameStart();
  inputNum = 0;
}

function pauseGame() {
  if (!gameGoing) return;
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

  showPlayer(); // show player
  showGround(); // show scene
  //addStartGameInputListeners();
  document.body.classList.add("hallway"); // change background color
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
    scoreElem.forEach((item) => (item.style.color = fontColor));

    //addPlayerInputListeners();
    setupPlayer(environment);
    updateEnvironment(environment);
    setupObstacles();
    // setupApple();
    resetGround();
    updateScore();
    scoreElem.forEach((item) => item.classList.remove("hide"));
    mainUIElem.innerHTML = "";
    window.requestAnimationFrame(update); // start infinite play loop
  }
}

// CHECK FOR GAME OVER
export function checkLose() {
  const playerRect = getPlayerRect();
  // if any of the obstacles are touching the player: lose the game
  return getCactusRects().some((rect) => isCollision(rect, playerRect)); 
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
  if(rect1) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
  }
}

// INCREASE SCORE BASED ON DELTA TIME //
export function updateScore(delta) {
  score = applesCollected * 1000;
  if (score >= highScore) highScore = score;
  scoreElem[0].textContent = `Score: ${~~score}`;
  scoreElem[1].textContent = `High Score: ${~~highScore}`;
}

// HANDLE LOSE
export function handleLose() {
  setPlayerLose(); // set player to losing sprite
  stopRunSong();
  hideGround();

  scoreElem.forEach((item) => item.classList.add("hide"));

  mainUIElem.innerHTML = `
    <div class="game-over-screen"">
      \nScore: ${~~score}
      \nHigh Score: ${~~highScore}
      \n\n\n\n<h1>GAME OVER!</h1>
      \n\n\n\n\n\n\n\n<div class="text-blink">Tap Or Space To Play Again</div>
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
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
