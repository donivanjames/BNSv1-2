import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";
import { score } from "../script.js";

import { collectSound } from "./audioManager.js";

// Ending Max: 500  Begining Max 2500:
let CACTUS_INTERVAL_MIN = 800;
let CACTUS_INTERVAL_MAX = 2500; // speed of obstacles appearing in milliseconds

let APPLE_INTERVAL_MIN = 1000;
let APPLE_INTERVAL_MAX = 4000; // speed of obstacles appearing in milliseconds

let cactusList = [];
let appleList = [];

const worldElem = document.querySelector("[data-world]"); // grabs the world element so we can add the obstacles into the world

// SETUP OBSTACLES
let nextAppleTime;
let nextCactusTime;
let nextChosenCactusTime; // for apple to coin safeguard
export function setupObstacles() {
  nextAppleTime = APPLE_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  appleList = [];
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    apple.remove(); // remove any old apple in the scene when the game restarts
  });

  nextCactusTime = CACTUS_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  cactusList = [];
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove(); // remove any old cactus in the scene when the game restarts
  });
}

// remove everything but the obstacle the player hit
export function gameOverObstacles(){
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    const pos = getCustomProperty(cactus, "--left");
    if(pos > 35) cactus.remove();
  });
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    apple.remove();
  });
}

export function collect() {
  // push apple off screen
  removeCollectedApple();
  collectSound();
}

// Just removes apple based on position for now, will work on object detetction later
function removeCollectedApple() {
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    const pos = getCustomProperty(apple, "--left");
    if(pos <= 35) apple.remove();
  });
}

// UPDATE OBSTACLE
export function updateCactus(delta, speed) {
  cactusList.forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speed * -1);

    const pos = getCustomProperty(cactus, "--left");
    if (pos <= -10) {
      cactus.remove();
      cactusList = cactusList.filter((item) => item !== cactus); // .splice() lags obstacles too much
    }
  });
  appleList.forEach((apple) => {
    const pos = getCustomProperty(apple, "--left");

    if (pos <= -10) {
      apple.remove();
      appleList = appleList.filter((item) => item !== apple);
    } else incrementCustomProperty(apple, "--left", delta * speed * -1);
  });

  if (nextCactusTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX)
    nextChosenCactusTime = nextCactusTime; // for apple to coin safeguard
  }

  if (nextAppleTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createApple();
    nextAppleTime = randomNumberBetween(APPLE_INTERVAL_MIN, APPLE_INTERVAL_MAX);
  }

  nextCactusTime -= delta; // count down to next cactus
  nextAppleTime -= delta; // count down to next apple
}

// GET ALL APPLE BOUNDARIES
export function getAppleRects() {
  return [...document.querySelectorAll("[data-apple]")].map((apple) => {
    return apple.getBoundingClientRect();
  });
}

// GET ALL CACTUS BOUNDARIES
//let boundaryBox = [];
export function getCactusRects() {
  // Red Box Code, Leave For Testing
  //document.querySelectorAll("div.tempBox").forEach(boundary => boundary.remove())

  let obMap = cactusList.map((cactus) => {
    const pos = getCustomProperty(cactus, "--left");

    // only checks for collisions if pos is past a certain point
    if (pos < 35) {
      const obRect = cactus.getBoundingClientRect();

      obRect.width = obRect.width * 0.4; // set collision width to around half
      // obRect.height = obRect.height * 0.60;

      // Red Box Code, Leave For Testing
      // let tempBox = document.createElement('div');
      // tempBox.className = "tempBox"
      // tempBox.style = "border: 2px solid red; position: absolute;";
      // tempBox.style.left = obRect.left + 'px';
      // tempBox.style.top = obRect.top + 'px';
      // tempBox.style.width = obRect.width + 'px';
      // tempBox.style.height = obRect.height + 'px';
      // boundaryBox.push(tempBox)

      return obRect;
    }
  });

  // Red Box
  // boundaryBox.forEach((obstacle) => document.body.appendChild(obstacle));
  // boundaryBox = [];

  return obMap;
}

// CREATE CACTUS
export function createCactus() {
  const cactus = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  cactus.dataset.cactus = true; // adds "data-cactus" to obstacle object so we can interact with it
  cactus.dataset.obstacle = true;

  // Harder obstacles as the score gets higher
  let randNum = 3;
  if(score > 15000) {
    randNum = 5
    CACTUS_INTERVAL_MAX = 1500;
    CACTUS_INTERVAL_MIN = 600;
  }
  else if(score > 8000) {
    randNum = 4
    CACTUS_INTERVAL_MAX = 2000;
    CACTUS_INTERVAL_MIN = 700;
  }

  // Set obstacle based on random number
  const objNum = randomNumberBetween(1, randNum);
  cactus.src = `imgs/obstacle-${objNum}.png`; // selects the correct image from files
  cactus.classList.add(`obstacle${objNum}`); // adds CSS styles to obstacle
  cactus.classList.add(`base-obstacle`);
  console.log(`obstacle ${objNum}`)

  setCustomProperty(cactus, "--left", 100); // sets our obstacle position 100% left, which puts it all the way on the right side of the screen
  setCustomProperty(cactus, "--top", 0); // might not need this
  worldElem.append(cactus); // this adds our obstacle to the world
  cactusList.push(cactus);
}

// CREATE APPLE
export function createApple() {
  const apple = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  apple.dataset.apple = true; // adds "data-apple" to obstacle object so we can interact with it
  apple.dataset.obstacle = true;

  const randNum = randomNumberBetween (1, 10)

  // Makes coins rarer
  if (randNum >= 9) {
    apple.src = "imgs/coin.png"; // selects the correct image from files
    apple.classList.add("coin"); // adds CSS styles to apple
  } else {
    apple.src = "imgs/apple-v02.png"; // selects the correct image from files
    apple.classList.add("apple"); // adds CSS styles to apple
  }

  setCustomProperty(apple, "--bottom", randomNumberBetween(55, 70)) // sets apple height

  apple.classList.add(`base-obstacle`);
  setCustomProperty(apple, "--left", 100); // sets our apple position 100% left, which puts it all the way on the right side of the screen
  worldElem.append(apple); // this adds our apple to the world
  appleList.push(apple);
}

// RANDOM NUMBER GENERATOR
function randomNumberBetween(min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
}
