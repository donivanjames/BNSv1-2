// handles the long scrolling intro scene
// deletes everything after intro scene

import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";
import { soundToggle } from "./audioManager.js";
import { sequence1, sequence3 } from "./gameSetup.js";

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
let tutText = document.querySelector("[data-tutorial-text]");

let startButton = document.querySelector("[data-space-to-start]");
if (startButton) startButton.addEventListener("click", sequence1);

let soundButton = document.querySelector("[data-sound-toggle]");
if (soundButton)
  soundButton.addEventListener("click", () => soundToggle(soundButton));

let startScreenHeight = 0;
let imgHeight = 0;
let playerPos = 0;
let tutTextPos = 0;
let scrollDistance = 0;
let scrollSpeed = 0;

let customPlayerPos = 1;
let customTutTextPost = 1;
export let horizontalScreen = true;

getResolution();
function getResolution() {
  console.log(
    "Your screen resolution is: " + screen.width + "x" + screen.height
  );
}

window.addEventListener("resize", setupIntro); // to protect screen resizes

setupIntro();
function setupIntro() {

  // could never get mobile working right so half this code doesn't work, needs to be experimented with

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
      bigImg.removeAttribute('src')
    }

    if(window.innerWidth < 1200) bigImg.removeAttribute('src')

    // Get Screen Heights:
    startScreenHeight = window.innerHeight; // startScreen.offsetHeight;
    imgHeight = bigImg.offsetHeight;

    console.log("screen height: ", startScreenHeight);
    console.log("img height: ", imgHeight);

    // These need to come after imgHeight, hence why they're not in window.matchMedia
    if (horizontalScreen) {
      scrollSpeed = imgHeight * 0.00006;
      customPlayerPos = 0.8944;
      customTutTextPost = 0.842;
      scrollDistance = -imgHeight * 0.95 + startScreenHeight + 5;
    } else {
      scrollSpeed = imgHeight * 0.0002;
      customPlayerPos = 2.317;
      customTutTextPost = 1.53;
      scrollDistance = -imgHeight * 0.9 - startScreenHeight * 1.5;
    }

    

    // Tutorial Text Position:
    tutTextPos = 0 + startScreenHeight - imgHeight * customTutTextPost;
    setCustomProperty(tutText, "--bottom", tutTextPos);

    // Player Position:
    playerPos = 0 + startScreenHeight - imgHeight * customPlayerPos;
    setCustomProperty(player, "--bottom", playerPos);

    allDivs.forEach((item) => {
      setCustomProperty(item, "--top", 0);
    });
    
    // window.scrollTo(0, 1);
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

  window.requestAnimationFrame(updateIntroScene);
}

function scrollIntroScene(delta, scrollSpeed) {
  if(horizontalScreen) {
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

function movePlayer(delta) {
  if (getCustomProperty(player, "--left") <= 70.8) {
    incrementCustomProperty(player, "--left", delta * 0.03 * 1);
    // play animation
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
