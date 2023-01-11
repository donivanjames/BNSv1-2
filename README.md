# Brand-New-Game
Hey Team! This is the code repository for Brand New Game

# Updates

## Updatev 1-3
- Removed apple glow
- Environment no longer changes 


## Plans For Update v1-3
**Features**
- Increase difficulty over time
- Audio toggle option + slowly increasing sound to give player a warning (could have "start with sound" / "start without sound" button on title page)
- Allow player to jump slightly before touching the ground for better response time

**Design**
- Get short, loopable sound bites for audio so it loads in faster
- Incorporate new Figma art
- Minimalistic back to bns button
- Rework score ui and system
- Customize "Tap to start" text for mobile

**Known Bugs**
- Need to fix first jump 'no sound' bug
- Turning screen on mobile doesn't trigger resize

**Optimizations**
- Too much HTML can slow down page, try to reduce amount of divs to just one or two (could just apply different css elements to one UI div)
- Get mobile version working properly
- Every frame we're querying ALL obstacles, could slow down system
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- We're calling querySelectorAll twice every frame for obstacles (in update and getRects)
- Mobile: maybe don't change background color for faster processing
- Potential loading screen
- Remove shadows and glows for mobile

---

## Update v1-2 (1/10/2023)
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

# Future Updates

## Plans For Update v1-4
- Leaderboard
- Chloe really wants werewolves involved

## Plans For v2

- Backgrounds feed into each other