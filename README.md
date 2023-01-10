﻿# Brand-New-Game
Hey Team! This is the code repository for Brand New Game (the development name, you can change it!)

I'm working on heavily notating a lot of the code so everyone can take a look under the hood.

I would start in index.html and follow the code from there, everything else flows down from the index file


**Game Notes**
- No cookies can be saved, so all data is "session based" and dissapears when you leave the page

---

**Big Tasks:**
- [ ] Priority: Get mobile version working properly
- [ ] Audio toggle option
- [ ] Need to clean up all the code
- [x] Make apples the only point system
- [ ] Chloe really wants werewolves involved
- [x] Make game fullscreen
- [x] Change sky and background color based on level
- [ ] Allow player to jump slightly before touching the ground

---

**Current Tasks**
- slowly increasing sound
- Next: Rework score ui and system
- Every frame we're querying ALL obstacles, could slow down system
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- We're calling querySelectorAll twice every frame for obstacles (in update and getRects)
- Priority: Get mobile version working properly
- Need to clean up all the code
- Allow player to jump slightly before touching the ground
- Need to fix first jump 'no sound' bug
- Returning a variable/object could solve variable transfer problem
- Randomize apple height
- Center player between middle and start of screen
- Need to fix first jump 'no sound' bug


**Next Task**:


## Update Log

**Update v1-2**
- Made apples the only point system
- Webpage background colors change based on environment
- Made game fullscreen
- Vertically centered game (pinned to top on mobile)
- Big fix: game was treating being off screen as lag and shooting the player forwards when returning to screen (should prevent cheating)
- Added pause function that activates when player leaves screen
- Fixed deltaTime bug that happened when focus wasnt on the window
- Optimized code by changing `math.floor` to `~~` in every file
- Moved `update()` function to its own file 
- Removed speed increase over time
- Condensed multiple speed variables into one file
- Bug fix: If you died and left the game then when you come back and restarted it would be paused
- Bug fix: if you jump while paused you'll jump when you unpause
- Replaced the word 'dino' with 'player' in Code
- Tried batch renderinig update functions but it didn't look right
- Fixed an amination bug where the player's legs would move really fast after a while
- Bug fix: dying and leaving then coming back and restarting would result in player frame stutter for a few seconds
- Changed player position
- Bug fix: obstacles weren't changing with environment
- Custom layout css for mobile
- Experimenting with new "Back To BNS" button
- Reworked score UI