// handles the long scrolling intro scene

import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
import { soundToggle } from "./audioManager.js"
import { sequence3 } from "./gameSetup.js"

let lastTime = null
let introSpeed = 0.3
let waitAtEnd = 1000
const PLAYER_FRAME_COUNT = 3; // amount of animation frames
const FRAME_TIME = 100; // how long each animation frame should last (in milliseconds)
let playerFrame = 0
let currentFrameTime = 0

const startScreen = document.querySelector(".start-screen")
const container = document.querySelector(".title-container")
const bigImg = document.querySelector(".start-screen-img")
const player = document.querySelector(".start-screen-player")

let startScreenHeight = 0
let imgHeight = 0
let playerPos = 0

window.addEventListener('resize', setupIntro) // to protect screen resizes
setupIntro()
function setupIntro() {
    startScreenHeight = startScreen.offsetHeight
    imgHeight = bigImg.scrollHeight
    playerPos = 0 + startScreenHeight - (imgHeight * 0.894)
    setCustomProperty(player, "--bottom", playerPos)
    
    
    
}


const allDivs = document.querySelectorAll("[data-start-screen]")

const soundButton = document.querySelector("[data-sound-toggle]")
if(soundButton)
    soundButton.addEventListener("click", () =>
    soundToggle(soundButton)
    );

export function skipIntro() {
    introSpeed = 2;
    //sequence3()
}

export function updateIntroScene(time){
  // if lastTime is null then only call this block
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateIntroScene);
    return;
  }

  // Set deltatime for constant update speed regardless of framerate
  const delta = time - lastTime;
  scrollIntroScene(delta, introSpeed)
  lastTime = time;

  window.requestAnimationFrame(updateIntroScene);
}

function scrollIntroScene(delta, introSpeed){
    if (getCustomProperty(container, "--top") > -imgHeight + startScreenHeight) {
        console.log("container top: ", getCustomProperty(container, "--top"))
        scrollItems(delta, introSpeed)
    }
    else {
        if(waitAtEnd <= 0) {
            console.log("done, top: ", getCustomProperty(container, "--top"))
            movePlayer(delta)
        }
        else waitAtEnd -= 1 * delta
    }
}

function scrollItems(delta, introSpeed) {
    allDivs.forEach(item => {
        incrementCustomProperty(item, "--top", delta * introSpeed * -1)
    })
}

function movePlayer(delta){
    if (getCustomProperty(player, "--left") <= 65){
        incrementCustomProperty(player, "--left", delta * 0.03 * 1)
        // play animation
        handleRun(delta)
    }
    else sequence3()
}

export function handleRun(delta) {
    if (currentFrameTime >= FRAME_TIME) {
      // swaps animation frames when currentFrameTime is above frameTime
      playerFrame = (playerFrame + 1) % PLAYER_FRAME_COUNT; // will cycle animation frames no matter how many there are
      player.src = `imgs/kid-run${playerFrame}.png`; // picks an image from the current player frame
      currentFrameTime = 0; // reset currentFrameTime back to 0
    }
  
    currentFrameTime += delta * 1; // animation will play faster as the level speeds up
  }