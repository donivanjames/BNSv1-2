import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

// const SPEED = 0.02;
const groundElems = document.querySelectorAll("[data-ground]");

export function showGround(){
  groundElems.forEach(ground => { ground.classList.remove("hide-img") })
}

export function hideGround(){
  groundElems.forEach(ground => { ground.classList.add("hide-img") })
}



export function resetGround(){
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300); //we have our width at 300% so 300 is what we set our starting value as for the second ground piece
}


// Move ground left (speedScale) = accellerates player speed over time
export function updateGround(delta, speed, speedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * speed * -1);

    // Has ground 1 moved all the way off screen? Loop it around to the back
    if (getCustomProperty(ground, "--left") <= -300)
      incrementCustomProperty(ground, "--left", 600); // width x 2, frames split if its an even 600
  });
}
