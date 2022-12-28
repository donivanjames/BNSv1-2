import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

// Set up ground on launch
export function setupGround() {

  const random_number = Math.floor(Math.random() * 5) + 1; //Bettween 1 and 5

  groundElems[0].src = `imgs/L${random_number}_environment_loop_v1.png`
  groundElems[1].src = `imgs/L${random_number}_environment_loop_v1.png`

  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300); //we have our width at 300% so 300 is what we set our starting value as for the second ground piece
}

// Move ground left (speedScale) = accellerates player speed over time
export function updateGround(delta, speedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

    // Has ground 1 moved all the way off screen? Loop it around to the back
    if (getCustomProperty(ground, "--left") <= -300)
      incrementCustomProperty(ground, "--left", 600); // width x 2
  });
}