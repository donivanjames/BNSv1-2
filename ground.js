import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

export function showGround(){
  groundElems.forEach(ground => { ground.classList.remove("hide-img") })
}

export function hideGround(){
  groundElems.forEach(ground => { ground.classList.add("hide-img") })
}

// Set up ground on launch
export function changeGround(environment) {
  groundElems[0].src = `imgs/L${environment}_environment_loop_v1.png`
  groundElems[1].src = `imgs/L${environment}_environment_loop_v1.png`
}

export function resetGround(){
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300); //we have our width at 300% so 300 is what we set our starting value as for the second ground piece
}


// Move ground left (speedScale) = accellerates player speed over time
export function updateGround(delta, speedScale) {

// Temp solution to reduce ground lag, delete if there is no more ground lag

//   if(getCustomProperty(groundElems[1], "--left") > getCustomProperty(groundElems[0], "--left")){
//     console.log("Ground 2 greater")
//     for(let i = groundElems.length - 1; i >= 0; i--){
//       incrementCustomProperty(groundElems[i], "--left", delta * speedScale * SPEED * -1);
  
//       // Has ground 1 moved all the way off screen? Loop it around to the back
//       if (getCustomProperty(groundElems[i], "--left") <= -300)
//         incrementCustomProperty(groundElems[i], "--left", 600); // width x 2
//     }
//   }
//   else {
//     console.log("Ground 1 greater")
//     for(let i = 0; i < groundElems.length; i++){
//     incrementCustomProperty(groundElems[i], "--left", delta * speedScale * SPEED * -1);

//     // Has ground 1 moved all the way off screen? Loop it around to the back
//     if (getCustomProperty(groundElems[i], "--left") <= -300)
//       incrementCustomProperty(groundElems[i], "--left", 600); // width x 2
//   }
// }

  

  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

    // Has ground 1 moved all the way off screen? Loop it around to the back
    if (getCustomProperty(ground, "--left") <= -300)
      incrementCustomProperty(ground, "--left", 600); // width x 2, frames split if its an even 600
  });
}
