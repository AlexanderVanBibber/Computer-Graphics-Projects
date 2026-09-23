# Computer-Graphics-Projects
This repo is for CS5160 Computer Graphics \
Name: Alex VanBibber \
Bio: I am a 5th year Computer Science Major at UC

Project 1:  https://alexandervanbibber.github.io/Computer-Graphics-Projects/ \
A small game made to demonstrate different ways of rendering 3D graphics via a point perspective projection.

CONTROLS:

 - Left and Right Arrow Keys to move

 - Press the Enter key to switch rendering modes (There are 3 you can cycle through)

FILES:

References

 - Contains images used to design and create the player character, which was by far the most complicated asset


assets.js

 - Contains the vertex, edge, and triangle data for the player character, hazards, and environment


index.html

 - Contains basic html metadata and then immediately directs itself to the JavaScript code


game_logic.js

 - Contains all of the code for rendering the assets as well as the main game loop, hazard spawn behavior, collision detection, and event listeners


style.css

 - Contains basic metadata to center the game in the middle of the screen


AI USAGE:

 - Helped create the timing mechanism for the spawn behavior of the hazards
 - Helped with the random lane assignment for each hazard upon spawning
 - Helped with the event listeners to make them more responsive
 - Helped write the more repetitive code in the triangle rasterization function (Finding the min/max X and Y, calculating triangle sub-areas)
 - Helped add layers to the Z buffer logic
 - Created the color palettes for the car and hazards, assigned colors to each triangle to give it a realistic appearance
