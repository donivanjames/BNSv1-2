// leaderboard tutorial: https://youtu.be/MVgRYcqvm6k 


let numColumn = `1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10`
let nameColumn = `NAME0<br>NAME1<br>NAME2<br>NAME3<br>NAME4<br>NAME5<br>NAME6<br>NAME7<br>NAME8<br>NAME9`
let scoreColumn = `{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}<br>{SCORE}`



export function setupLeaderboard() {
    // grab top 10 from leaderboard
    // make column 1-10
    
    // make name column
    // make score column
}




export function returnLeaderboard(){
    return (
        `
  <div class="game-over-screen game-over-font">
    <h1 style="color:#EC472B; font-size: var(--game-over-title); margin-left: 1vw; margin-bottom: -1vh">GAME OVER</h1>
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