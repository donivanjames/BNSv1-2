# Brand-New-Game
Hey Team! This is the code repository for Brand New Game

# Updates

## Current Updates In v1-3 (1/13/2022) - The Total Overhaul Update
- Ground now randomly changes as it cycles
- Made menu animation
- Combined ALL text menus into one (title, pause, game over)
- Added worm character
- Added human character
- Added bunny character
- Changed background to new environment
- Compressed environment png for quicker loading
- Removed apple glow
- Put apples back on ground
- Environment no longer changes
- Added window tab image
- Removed "Fun Facts"
- Screen should now resize when rotating in mobile
- Death screen changed from black to green
- Removed clutter/code from old designs
- Combined Apple And Obstacle code into one file
- Changed title and run soundtrack
- Environment can now change again based on how many different background images we have
- Made minimalistic "Back To BNS" button
- Reworked "Game Over" screen
- Flashing "press space to start"
- Randomized obstacle type (puddle vs books vs trash)


## Plans For Update v1-3
- If apple spawns over an obstacle => turn it into a coin
- Score over player's head
- Increase difficulty over time
- Sound toggle
- Screen flash and sound effect when player enters school


## Plans For Update v1-4 - The Optimization Update
- Clicking again in starting animation should go straight to game (with flash included)
- Bug: hitting space after clicking in intro scene caused it to kind-of restart
- Bug: "back to bns" button not working once it's grabbed by queryselector
- Setup Gitignore and delete old files from repository
- Flashing "space to start" on opening menu
- Bug: When player lands it takes time to switch back to run frame
- change handleGameInput to handle ALL game input (could use a 0-2 switch statement instead of multiple variables)
- Could maybe only start checking boundaries when object is near player?
- Could maybe delete unused title audio once game starts
- could use the "rect" in checkApple() to assign which apple to remove
- Still need a good soundtrack
- Allow player to jump slightly before touching the ground for better response time
- Get short, loopable sound bites for audio so it loads in faster
- Customize "Tap to start" text for mobile
- Need to fix first jump 'no sound' bug
- Compress audio files
- Get mobile version working properly
- Every frame we're querying ALL obstacles, could slow down system
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- We're calling querySelectorAll twice every frame for obstacles (in update and getRects)
- Mobile: maybe don't change background color for faster processing
- Potential loading screen
- Chloe really wants werewolves involved
- Bug: there's a 300ms space after dying where pause can be activated


## Plans For Update v1-5 - The Leaderboard Update
- Leaderboard


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

- Cool stuff