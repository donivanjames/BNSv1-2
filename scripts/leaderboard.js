// leaderboard tutorial: https://youtu.be/MVgRYcqvm6k 


let numColumn = `1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10`
let nameColumn = `NAME0<br>NAME1<br>NAME2<br>NAME3<br>NAME4<br>NAME5<br>NAME6<br>NAME7<br>NAME8<br>NAME9`
let scoreColumn = `{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}`

let scores = {
  1: {"phoeb": 1200,},
  2: {"chloe": 1100,},
  3: {"brdgt": 1100,},
  4: {"chloe": 1100,},
  5: {"don": 1100,},
  6: {"chloe": 1100,},
  7: {"brdgt": 1000,},
  8: {"chloe": 800,},
  9: {"phoeb": 600,},
  10: {"don": 600,}
}

let colors = ["630331", "EC472B", "FFC700", "CEFFDE", "003399"]


export function setupLeaderboard() {
  numColumn = ""
  nameColumn = ""
  scoreColumn = ""
  let output = ""
  let num = 1
  let colorRotator = 0

  Object.entries(scores).forEach(person => {
    const [key, value] = person
    const curColor = `<div style="color:#${colors[colorRotator]};">`

    numColumn += `${curColor}${num}</div>`;
    const capName = `${Object.keys(value)}`
    nameColumn += `${curColor}${capName.toUpperCase()}</div>`;
    scoreColumn += `${curColor}${Object.values(value)}</div>`;

    colorRotator += 1
    if(colorRotator >= colors.length) colorRotator = 0
    num++
  })
}




export function returnLeaderboard(){
    return (
      `
        <div class="game-over-screen game-over-font">
          <h1 class="game-over-title">GAME OVER</h1>
          <div class="row">
            <div class="column" style="width:20%">${numColumn}</div>
            <div class="column" style="width:30%">${nameColumn}</div>
            <div class="column" style="width:30%">${scoreColumn}</div>
          </div>
          <div>
              <div class="text-blink" style="color:#CEFFDE;" font-size: var(--fs-med);>PLAY AGAIN!</div>
              <button style="margin-top:10%; color:#CEFFDE;" class="clickable game-over-font" onclick="myfunc()">RETURN TO BRAND NEW SCHOOL</button>
          </div>
        </div>
      `
    )
}