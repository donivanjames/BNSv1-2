// Script.js sets up the game, go to playerInput.js to see what happens next

import { handleAllInput } from "./scripts/playerInput.js";
import { windowElements, resetVariables } from "./scripts/variableHandler.js";

const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 65;
document.documentElement.style.setProperty(
  "--doc-height",
  `${window.innerHeight}px`
);

resetVariables();
setPixelToWorldScale();

window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleAllInput); // this adds a listener to the player that waits for any key press, then it executes the onJump function
document.addEventListener("mousedown", handleAllInput); // this adds a listener to the player that waits for click, then it executes the onJump function

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  windowElements.worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  windowElements.worldElem.style.height = `${
    WORLD_HEIGHT * worldToPixelScale
  }px`;
}
