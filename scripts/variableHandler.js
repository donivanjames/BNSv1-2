// holds most of the game variables

export const windowElements = {
    mainUIElem: document.querySelector("[data-main-ui]"),
    worldElem: document.querySelector("[data-world]"),
    scoreElem: document.querySelectorAll("[data-score]"),
    
    preGameScreen: document.querySelectorAll("[data-start-screen]"),
    player: document.querySelector("[data-player]"),
    scorePopup: document.querySelector("[data-score-popup]"),
    pet: document.querySelector("[data-pet]"),
}

const newVariables = {
    score: 0,
    applesCollected: 0,
    pause: false,
    gameGoing: false, // used to prevent misclicks in handleStart(), handleLose(), and pause()
    inputNum: 1,
}

let highScore = 0;
export let variableHolder = {}

export const resetVariables = () => {
    variableHolder = Object.assign(variableHolder, newVariables)
    console.log(variableHolder)
}
