import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2; // amount of animation frames
const FRAME_TIME = 160; // how long each animation frame should last (in milliseconds)

// PLAYER SETUP
let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
  isJumping = false; // Reset all past values
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump); // this removes any extra eventListeners from the game before we add a new one
  document.addEventListener("keydown", onJump); // this adds a listener to the player that waits for any key press, then it executes the onJump function
}

// UPDATE PLAYER
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

// GET PLAYER BOUNDARIES
export function getDinoRect() {
  return dinoElem.getBoundingClientRect();
}

// SET LOSING SPRITE
export function setDinoLose() {
    // set the sprite of the player do the loss image
    dinoElem.src = "imgs/dino-lose.png"
}

// HANDLE RUN
function handleRun(delta, speedScale) {
  if (isJumping) {
    // if isJumping: set animation to stationary
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // swaps animation frames when currentFrameTime is above frameTime
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT; // will cycle animation frames no matter how many there are
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`; // picks an image from the current dino frame
    currentFrameTime -= FRAME_TIME; // reset currentFrameTime back to 0
  }

  currentFrameTime += delta * speedScale; // animation will play faster as the level speeds up
}

// HANDLE JUMP
function handleJump(delta) {
  if (!isJumping) return; // if not jumping then exit out

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    // if dino is back on the ground: continue running
    setCustomProperty(dinoElem, "--bottom", 0); // make sure dino position is zero
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta; // jump velovity slows down and goes negative while in the air to pull player back to ground
}

function onJump(event) {
  if (event.code != "Space" || isJumping) return; // if the key pressed is not space or the player is jumping then dont do anything

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
