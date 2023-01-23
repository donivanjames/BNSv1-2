// handles the scrolling ground

import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const groundElems = document.querySelectorAll("[data-ground]");
const totalBackgroundImages = 1 // for randomizing background

export function showGround() {
  groundElems.forEach((ground) => {
    ground.classList.remove("hide-img");
  });
}

export function hideGround() {
  groundElems.forEach((ground) => {
    ground.classList.add("hide-img");
  });
}

const groundWidth = 150; // if you change this make sure to change .ground width in css
export function resetGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", groundWidth); //we have our width at 300% so 300 is what we set our starting value as for the second ground piece
}

// Move ground left (speedScale) = accellerates player speed over time
export function updateGround(delta, speed, speedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * speed * -1);

    // Has ground 1 moved all the way off screen? Loop it around to the back
    if (getCustomProperty(ground, "--left") <= -groundWidth) {
      ground.src = `imgs/background-${chooseGround()}.png`
      incrementCustomProperty(ground, "--left", groundWidth * 2); // width x 2, frames split if its an even 600
    }
  });
}

function chooseGround() {
  return ~~(Math.random() * totalBackgroundImages) + 1;
}
