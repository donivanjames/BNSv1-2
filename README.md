# Brand-New-Game
Hey Team! This is the code repository for Brand New Game (the development name, you can change it!)

I'm working on heavily notating a lot of the code so everyone can take a look under the hood.

I would start in index.html and follow the code from there, everything else flows down from the index file


**Game Notes**
No cookies can be saved, so all data is "session based" and dissapears when you leave the page

**Big Tasks:**
- [ ] Priority: Get mobile version working properly
- [ ] Need to clean up all the code
- [ ] Make apples the only point system
- [ ] Chloe really wants werewolves involved
- [ ] Make game fullscreen
- [ ] Change sky and background color based on level
- [ ] Allow player to jump slightly before touching the ground
- [ ] Need to fix first jump 'no sound' bug

**Current Tasks**
- Every frame we're querying ALL obstacles, could slow down system
- A lot of Math.floor (~~) in script.js, might be able to condense it to 1 or two times
- We're calling querySelectorAll twice every frame for obstacles (in update and getRects)
- Priority: Get mobile version working properly (could maybe batch render alternate batches of commands with deltaTime)
- Need to clean up all the code
- Allow player to jump slightly before touching the ground
- Need to fix first jump 'no sound' bug
- Returning a variable/object could solve variable transfer problem
- Randomize apple height
- Center player between middle and start of screen
- Bug: dying and leaving then coming back and restarting will result in player frame stutter for a few seconds, could be related to deltaTime


## Update Log

**Update v1-2**
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