

const newVariables = {
    score: 0,
    applesCollected: 0,
    //pause: false,
    //inputNum: 1,
}

export let variableHolder = {}

export const resetVariables = () => {
    variableHolder = {}
    variableHolder = Object.assign(variableHolder, newVariables)
    console.log(variableHolder)
}

export const addAppleCollected    = () => variableHolder.applesCollected += 1;
export const updateScoreVariables = () => variableHolder.score = variableHolder.applesCollected * 1000;