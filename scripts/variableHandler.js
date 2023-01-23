

const newVariables = {
    score: 0,
    applesCollected: 0,
    pause: false,
    gameGoing: false, // used to prevent misclicks in handleStart(), handleLose(), and pause()
    //inputNum: 1,
}

export let variableHolder = {}

export const resetVariables = () => {
    variableHolder = {}
    variableHolder = Object.assign(variableHolder, newVariables)
    console.log(variableHolder)
}
