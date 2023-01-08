# Brand-New-Game
--- 
Hey Team! This is the code repository for Brand New Game (the development name, you can change it!)

I'm working on heavily notating a lot of the code so everyone can take a look under the hood.

I would start in index.html and follow the code from there, everything else flows down from the index file


### Game Notes:

No cookies can be saved, so all data is "session based" and dissapears when you leave the page

**Next:**
- [ ] Priority: Get mobile version working properly
- [ ] Need to clean up all the code
- [ ] Make apples the only point system
- [ ] Make game fullscreen
- [ ] Change sky and background color based on level
- [ ] Allow player to jump slightly before touching the ground
- [ ] Need to fix first jump 'no sound' bug


## Update Log

**Update v1-2**
- Big fix: game was treating being off screen as lag and shooting the player forwards when returning to screen (should prevent cheating)
- Added pause function that activates when player leaves screen
- Fixed deltaTime bug that happened when focus wasnt on the window
- Optimized code by changing `math.floor` to `~~` in every file
- Moved update() function to its own file
- Removed speed increase over time