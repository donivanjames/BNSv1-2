// leaderboard tutorial: https://youtu.be/MVgRYcqvm6k
import { getLeaderboardData, sendLeaderboardData, leaderboardData } from "../xhr.js";
import { variableHolder } from "./variableHandler.js";
import { sequence4 } from "./gameSetup.js";
import { horizontalScreen } from "./introScene.js";

let numColumn = `1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10`;
let nameColumn = `NAME0<br>NAME1<br>NAME2<br>NAME3<br>NAME4<br>NAME5<br>NAME6<br>NAME7<br>NAME8<br>NAME9`;
let scoreColumn = `{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}`;

getLeaderboardData()
export const resetLeaderboardLimiter = () => { leaderboardLimiter = 0 }

let colors = ["00450F", "FFCCCC", "FFC700", "CEFFDE", "CCE3FF"];
export let leaderboardLimiter

export function setupLeaderboard2() {
  numColumn = "";
  nameColumn = "";
  scoreColumn = "";
  let num = 1;
  let colorRotator = 0;
  const playerScore = variableHolder.score;
  leaderboardLimiter = 0; // checks to see if you're on the leaderboard, then substracts one so there's not 11 names

  if(leaderboardData) {
    for (let i = 0; i < Object.entries(leaderboardData.data).length - leaderboardLimiter; i++) {
      const person = Object.entries(leaderboardData.data)[i];
  
      const name = person[1].name;
      const score = person[1].score;
      const curColor = `<div style="color:#${colors[colorRotator]};">`; // might swap this out for nth child
  
      if(playerScore > score && leaderboardLimiter == 0 || Object.entries(leaderboardData.data).length < 10 && leaderboardLimiter == 0) {
        console.log("New high score")
        numColumn += `<div style="color:yellow;">${num}</div>`;
        nameColumn += `<div style="color:yellow;"${scoreInput()}</div>`;
        scoreColumn += `<div style="color:yellow;">${playerScore}</div>`;
        
        i--;
        leaderboardLimiter = 1;
      }
      else {
        numColumn += `${curColor}${num}</div>`;
        nameColumn += `${curColor}${name.toUpperCase()}</div>`;
        scoreColumn += `${curColor}${score}</div>`;
      }

      colorRotator += 1;
      if (colorRotator >= colors.length) colorRotator = 0;
      num++;
    }
  } else {
    console.log("Nothing here")
    getLeaderboardData()
  }
}

function highscoreMessage(){
  return (`
    <br><div>HIGH SCORE!! ENTER INITIALS</div>
  `)
}

function scoreInput(name, score) {
return (`
  <form onsubmit=" id="submitForm" class="game-over-font">
    <input 
      class="score-input" spellcheck="false" type="text" id="playerName" name="playerName" 
      size="6" minlength="1" maxlength="5" required placeholder=">NAME<"
      onkeypress="return event.charCode != 32";
      ><br>
    <input type="submit" value="Submit" style="display: none">
  </form>
`)
}

// might not be needed
window.submitForm = function(event) {
  event.preventDefault();
  const playerName = event.target.elements.playerName.value
  console.log("submit player name")
  submitScore(playerName)
}

export function submitScore(playerName){
  console.log("submit called ", playerName, variableHolder.score)
  sendLeaderboardData(playerName, variableHolder.score)
  leaderboardLimiter = 0;
  sequence4()
}

const logoSetup = () => horizontalScreen ? "" : `
<a href="https://brandnewschool.com/">
  <img class="clickable start-screen-logo-button-leaderboard"
  src="imgs/bns-leaf.png"/>
</a>`

const scoreSetup = () => horizontalScreen ? "" : `<div class="game-over-font">SCORE ${variableHolder.score}<br>HI SCORE ${variableHolder.highScore}<br><br></br>`

export function returnLeaderboard() {
  return `
        <div class="game-over-screen game-over-font">
          ${scoreSetup()}
          <h1 class="game-over-title">GAME OVER</h1>
          ${leaderboardLimiter == 1 ? highscoreMessage() : ""}
          <div class="row">
            <div class="column" style="width:20%">${numColumn}</div>
            <div class="column" style="width:30%">${nameColumn}</div>
            <div class="column" style="width:30%">${scoreColumn}</div>
          </div>
          <div>
              <div id="play-again" class="text-blink game-over-font">PLAY AGAIN!</div>

              <a
                href="https://brandnewschool.com/"
                class="clickable game-over-font"
                data-start-screen
                >RETURN TO BRAND NEW SCHOOL
              </a>
          </div>
        </div>
      `;
}
