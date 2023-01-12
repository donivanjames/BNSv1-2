import { getCustomProperty, setCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js";
import { jumpSound, loseSound } from "./audioManager.js";

const player = document.querySelector("[data-player]");
const world = document.querySelector('[data-world]');
const JUMP_SPEED = 0.30;
const GRAVITY = 0.0015;
const PLAYER_FRAME_COUNT = 2; // amount of animation frames
const FRAME_TIME = 140; // how long each animation frame should last (in milliseconds)

const heightFromGround = 42 // also change css --bottom to match
const jumpableHeight = 20

let stopJumpSound = false; // stops jumping sound from playing on restart

// PLAYER SETUP
let isJumping;
let playerFrame;
let currentFrameTime;
let yVelocity;
export function setupPlayer(environment) {
  isJumping = false; // Reset all past values
  playerFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  player.src = `imgs/worm-run-0.png`;

  // Need a different zindex for the school so player falls into puddle and not behind it
  player.classList.remove("zindex-top")
  player.classList.add("zindex-default")
  if(environment == 2){
    player.classList.add("zindex-top")
    player.classList.remove("zindex-default")
  }
  setCustomProperty(player, "--bottom", heightFromGround);
}

export function showPlayer(){
  player.classList.remove("hide-img")
}

// UPDATE PLAYER
export function updatePlayer(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}


let boundaryBox
export function getPlayerRect() {
  const playerRect = player.getBoundingClientRect();

  playerRect.width = playerRect.width * 0.6;
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
    stopJumpSound = true;
    // set the sprite of the player do the loss image
    player.src = "imgs/worm-lose.png" 
}

// HANDLE RUN
function handleRun(delta, speedScale) {
  if (isJumping) {
    // if isJumping: set animation to stationary
    player.src = `imgs/worm-run-0.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // swaps animation frames when currentFrameTime is above frameTime
    playerFrame = (playerFrame + 1) % PLAYER_FRAME_COUNT; // will cycle animation frames no matter how many there are
    player.src = `imgs/worm-run-${playerFrame}.png`; // picks an image from the current player frame
    currentFrameTime = 0; // reset currentFrameTime back to 0
    // currentFrameTime -= FRAME_TIME; // used to be this, if there's ever more than two frames you might need this
  }

  currentFrameTime += delta * speedScale; // animation will play faster as the level speeds up
}

// HANDLE JUMP
function handleJump(delta) {
  if (!isJumping) return; // if not jumping then exit out

  
  incrementCustomProperty(player, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity

  //if (getCustomProperty(player, "--bottom") <= jumpableHeight) {
    // allow jumping here
    if (getCustomProperty(player, "--bottom") <= heightFromGround) {
    // if player is back on the ground: continue running
    setCustomProperty(player, "--bottom", heightFromGround); // make sure player position is zero
    isJumping = false
    playerFrame = 0
  //}
}
  yVelocity -= GRAVITY * delta; // jump velovity slows down and goes negative while in the air to pull player back to ground
}

export function onJump(event) {
  if(isJumping) return

  if(!stopJumpSound){
    jumpSound()
  }

  stopJumpSound = false; 
 
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
