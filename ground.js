import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

// Set up ground on launch
export function setupGround() {

  // Randomly Picks An Environment, will be useful later
  // const random_number = Math.floor(Math.random() * 5) + 1; //Bettween 1 and 5

  // groundElems[0].src = `imgs/L${random_number}_environment_loop_v1.png`
  // groundElems[1].src = `imgs/L${random_number}_environment_loop_v1.png`

  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300); //we have our width at 300% so 300 is what we set our starting value as for the second ground piece (-10 a couple pixels so frames dont split)
}

// Move ground left (speedScale) = accellerates player speed over time
export function updateGround(delta, speedScale) {

  if(getCustomProperty(groundElems[1], "--left") > getCustomProperty(groundElems[0], "--left")){
    console.log("Ground 2 greater")
    for(let i = groundElems.length - 1; i >= 0; i--){
      incrementCustomProperty(groundElems[i], "--left", delta * speedScale * SPEED * -1);
  
      // Has ground 1 moved all the way off screen? Loop it around to the back
      if (getCustomProperty(groundElems[i], "--left") <= -300)
        incrementCustomProperty(groundElems[i], "--left", 600); // width x 2
    }
  }
  else {
    console.log("Ground 1 greater")
    for(let i = 0; i < groundElems.length; i++){
    incrementCustomProperty(groundElems[i], "--left", delta * speedScale * SPEED * -1);

    // Has ground 1 moved all the way off screen? Loop it around to the back
    if (getCustomProperty(groundElems[i], "--left") <= -300)
      incrementCustomProperty(groundElems[i], "--left", 600); // width x 2
  }
}

  

  // groundElems.forEach((ground) => {
  //   incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

  //   // Has ground 1 moved all the way off screen? Loop it around to the back
  //   if (getCustomProperty(ground, "--left") <= -300)
  //     incrementCustomProperty(ground, "--left", 600); // width x 2, frames split if its an even 600
  // });
}
