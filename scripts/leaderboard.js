// leaderboard tutorial: https://youtu.be/MVgRYcqvm6k
import { getLeaderboardData, sendLeaderboardData, leaderboardData } from "../xhr.js";
import { variableHolder } from "./variableHandler.js";
import { sequence4 } from "./gameSetup.js";

let numColumn = `1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10`;
let nameColumn = `NAME0<br>NAME1<br>NAME2<br>NAME3<br>NAME4<br>NAME5<br>NAME6<br>NAME7<br>NAME8<br>NAME9`;
let scoreColumn = `{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}`;

getLeaderboardData()

let colors = ["630331", "EC472B", "FFC700", "CEFFDE", "003399"];
export let leaderboardLimiter

export function setupLeaderboard2() {
  numColumn = "";
  nameColumn = "";
  scoreColumn = "";
  let num = 1;
  let colorRotator = 0;
  const playerScore = variableHolder.score;
  leaderboardLimiter = 0; // checks to see if you're on the leaderboard, then substracts one so there's not 11 names


  for (let i = 0; i < Object.entries(leaderboardData.data).length - leaderboardLimiter; i++) {
    const person = Object.entries(leaderboardData.data)[i];
    console.log("i:", i)

    console.log(person)
    const name = person[1].name;
    const score = person[1].score;
    const curColor = `<div style="color:#${colors[colorRotator]};">`; // might swap this out for nth child

    if(playerScore > score && leaderboardLimiter == 0 || leaderboardData.length < 10) {
      console.log("New high score")
      numColumn += `${curColor}${num}</div>`;
      nameColumn += `${curColor}${`-YOU-`}</div>`;
      scoreColumn += `${curColor}${playerScore}</div>`;
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

  // if leaderboardLimiter = 1
  // show input
}

function scoreInput(name, score) {
return (`
<br><br><form onsubmit="submitScore(event)" class="game-over-font">
  <label for="myInput">HIGH SCORE!! ENTER INITIALS</label><br>
  <input type="text" id="playerName" name="playerName" size="6" minlength="1" maxlength="5" required value="HIGH1"><br>
  <input type="submit" value="Submit" style="display: none">
</form>
`)
}

window.submitScore = function(event) {
  event.preventDefault();
  const playerName = event.target.elements.playerName.value
  console.log("submit called ", playerName, variableHolder.score)
  sendLeaderboardData(playerName, variableHolder.score)
  leaderboardLimiter = 0;
  sequence4()
}

export function returnLeaderboard() {
  return `
        <div class="game-over-screen game-over-font">
          <h1 class="game-over-title">GAME OVER</h1>
          ${leaderboardLimiter == 1 ? scoreInput() : ""}
          <div class="row">
            <div class="column" style="width:20%">${numColumn}</div>
            <div class="column" style="width:30%">${nameColumn}</div>
            <div class="column" style="width:30%">${scoreColumn}</div>
          </div>
          <div>
              <div class="text-blink" style="color:#CEFFDE;" class="game-over-font">PLAY AGAIN!</div>
              <button style="margin-top:10%; color:#CEFFDE;" class="clickable game-over-font" onclick="myfunc()">RETURN TO BRAND NEW SCHOOL</button>
          </div>
        </div>
      `;
}
