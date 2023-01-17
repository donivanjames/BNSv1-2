import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

import { collectSound } from "./audioManager.js";

// Ending Max: 500  Begining Max 2500:
const CACTUS_INTERVAL_MIN = 800;
const CACTUS_INTERVAL_MAX = 2500; // speed of obstacles appearing in milliseconds

const APPLE_INTERVAL_MIN = 3000;
const APPLE_INTERVAL_MAX = 5000; // speed of obstacles appearing in milliseconds

const worldElem = document.querySelector("[data-world]"); // grabs the world element so we can add the obstacles into the world

// SETUP OBSTACLES
let nextAppleTime;
let nextCactusTime;
export function setupObstacles() {
  nextAppleTime = APPLE_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    apple.remove(); // remove any old apple in the scene when the game restarts
  });
  nextCactusTime = CACTUS_INTERVAL_MIN; // the first obstacle will spawn with the minimum time to get the game going
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove(); // remove any old cactus in the scene when the game restarts
  });
}

export function collect() {
  // push apple off screen
  removeAllApples();
  collectSound();
}

export function removeAllApples() {
  document.querySelectorAll("[data-apple]").forEach((apple) => {
    apple.remove();
  });
}

// UPDATE OBSTACLE
export function updateCactus(delta, speed, speedScale, environment) {
  document.querySelectorAll("[data-obstacle]").forEach((obstacle) => {
    incrementCustomProperty(
      obstacle,
      "--left",
      delta * speedScale * speed * -1
    );
    if (getCustomProperty(obstacle, "--left") <= -10) {
      obstacle.remove();
    }
  });

  if (nextCactusTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createCactus(environment);
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale; // divide by speedscale so obstacles speed up over time
  }

  if (nextAppleTime <= 0) {
    // when obstacle time reaches zero: summon a new obstacle
    createApple();
    nextAppleTime =
      randomNumberBetween(APPLE_INTERVAL_MIN, APPLE_INTERVAL_MAX) / speedScale; // divide by speedscale so obstacles speed up over time
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
let boundaryBox = [];
export function getCactusRects() {
  // Red Box Code, Leave For Testing
  // document.querySelectorAll("div.tempBox").forEach(boundary => boundary.remove())

  // gives us all of the rectangles for all of the obstacles on the screen
  const obMap = [...document.querySelectorAll("[data-cactus]")].map(
    (cactus) => {
      const obRect = cactus.getBoundingClientRect();

      obRect.width = obRect.width * 0.4;
      // obRect.height = obRect.height * 0.60;

      // Red Box Code, Leave For Testing
      /*
      let tempBox = document.createElement('div');
      tempBox.className = "tempBox"
      tempBox.style = "border: 2px solid red; position: absolute;";
      tempBox.style.left = obRect.left + 'px';
      tempBox.style.top = obRect.top + 'px';
      tempBox.style.width = obRect.width + 'px';
      tempBox.style.height = obRect.height + 'px';
      boundaryBox.push(tempBox)
      */

      return obRect;
    }
  );

  // Red Box
  boundaryBox.forEach((obstacle) => document.body.appendChild(obstacle));
  boundaryBox = [];

  return obMap;
}

// CREATE CACTUS
export function createCactus(environment) {
  const cactus = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  cactus.dataset.cactus = true; // adds "data-cactus" to obstacle object so we can interact with it
  cactus.dataset.obstacle = true;

  const obNum = randomNumberBetween(1, 6);

  // Set this based on environment
  cactus.src = `imgs/obstacle-${obNum}.png`; // selects the correct image from files
  cactus.classList.add(`obstacle${obNum}`); // adds CSS styles to obstacle

  setCustomProperty(cactus, "--left", 100); // sets our obstacle position 100% left, which puts it all the way on the right side of the screen
  setCustomProperty(cactus, "--top", 0); // might not need this
  worldElem.append(cactus); // this adds our obstacle to the world
}

// CREATE APPLE
export function createApple() {
  const apple = document.createElement("img"); // this creates a new image on the page that will become an obstacle
  apple.dataset.apple = true; // adds "data-apple" to obstacle object so we can interact with it
  apple.dataset.obstacle = true;

  // // Safeguard so apples will turn into coins if they spawn behind an obstacle
  if (nextCactusTime < 100 || nextCactusTime > CACTUS_INTERVAL_MAX - 500) {
    apple.src = "imgs/coin.png"; // selects the correct image from files
    apple.classList.add("coin"); // adds CSS styles to apple
    console.log("coin spawned");
  } else {
    apple.src = "imgs/apple_v1.png"; // selects the correct image from files
    apple.classList.add("apple"); // adds CSS styles to apple
  }

  setCustomProperty(apple, "--left", 100); // sets our apple position 100% left, which puts it all the way on the right side of the screen
  worldElem.append(apple); // this adds our apple to the world

  console.log("Apple spawned");
}

// RANDOM NUMBER GENERATOR
function randomNumberBetween(min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
}
