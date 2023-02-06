# Brand-New-Game
Hey Team! This is the code repository for Brand New Game

This is the current working documentation for Brand New Game, or maybe Worm Dash. The name is still being decided.

The game is a fairly simple browser runner. You jump over obstacles and collect apples. Despite that the game is still fairly intensive, especially with all the high res art involved. CSS rendering is currently the most expensive task and I'm looking into solutions to render faster. It's still a little too heavy for mobile browsers to run.

The game starts in **index.html** which leads to **styles.css** and **script.js**.

1. **script.js** sets up the initial game, which leads to introScene.js 
2. **introScene.js** handles the long scrolling intro at the beggining of the game - it leads to playerInput.js which then kicks off update.js
3. **update.js** handles the running of the actual game and listens for player input from the playerInput.js file. Everything else in the game branches from the update function.

## Designs to 100% finish before Monday:
Score not reappearing mobile
Score too far on the left 

I unfortunatly had to cut the intro scene on mobile. It would work completly fine on my test mobile browser, but when actually implemented on my iphone it would do something COMPLETLY random every time (differet scroll distances, differnet speeds, different boy positions). It's just not a problem I could solve in time over the weekend.

I gave touchscreen decices the ability to tap anywhere to start the game just in case there are any weird loading bugs for mobile, so they don't get stuck on the title screen. Browser devices are still spacebar only. We can remove it if you want
**~~Make custom variable to detect screen rotation~~**
**Private Github repositories**
- Front end
- Server
**Match rest of UI to Google Drive designs**
mobile
- title screen
- title positioning
- ~~swap out reference image~~
- game over
  - ~~add logo~~
desktop
- title screen
  - ~~text~~
  - ~~swap out reference image~~
  - ~~color~~
- game over
  - container position
**Custom score text for mobile**
- ~~make score dissapear on sides on mobile~~
- ~~make score appear on sides for desktop~~
- ~~make score appear in column on mobile~~
- ~~make score dissapear in colum on desktop~~
**~~Customize "Tap to start" text for mobile~~**
**Bug: when mobile is horizontal the search bar cuts off intro sequence**
- Hide search bar
- Screen needs to ignore sidebars
Bug: refreshing mobile title screen almost always randomizes speed and scroll distance
Bug: there's a 300ms space after dying where pause can be activated
~~Bug: Refreshing screen on vertical mobile locks screen position~~
Stop objects from spawning back to back
Stop apples from spawning on top of obstacles


## ALL remaining designs:
**Gameplay:**
Allow player to jump slightly before touching the ground for better response time (Celeste game keeps track of jump inputs and activates once you actually hit the ground)
Better worm jump response
Add custom coin sound and "lunch money" text
Make coins 50 points
Parallax opening sequence
Add "+100" text over player's head when he collects an apple
Screen flash and sound effect when player enters school (similar to classic pokemon when player enters a building)
**Bugs:**
introScene script still runs after intro scene (console log textScroller to see bug)
**Optimizations:**
Foreach movement functions in obstacles.js are the longest runtime (lets try adding them to a div and just moving that div (maybe even add them to the ground div))
Offload intense JS onto web workers/multi-threading
JavaScript Optimizations: https://web.dev/optimize-javascript-execution/
Moving both grounds in one div may increase performance
Set up GZip compression and look into Minify
We're calling querySelectorAll twice every frame for apples (in update and getRects)
Potential loading screen for bad internet
Potential safeguard for if database doesnt load properly


## Update v1-5 - The Launch Update
- Added "Lazy Loading"
- Centralized all variables
- Centralized all font sizes
- Added Leaderboard Music
- Made opening title sequence fullscreen
- Tons of other stuff - no longer updating logs here

---

## Update v1-4 - The Optimization Update
**Features**
- Other obstacles except the one you hit dissapear on game over screen
- You can now skip intro scene
- Added sound toggle
- Apples that spawn on obstacles become coins
- Game gets harder over time

**Design**
- Increased apple frequency
- Redid opening scene
- Increased apple speeds
- Added werewolves
- Added worm pet
- Made worm pet jump
- Swapped out bunny for kid
- Added aspect ratio to opening scene so that it performs the same on any monitor
- Adjusted coin spawn position
- Added High Score UI
- Added UFO

**Bug Fixes**
- Hopefully fixed safari pixel scaling
- Fixed first jump 'no sound' bug
- Worm pet jump frames werent resetting on game restart
- Bug fix: Couldnt unpause with click, only esc
- Bug fix: clicking outside screen during intro scene would start game paused
- Bug fix: When obstacles reached the halfway point they twitched back a little

**Optimizations**
- *Compressed Soundtrack from 6.42mb to 1.12mb*
- Completly redid input system
- Completly redid CSS so everything scales the same 
- Added .gitignore and deleted old images to save space
- Obstacle boundaries now only start checking when close to the player
- Obstacles are handled in a list instead of calling querySelectorAll every frame

---

## Update v1-3 (1/13/2022) - The Total Overhaul Update
**Features**
- Background now randomly changes as it cycles
- Randomized obstacle type (puddle vs books vs trash)
- If an apple spawns over an obstacle it turns it into a coin

**Design**
- Made scrolling menu animation
- Added worm character
- Added human character
- Added bunny character
- Removed apple glow
- Put apples back on ground
- Added window tab image
- Removed "Fun Facts"
- Death screen changed from black to green
- Changed title and run soundtrack
- Made minimalistic "Back To BNS" button
- Reworked "Game Over" screen
- Flashing "press space to start"

**Bug Fixes**
- Screen should now resize when rotating in mobile

**Optimizations**
- Combined ALL text menus into one (title, pause, game over)
- Compressed environment png for quicker loading
- Removed clutter/code from old designs
- Combined Apple And Obstacle code into one file

---

## Update v1-2 (1/10/2023) - The First Good Version
**Features**
- Made apples the only point system
- Webpage background colors change based on environment
- Added pause function that activates when player leaves screen
- Removed speed increase over time and slowed down player (to reduce nausea)
- Randomized apple heights

**Design**
- Redid Landing Page
- Added apple glow
- Centered player between middle and start of screen
- Made game fullscreen
- Vertically centered desktop game
- Reworked score UI (work in progress)
- Experimenting with new "Back To BNS" button
- Moved "Fun Facts" to Game Over screen

**Mobile Design**
- Mobile game is pinned to top of screen
- Mobile background is solid color
- Game is now resized when phone is turned (nevermind, still not quite working, pushing to v1-3)

**Bug Fixes**
- Big fix: game was treating being off screen as lag and shooting the player forwards when returning to screen (should prevent cheating)
- Fixed deltaTime bug that happened when focus wasnt on the window
- Bug fix: If you died and left the game then when you come back and restarted it would be paused
- Bug fix: if you jump while paused you'll jump when you unpause
- Fixed an amination bug where the player's legs would move really fast after a while
- Bug fix: dying and leaving then coming back and restarting would result in player frame stutter for a few seconds
- Bug fix: obstacles weren't changing with environment
- Mobile: "Back To BNS" button wasnt aligning properly

**Optimizations**
- Optimized code by changing `math.floor` to `~~` in every file
- Moved `update()` function to its own file 
- Condensed multiple speed variables into one file
- Replaced the word 'dino' with 'player' in Code
- Tried batch calling update functions but it didn't look right
- Moved all scripts into their own folders
- Obstacles are now removed faster after leaving screen
- Start screen and title screens are deleted after starting to reduce divs

---

## Plans For v2

- Werewolves
- Little worm/bunny friend
- Boundary fixes 