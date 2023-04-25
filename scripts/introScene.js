// handles the long scrolling intro scene
// deletes everything after intro scene

import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";
import { soundToggle } from "./audioManager.js";
import { sequence1, sequence3 } from "./gameSetup.js";

let sceneCompleted; // cancelAnimationFrame wasn't working
export const finishInroScene = () => {
  sceneCompleted = true
  window.cancelAnimationFrame(updateIntroScene);
  container.classList.remove("moveable-item"); // stops browser from trying to render the 'will-change' in the landing page, it gets deleted but it's just a precaution
}

let lastTime = null;
let waitAtEnd = 1000;
const PLAYER_FRAME_COUNT = 7; // amount of animation frames
const FRAME_TIME = 75; // how long each animation frame should last (in milliseconds)
let playerFrame = 0;
let currentFrameTime = 0;

let outputTutText = ""; // the empty string for the scrolling tutorial text
let fullTutText = "COLLECT APPLES TO SCORE<br>WATCH OUT FOR OBSTACLES";

let allDivs = document.querySelectorAll("[data-start-screen]");
let startScreen = document.querySelector(".start-screen");
let container = document.querySelector(".title-container");
let bigImg = document.querySelector(".start-screen-img");
let player = document.querySelector(".start-screen-player");
let officeWindowTint = document.querySelector(".office-window-tint")
let upperText = document.querySelector(".title-text-upper")
let lowerText = document.querySelector("[data-space-to-start]")
let tutText = document.querySelector("[data-tutorial-text]");

let startButton = document.querySelector("[data-space-to-start]");
if (startButton) startButton.addEventListener("click", sequence1);

let soundButton = document.querySelector("[data-sound-toggle]");
if (soundButton)
  soundButton.addEventListener("click", () => soundToggle(soundButton));

// Variables are set in code to account for different screen sizes
let startScreenHeight = 0;
let imgHeight = 0;
let scrollDistance = 0;
let scrollSpeed = 0;

let customPlayerPos;
let customTutTextPost;
let customOfficeWindowTintPos;
export let horizontalScreen = true;

window.addEventListener("resize", setupIntro); // to protect screen resizes

setupIntro();
function setupIntro() {

  // === Code for later === //
  // let currentUrl = window.location.href;
  // if(currentUrl.includes('/game')) {
  //   console.log("This is the alt game page")
  // }
  // else {
  //   console.log("this is the default 404 page")
  // }

  // could never get the mobile intro scene working right so half this code is skipped over, needs to be experimented with

  // Horizontal ui positioning
  if (window.matchMedia("(orientation: landscape)").matches) {
    horizontalScreen = true;
    console.log("you're in LANDSCAPE mode", "horizontal: ", horizontalScreen);
  }
  // Vertical ui positioning
  if (window.matchMedia("(orientation: portrait)").matches) {
    horizontalScreen = false;
    console.log(
      "you're in PORTRAIT mode, ",
      "horizontal: ",
      horizontalScreen
    );
    bigImg.removeAttribute('src') // remove landing page image for mobile
  }

  if (window.innerWidth < 1200) bigImg.removeAttribute('src')

    // === Detect Chrome === //
  // Chrome screenHeight is different than other browsers, really annoying when designing intro scene
  let isChrome
  if(navigator.userAgent.indexOf("Chrome") != -1 )
        isChrome = true;


  // Get Screen Heights:
  if(!isChrome) startScreenHeight = document.documentElement.clientHeight;
  else startScreenHeight = window.innerHeight
  
  imgHeight = bigImg.offsetHeight;

  // Rest of code needs to come after imgHeight, hence why they're not in window.matchMedia

  if(isChrome) console.log("using chrome")
  else console.log("Not chrome")
  scrollSpeed = imgHeight * 0.00006;
  customPlayerPos = 0.894; // higher num = lower position
  customTutTextPost = 0.826;
  customOfficeWindowTintPos = 0.9073;

  if(!isChrome) scrollDistance = -imgHeight * 1 + startScreenHeight + 5;
  else scrollDistance = -imgHeight * 0.95 + startScreenHeight + 5;
 
  // Tutorial Text Position:
  let tutTextPos = 0 + startScreenHeight - imgHeight * customTutTextPost;
  setCustomProperty(tutText, "--bottom", tutTextPos);

  // Player Position:
  let playerPos = 0 + startScreenHeight - imgHeight * customPlayerPos;
  setCustomProperty(player, "--bottom", playerPos);

  // Office Window Tint Position:
  let officeWindowTintPos = 0 + startScreenHeight - imgHeight * customOfficeWindowTintPos;
  setCustomProperty(officeWindowTint, "--bottom", officeWindowTintPos);

  allDivs.forEach((item) => {
    setCustomProperty(item, "--top", 0);
  });

  window.scrollTo(0, 1); // possible mobile fix to the bug where screen gets stuck halfway down
}

export function skipIntro() {
  //scrollSpeed = 2;
  sequence3();
}

export function updateIntroScene(time) {
  // if lastTime is null then only call this block
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateIntroScene);
    return;
  }

  // Set deltatime for constant update speed regardless of framerate
  const delta = time - lastTime;
  scrollIntroScene(delta, scrollSpeed);
  lastTime = time;

  if (!sceneCompleted) window.requestAnimationFrame(updateIntroScene);
}

function scrollIntroScene(delta, scrollSpeed) {
  if (horizontalScreen) {
    if (getCustomProperty(container, "--top") > scrollDistance) {
      scrollItems(delta, scrollSpeed);
    } else if (outputTutText.length < fullTutText.length) {
      scrollText(delta);
    } else if (waitAtEnd <= 0) {
      movePlayer(delta);
    } else waitAtEnd -= 1 * delta;
  }
  else sequence3()

}

function scrollItems(delta, scrollSpeed) {
  allDivs.forEach((item) => {
    incrementCustomProperty(item, "--top", delta * scrollSpeed * -1);
  });
}

// ===== Text Scrolling ===== //

let textFrameTime = 0;
let fullTextFrameTime = 60;
let textSpeed = 1;
let iText = 0;
tutText.innerHTML = "";

function scrollText(delta) {
  if (textFrameTime <= 0) {
    outputTutText += fullTutText[iText];
    iText++;
    textFrameTime = fullTextFrameTime;
  }

  textFrameTime -= delta * textSpeed;
  tutText.innerHTML = outputTutText;
}

// ====== Landing Page Player Animation ========= //

function movePlayer(delta) {
  if (getCustomProperty(player, "--left") <= 78) {
    incrementCustomProperty(player, "--left", delta * 0.025 * 1);
    handleRun(delta);
  } else sequence3();
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
