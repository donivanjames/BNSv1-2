// Would be better to make obstacles and collectables the same class, and just specify lose/bonus on collection

import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05; // needs to be the same speed as the ground, might consolodate them both into a "groundSpeed" variable
const APPLE_INTERVAL_MIN = 3000;
const APPLE_INTERVAL_MAX = 10000; // speed of obstacles appearing in milliseconds
const worldElem = document.querySelector("[data-world]"); // grabs the world element so we can add the obstacles into the world


let collectSound = new Audio("sounds/Coin-Collect.mp3")
collectSound.volume = 0.1
  
// SETUP OBSTACLE
let nextAppleTime;
export function setupApple() {
  nextAppleTime = APPLE_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  removeAllApples() // remove any old apple in the scene when the game restarts
}

export function collect(){
  removeAllApples()
  collectSound.play()
}

export function removeAllApples(){

  document.querySelectorAll("[data-apple]").forEach((apple) => {
    apple.remove();
  });
}

// UPDATE OBSTACLE
export function updateApple(delta, speedScale) {
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    incrementCustomProperty(apple, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(apple, "--left") <= -100) {
      apple.remove();
    }
  });

  if (nextAppleTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createApple();
    nextAppleTime =
      randomNumberBetween(APPLE_INTERVAL_MIN, APPLE_INTERVAL_MAX) /
      speedScale; // divide by speedscale so obstacles speed up over time
  }
  nextAppleTime -= delta; // count down to next apple
}

// GET ALL APPLE BOUNDARIES
let boundaryBox = []
export function getAppleRects() {
  return [...document.querySelectorAll("[data-apple]")].map(apple => {
    return apple.getBoundingClientRect()
  })
}



// CREATE APPLE
function createApple() {
  const apple = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  apple.dataset.apple = true; // adds "data-apple" to obstacle object so we can interact with it
  apple.src = "imgs/apple_v1.png"; // selects the correct image from files
  apple.classList.add("apple"); // adds CSS styles to apple
  setCustomProperty(apple, "--left", 100); // sets our apple position 100% left, which puts it all the way on the right side of the screen
  setCustomProperty(apple, "--top", 0); 
  worldElem.append(apple); // this adds our apple to the world
}

// RANDOM NUMBER GENERATOR
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
