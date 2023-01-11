# Brand-New-Game
Hey Team! This is the code repository for Brand New Game

# Updates

## Update v1-2
**Features**
- Made apples the only point system
- Webpage background colors change based on environment
- Added pause function that activates when player leaves screen
- Removed speed increase over time and slowed down player

**Design**
- Redid Landing Page
- Centered player between middle and start of screen
- Made game fullscreen
- Vertically centered desktop game (pinned to top on mobile)
- Custom background css for mobile
- Reworked score UI
- Experimenting with new "Back To BNS" button

**Bug Fixes**
- Big fix: game was treating being off screen as lag and shooting the player forwards when returning to screen (should prevent cheating)
- Fixed deltaTime bug that happened when focus wasnt on the window
- Bug fix: If you died and left the game then when you come back and restarted it would be paused
- Bug fix: if you jump while paused you'll jump when you unpause
- Fixed an amination bug where the player's legs would move really fast after a while
- Bug fix: dying and leaving then coming back and restarting would result in player frame stutter for a few seconds
- Bug fix: obstacles weren't changing with environment

**Optimizations**
- Optimized code by changing `math.floor` to `~~` in every file
- Moved `update()` function to its own file 
- Condensed multiple speed variables into one file
- Replaced the word 'dino' with 'player' in Code
- Tried batch rendering update functions but it didn't look right
- Moved all scripts into their own folders

---

# Future Updates

## Plans For Update v1-3
**Features**
- Redo backgrounds so they feed into each other
- Audio toggle option + slowly increasing sound to give player a warning (could have "start with sound" button on title page)
- Allow player to jump slightly before touching the ground for better response time
- Randomize apple height

**Design**
- Get mobile css customized
- Rework score ui and system

**Known Bugs**
- Need to fix first jump 'no sound' bug

**Optimizations**
- Too much HTML can slow down page, try to reduce amount of divs to just a couple
- Get mobile version working properly
- Every frame we're querying ALL obstacles, could slow down system
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- We're calling querySelectorAll twice every frame for obstacles (in update and getRects)
- Returning a variable/object could solve variable transfer problem

---

## Plans For Update v1-4
- Leaderboard
- Chloe really wants werewolves involved