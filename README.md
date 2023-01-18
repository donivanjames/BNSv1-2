# Brand-New-Game
Hey Team! This is the code repository for Brand New Game

# Updates

## Update v1-4 - The Optimization Update
**Features**
- You can now skip intro scene
- Added sound toggle
- Apples that spawn on obstacles become coins

**Design**
- Redid opening scene
- Swapped out bunny for kid
- Added aspect ratio to opening scene so that it performs the same on any monitor
- Adjusted coin spawn position
- Added High Score UI

**Bug Fixes**
- Hopefully fixed safari pixel scaling
- Fixed first jump 'no sound' bug
- Bug fix: Couldnt unpause with click, only esc
- Bug fix: clicking outside screen during intro scene would start game paused
- Bug fix: When obstacles reached the halfway point they twitched back a little

**Optimizations**
- *Compressed Soundtrack from 6.42mb to 1.12mb*
- Completly redid input system
- Added .gitignore and deleted old images to save space
- Obstacle boundaries now only start checking when close to the player
- Obstacles are handled in a list instead of calling querySelectorAll every frame

---

**Next:**
- Get the worm in there!

## Plans For Update v1-4/5
- Look into reducing css rendering time
- Experiement with making hallway background/ceiling transparent so there's not as much to render
- Score over player's head
- Even shorter guy 
- Increase difficulty over time
- Bobbing apples?
- Need to customize intro screen size for every device (a ui container within main container could work universally)
- Screen flash and sound effect when player enters school
- could use the "rect" in checkApple() to assign which apple to remove (currently collecting an apple removes them all becuase it reuses the obstacle code)
- Allow player to jump slightly before touching the ground for better response time
- Get short, loopable sound bites for audio so it loads in faster
- Customize "Tap to start" text for mobile
- Get mobile version working properly
- Every frame we're querying ALL obstacles, could slow down system
- We're calling querySelectorAll twice every frame for apples (in update and getRects)
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- Mobile: maybe don't change background color for faster processing
- Potential loading screen
- Bug: there's a 300ms space after dying where pause can be activated
- Leaderboard 

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