const pet = document.querySelector("[data-pet]")
const JUMP_SPEED = 0.30;
const GRAVITY = 0.0015;
const PET_FRAME_COUNT = 3; // amount of animation frames
const FRAME_TIME = 100; // how long each animation frame should last (in milliseconds)
const heightFromGround = 41 // also change css --bottom to match

// PLAYER SETUP
let isJumping;
let petFrame;
let currentFrameTime;
let yVelocity;
export function setupPet() {
  isJumping = false; // Reset all past values
  petFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  pet.src = `imgs/worm-idle.png`;

  setCustomProperty(pet, "--bottom", heightFromGround);
}

export function showPet(){
  pet.classList.remove("hide-img")
}

// UPDATE PET
export function updatePet(delta, speedScale) {
    handleRun(delta, speedScale, pet);
    handleJump(delta);
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
      playerFrame = 1
    //}
  }
    yVelocity -= GRAVITY * delta; // jump velovity slows down and goes negative while in the air to pull player back to ground
  }
  
  export function onJump(event) {
    if(isJumping) return
  
    jumpSound()
  
   
    yVelocity = JUMP_SPEED;
    isJumping = true;
  }