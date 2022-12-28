import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

/////////////////////
//   WORLD SETUP   //
/////////////////////
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 65;
let gameGoing = false;

//   UI ELEMENTS   //
const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

//   SPEED AND SCORE   //
let score = 0;
let speedScale = 1; // Gets multiplied by speed to increase player speed over time
const SPEED_SCALE_INCREASE = 0.00001; // Rate of player speed increase // Works with updateSpeedScale()

//   EVENT LISTENERS   //
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true }); // On key down: start game: only do once 
document.addEventListener("mousedown", handleStart, { once: true }); // On key down: start game: only do once

setPixelToWorldScale();


// FRAMERATE LOOP SETUP //
let lastTime;
function update(time) {
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
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose(); // if checkLose is true then end the game

  lastTime = time;
  window.requestAnimationFrame(update); // calls itself infinitly to create framerate loop
}

// CHECK FOR GAME OVER
function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect)); // if any of the obstacles are touching the player: lose the game
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

// INCREASE SCORE BASED ON DELTA TIME   //  
function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

// HANDLES GAME START WHEN SPACE IS PRESSED
function handleStart() {
  if(!gameGoing){
    gameGoing = true;
    lastTime = null;
    speedScale = 1; // sets speedscale
    score = 0;
  
    setupGround(); // places 2 starting ground pieces in order
    setupDino();
    setupCactus();
    startScreenElem.classList.add("hide"); // hides "Press Space To Start" text
  
    window.requestAnimationFrame(update); // start infinite play loop
  } 
}

// HANDLE LOSE
function handleLose() {
  setDinoLose(); // set player to losing sprite
  // timeout stops player from hitting space right when they lose
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true }); // on space: restart game
    document.addEventListener("mousedown", handleStart, { once: true }); // on space: restart game
    startScreenElem.classList.remove("hide"); // show start screen again
    gameGoing = false;
  }, 200);
}


const groundElem = document.querySelector("[data-ground]");
// temp variables:
function getGroundSize(){
  return groundElem.getBoundingClientRect().height;
}

console.log("Groundsize: " + getGroundSize())

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale / 1.5}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale / 1.5}px`;
}
