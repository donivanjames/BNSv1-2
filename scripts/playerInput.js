// Handles All Player Input

import { sequence1, sequence2, sequence3, sequence4 } from "./gameSetup.js";
import { playerJump, pauseGame, unpauseGame } from "./gameHandler.js";
import { variableHolder } from "./variableHandler.js";
import { leaderboardLimiter, submitScore } from "./leaderboard.js";

// Any input fires this function, it starts the intro scene and then handles game input
export function handleAllInput(event) {

  


  if (event.target.classList.contains("clickable")) return; // blocks buttons from activating jump

  if (event.code !== "Space" && event.code !== "Escape" && event.code != "Enter" && event.button !== 0)
    return;

    if(leaderboardLimiter == 1) 
    {
      if (event.code === "Escape") {
        sequence4()
        return 
      }

      // get input and check for empty
      let leaderboardInput = document.getElementById("playerName")
      let playAgain = document.getElementById("play-again")
  
      if(leaderboardInput.value.length == 0) {
        console.log("Nothing inputted")
        playAgain.innerHTML = "*ENTER INITIALS*"
        leaderboardInput.focus();
        return;
      }
      else {
        console.log("name: ", leaderboardInput.value)
        submitScore(leaderboardInput.value)
        return;
      }
    }

  if (event.code === "Escape") {
    if (!variableHolder.gameGoing) return;

    if (variableHolder.pause) unpauseGame();
    else pauseGame();
    return;
  }

  switch (variableHolder.inputNum) {
    case 0: // putting jump at 0 improves fps slightly
      playerJump();
      break;
    case 1:
      // start first scene/handleFirstInput()
      if(event.code == "Space") sequence1();
      break;
    case 2:
      sequence2();
      break;
    case 3:
      sequence3();
      break;
    default:
      sequence4();
  }
}
