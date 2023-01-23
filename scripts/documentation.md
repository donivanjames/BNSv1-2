This is the current working docuentation for Brand New Game, or maybe Worm Dash. The name is still being decided.

The game is a fairly simple browser runner. You jump over obstacles and collect apples. Despite that the game is still fairly intensive, especially with all the high res art involved. CSS rendering is currently the most expensive task and I'm looking into solutions to render faster. It's still a little too heavy for mobile browsers to run.

The game starts in **index.html** which leads to **styles.css** and **script.js**.

1. **script.js** sets up the initial game, which leads to introScene.js 
2. **introScene.js** handles the long scrolling intro at the beggining of the game - it leads back to script.js which then kicks off update.js
3. **update.js** handles the running of the actual game and listens for player input from the playerInput.js file. Everything else in the game branches from the update function.