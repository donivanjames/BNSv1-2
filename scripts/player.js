// controls the player, like animation and jumping

import { getCustomProperty, setCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js";
import { jumpSound, loseSound } from "./audioManager.js";
import { wormJump, petDeath } from "./pet.js";
import { windowElements } from "./variableHandler.js";

const JUMP_HEIGHT = 0.32;
const GRAVITY = 0.0014;  // how heavy
const PLAYER_FRAME_COUNT = 7; // amount of run animation frames
const FRAME_TIME = 75; // how long each animation frame should last (in milliseconds)

const heightFromGround = 17.9 // also change css --bottom to match
const scorePopupHeightFromGround = 40
const jumpableHeight = 20 // planning on implementing a jump buffer from the ground
const player = windowElements.player;
const scorePopup = windowElements.scorePopup;


// PLAYER SETUP
let isJumping;
let playerFrame;
let currentFrameTime;
let yVelocity;
export function setupPlayer() {
  isJumping = false; // Reset all past values
  playerFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  player.src = `imgs/kid-idle.png`;

  setCustomProperty(player, "--bottom", heightFromGround);
}

export function showPlayer(){
  player.classList.remove("hide")
}

// UPDATE PLAYER
export function updatePlayer(delta, speedScale) {
  handleRun(delta, speedScale, player);
  handleJump(delta);
}

// Red Box Code, Leave For Testing
// let boundaryBox
export function getPlayerRect() {
  const playerRect = player.getBoundingClientRect();

  playerRect.width = playerRect.width * 0.5;
  playerRect.height = playerRect.height * 1;

  // Red Box Code, Leave For Testing 
  /*
  if(boundaryBox) boundaryBox.remove()
  boundaryBox = document.createElement('div');
  boundaryBox.style = "border: 2px solid red; position: absolute;";
  boundaryBox.style.left = playerRect.left + 'px';
  boundaryBox.style.top = playerRect.top + 'px';
  boundaryBox.style.width = playerRect.width + 'px';
  boundaryBox.style.height = playerRect.height + 'px';

  document.body.appendChild(boundaryBox);
  */

  return playerRect
}

// SET LOSING SPRITE
export function setPlayerLose() {
    loseSound()
    player.src = "imgs/kid-lose.png"
    petDeath();
}

// HANDLE RUN - also used in introScene.js
function handleRun(delta, speedScale) {
  if (isJumping) {
    // if isJumping: set animation to stationary
    player.src = `imgs/kid-jump.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // swaps animation frames when currentFrameTime is above frameTime
    playerFrame = (playerFrame + 1) % PLAYER_FRAME_COUNT; // will cycle animation frames no matter how many there are
    player.src = `imgs/kid-run${playerFrame}.png`; // picks an image from the current player frame
    currentFrameTime = 0; // reset currentFrameTime back to 0
  }

  currentFrameTime += delta * speedScale; // animation will play faster as the level speeds up
}

export function showScorePopup() {
  scorePopup.classList.remove("hide");
  setTimeout(() => {
    scorePopup.classList.add("hide");
  }, 500);
}

// HANDLE JUMP
function handleJump(delta) {
  if (!isJumping) return; // if not jumping then exit out

  incrementCustomProperty(player, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity
  incrementCustomProperty(scorePopup, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity

  //if (getCustomProperty(player, "--bottom") <= jumpableHeight) {
    // allow jumping here
    if (getCustomProperty(player, "--bottom") <= heightFromGround) {
    // if player is back on the ground: continue running
    setCustomProperty(player, "--bottom", heightFromGround); // make sure player position is zero
    setCustomProperty(scorePopup, "--bottom", scorePopupHeightFromGround);
    isJumping = false
    playerFrame = 1
  //}
}
  yVelocity -= GRAVITY * delta; // jump velocity slows down and goes negative while in the air to pull player back to ground
}

export function onJump(event) {
  if(isJumping) return

  jumpSound()
  wormJump()
 
  yVelocity = JUMP_HEIGHT;
  isJumping = true;
}
