// handles the long scrolling intro scene

import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
import { soundToggle } from "./audioManager.js"
import { sequence3 } from "./gameSetup.js"

let lastTime = null
let introSpeed = 0.025
let waitAtEnd = 1000
const PLAYER_FRAME_COUNT = 3; // amount of animation frames
const FRAME_TIME = 100; // how long each animation frame should last (in milliseconds)
let playerFrame = 0
let currentFrameTime = 0


const container = document.querySelector(".title-container")
const containerHeight = container.clientHeight
console.log("containerHeight: ", containerHeight)

const bigImg = document.querySelector(".start-screen-img")
const imgHeight = bigImg.clientHeight
console.log("Img height: ", imgHeight)

const scrollHeight = ((imgHeight / containerHeight) * 100)
console.log("ScrollHeight ", scrollHeight, "%")


const player = document.querySelector(".start-screen-player")
const playerHeight = -scrollHeight
setCustomProperty(player, "--bottom", playerHeight)
console.log("Player height: ", playerHeight)



const allDivs = document.querySelectorAll("[data-start-screen]")

// add back when adding in text
// const soundButton = document.querySelector("[data-sound-toggle]")
// soundButton.addEventListener("click", () =>
//   soundToggle(soundButton)
// );

export function skipIntro() {
    introSpeed = 1;
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
    if (getCustomProperty(container, "--top") >= -scrollHeight + 120) {
        scrollItems(delta, introSpeed)
    }
    else {
        if(waitAtEnd <= 0) {
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