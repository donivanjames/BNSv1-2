// TITLE SONG

let soundOn = true

let titleSong = new Audio("sounds/Music/title-song-3.mp3");
titleSong.volume = 0.07;
titleSong.loop = false;

export function soundToggle(soundButton){
  soundOn = !soundOn

  if(!soundOn) soundButton.textContent = "SOUND: OFF"
  else soundButton.textContent = "SOUND: ON"
}

export function playTitleSong() {
  if(soundOn) titleSong.play();
}

export function stopTitleSong() {
  titleSong.pause();
  titleSong.currentTime = 0;
}


// RUN SONG

let runSong = new Audio("sounds/Music/run-theme-3.mp3");
runSong.volume = 0.2;
runSong.loop = true;

export function playRunSong() {
  if(soundOn) runSong.play();
}

export function stopRunSong() {
  runSong.pause();
  runSong.currentTime = 0;
}

// PLAYER JUMP

let jumpSoundAudio = new Audio("sounds/jump-3.mp3")
jumpSoundAudio.volume = 0.15

export function jumpSound() {
  if(soundOn) jumpSoundAudio.play()
}

// PLAYER LOSE

let loseSoundAudio = new Audio("sounds/game-lose-3.mp3")

export function loseSound() {
  if(soundOn) loseSoundAudio.play()
}

// APPLE COLLECT

let collectSoundAudio = new Audio("sounds/coin-collect-2.mp3")
collectSoundAudio.volume = 0.1

export function collectSound() {
  if(soundOn) collectSoundAudio.play()
}