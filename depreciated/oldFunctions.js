// Functions that were removed from v1 that could be useful for v2
/*

//Randomly assigns one of the 5 environments // from script.js
function chooseEnvironment() {
  environment = ~~(Math.random() * 5) + 1;
}

// Changes ground sprites to match environment number // from ground.js
export function changeGround(environment) {
  groundElems[0].src = `imgs/L${environment}_environment_loop_v1.png`
  groundElems[1].src = `imgs/L${environment}_environment_loop_v1.png`
}

// CSS for menu trees
.start-screen-trees {
    position: absolute;
    top: 20vw;
    left: 15vw;
    width: 18%;
}

// SLOWLY INCREASE SPEED OVER TIME - NO LONGER SPEEDING UP GAME  //
// function updateSpeedScale(delta) {
//   speedScale += delta * SPEED_SCALE_INCREASE;
// }


// Switch statement that changed screen font and background based on environment
let fontColor = "Yellow";
removeAllBodyStyles();
switch (environment) {
  case 1: // Outside
    fontColor = "Yellow";
    document.body.classList.add("outside");
    break;
  case 2: // Hallway
    fontColor = "Red";
    document.body.classList.add("hallway");
    break;
  case 3: // Lab
    fontColor = "Yellow";
    document.body.classList.add("lab");
    break;
  case 4: // Library
    fontColor = "Yellow";
    document.body.classList.add("library");
    break;
  case 5: // Gym
    fontColor = "#C53A99";
    document.body.classList.add("gym");
    break;
}

// Removed all environment styling from the document background
function removeAllBodyStyles() {
  document.body.classList.remove("black");
  document.body.classList.remove("outside");
  document.body.classList.remove("hallway");
  document.body.classList.remove("library");
  document.body.classList.remove("lab");
  document.body.classList.remove("gym");
}

// Get Ground Dimensions // might be needed for future map sizes
const groundElem = document.querySelector("[data-ground]");
const getGroundHeight = () => groundElem.getBoundingClientRect().height;
const getGroundWidth = () => groundElem.getBoundingClientRect().width;
console.log("GroundHeight: ", getGroundHeight());
console.log("Groundwidth: ", getGroundWidth());

// Set random apple height
//const randomHeight = ~~(Math.random() * (max - min + 1) + min)
//setCustomProperty(apple, "--bottom", randomHeight); 


// Attempt at a game flash

let lastTime = null;
let flashCount = 6;
let flashTime = 0
let maxFlashTime = 200;
let flash = false;
const bigImg = document.querySelector(".start-screen-img");
export function flashIntro(time) {
  if (flashCount <= 0) {
    document.body.style.backgroundColor = "#00450F";
    setupGame();
    return;
  }

  // if lastTime is null then only call this block
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(flashIntro);
    return;
  }

  const delta = time - lastTime;

  if (flashTime <= 0) {
    if ((flash = !flash)) {
      document.body.style.backgroundColor = "#fff";
      bigImg.classList.add("hide");
    } else {
      document.body.style.backgroundColor = "#00450F";
      bigImg.classList.remove("hide");
    }
    flashCount--
    flashTime = maxFlashTime;
  }
    console.log("flashTime ", flashTime)
    flashTime = flashTime - 1 * delta
    lastTime = time;
    window.requestAnimationFrame(flashIntro);
}


*/
