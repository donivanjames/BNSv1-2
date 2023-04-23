// controls the worm, basically the same as player.js

import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";
import { windowElements } from "./variableHandler.js";

const pet = windowElements.pet
const JUMP_SPEED = 0.3;
const GRAVITY = 0.0015;
const PET_FRAME_COUNT = 3; // amount of animation frames
const FRAME_TIME = 100; // how long each animation frame should last (in milliseconds)
const heightFromGround = 18; // also change css --bottom to match

// PET SETUP
let isJumping;
let petFrame;
let currentFrameTime;
let yVelocity;

let jumpDelay;
let maxJumpDelay = 180;

export function setupPet() {
  isJumping = false; // Reset all past values
  petFrame = 0;
  jumpDelay = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  pet.src = `imgs/worm-idle.png`;

  setCustomProperty(pet, "--bottom", heightFromGround);
}

export function showPet() {
  pet.classList.remove("hide");
}

// UPDATE PET
export function updatePet(delta) {
  handlePetRun(delta, pet);
  handlePetJump(delta);
}

// HANDLE RUN - also used in introScene.js
function handlePetRun(delta) {
  if (jumpDelay >= maxJumpDelay) {
    // if isJumping: set animation to stationary
    pet.src = `imgs/worm-jump.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // swaps animation frames when currentFrameTime is above frameTime
    petFrame = (petFrame + 1) % PET_FRAME_COUNT; // will cycle animation frames no matter how many there are
    pet.src = `imgs/worm-walk${petFrame}.png`; // picks an image from the current pet frame
    currentFrameTime = 0; // reset currentFrameTime back to 0
  }

  currentFrameTime += delta * 1; // animation will play faster as the level speeds up
}

// HANDLE JUMP
export function handlePetJump(delta) {
  if (!isJumping) return; // if not jumping then exit out

  if (jumpDelay >= maxJumpDelay) {
    incrementCustomProperty(pet, "--bottom", yVelocity * delta); // jump/increment into the air based on yVelocity

    //if (getCustomProperty(pet, "--bottom") <= jumpableHeight) {
    // allow jumping here
    if (getCustomProperty(pet, "--bottom") <= heightFromGround) {
      // if pet is back on the ground: continue running
      setCustomProperty(pet, "--bottom", heightFromGround); // make sure pet position is zero
      isJumping = false;
      petFrame = 1;
      //setCustomProperty(pet, "width", walkingSize)
      jumpDelay = 0;
    }
    yVelocity -= GRAVITY * delta; // jump velovity slows down and goes negative while in the air to pull pet back to ground
  } else {
    jumpDelay += delta * 1;
  }
}

export function wormJump(event) {
  if (isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
