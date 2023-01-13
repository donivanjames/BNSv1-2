// TITLE SONG

let soundOn = true

let titleSong = new Audio("sounds/Music/title-song-3.wav");
titleSong.volume = 0.07;
titleSong.loop = true;

export function playTitleSong() {
  if(soundOn) titleSong.play();
}

export function stopTitleSong() {
  titleSong.pause();
  titleSong.currentTime = 0;
}

// RUN SONG

let runSong = new Audio("sounds/Music/run-theme-2.mp3");
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

let jumpSoundAudio = new Audio("sounds/jump-2.wav")
jumpSoundAudio.volume = 0.15

export function jumpSound() {
  if(soundOn) jumpSoundAudio.play()
}

// PLAYER LOSE

let loseSoundAudio = new Audio("sounds/Game-Lose-2.mp3")

export function loseSound() {
  if(soundOn) loseSoundAudio.play()
}

// APPLE COLLECT

let collectSoundAudio = new Audio("sounds/Coin-Collect.mp3")
collectSoundAudio.volume = 0.1

export function collectSound() {
  if(soundOn) collectSoundAudio.play()
}