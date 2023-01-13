import { incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js"
import { setupGame } from "../script.js"

let lastTime = null
let introSpeed = 0.03
let midScrollPause = 1500 // pauses the screen halfway down
let waitAtEnd = 1000
const bigImg = document.querySelector(".start-screen-img")
const allDivs = document.querySelectorAll("[data-start-screen]")
console.log("Big img: ", bigImg)

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
    
    if (midScrollPause <= 0 && getCustomProperty(bigImg, "--top") >= -442) {
        scrollItems(delta, introSpeed)
    }
    else if (getCustomProperty(bigImg, "--top") >= -200){
        scrollItems(delta, introSpeed)
    }
    else if (midScrollPause >= 0) {
        midScrollPause -= 1 * delta
    }
    else {
        if(waitAtEnd <= 0) {
            cancelAnimationFrame(updateIntroScene)
            setupGame()
        }
        else waitAtEnd -= 1 * delta
        
    }
}

function scrollItems(delta, introSpeed) {
    allDivs.forEach(item => {
        incrementCustomProperty(item, "--top", delta * introSpeed * -1)
    })
}