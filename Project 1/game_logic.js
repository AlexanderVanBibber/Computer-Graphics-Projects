import { environment } from "./assets.js" //Import assets from assets.js
import {player } from "./assets.js"
import { road_hazard } from "./assets.js"

const hazard = road_hazard.road_cone;
const environment_box = environment.environment_box;
const player_model = player.player_car;

let camera = {x: 0, y: 0, z: 10}; //Camera Starting Coords

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = Math.min(window.innerWidth, window.innerHeight); //Find the limiting dimension of the window

function resizeCanvas() { //Resize the canvas

  canvas.width = size;
  canvas.height = size;

}

let pixelGridOn = false; //Bool that switches to custom line drawing function
let triangles = false; //Bool that switches to custom triangle rasterization function

function draw(asset, xPos, yPos, zPos, scale, color, xOffset, yOffset){ //Draw function for Parts 1 and 2

    let projectedVertices = [];

    for(let v = 0; v< asset.vertices.length; v++){ //Project our vertices
       //console.log("original position:");
       //console.log( asset.vertices[v] );

      //console.log("projected position"); 
       let canvasPos = {};
       let depth = asset.vertices[v].z - camera.z + zPos;

       canvasPos.u = ((asset.vertices[v].x - camera.x + xPos) / depth * scale);
       canvasPos.v = ((asset.vertices[v].y - camera.y + yPos) / depth * scale);
       //console.log( canvasPos );

       //console.log("scale and center"); 
       if(!pixelGridOn) { //I use different scaling factors for Part 1 and Part 2

        canvasPos.u = ((canvasPos.u * size) + (size / 2)) + xOffset;
        canvasPos.v = ((canvasPos.v * size) + (size / 2)) + yOffset;

       } else {

        canvasPos.u = Math.round(((canvasPos.u + 1) / 2) * 199) + xOffset; //Since this uses a 200 x 200 grid I scale based on that
        canvasPos.v = Math.round(((canvasPos.v + 1) / 2) * 199) + yOffset;

       }
       
       //console.log( canvasPos );

       projectedVertices.push(canvasPos);
       //console.log("---------------"); 

    }

    for(let e = 0; e < asset.edges.length; e++){ //Create edges
      
      //first vertex
      let e1 = asset.edges[e][0];
      let u1 = projectedVertices[ e1 ].u; 
      let v1 = canvas.height - projectedVertices[ e1 ].v;

      //second vertex
      let e2 = asset.edges[e][1];
      let u2 = projectedVertices[ e2 ].u;
      let v2 = canvas.height - projectedVertices[ e2 ].v;

      //console.log("Drawing edge")
      //console.log(u1, v1, u2, v2);

      if(!pixelGridOn) {

        //console.log(u1, v1, u2, v2);


        drawLine(u1, v1, u2, v2, color); //Built in JS line drawing function

      } else {

        //console.log(u1, v1, u2, v2);

        drawLineCustom(u1, v1, u2, v2, color); //Custom line drawing function
      }

    }
}


function drawCustom(asset, xPos, yPos, zPos, scale, xOffset, yOffset, layer) { //Draw function for the triangle rasterization

  let projectedVertices = [];

  for(let v = 0; v < asset.vertices.length; v++) { //Vertex projection is the same as always

    let canvasPos = {};

    let depth = asset.vertices[v].z - camera.z + zPos;

    canvasPos.z = depth;

    console.log("Depth: ", depth);

    console.log("Starting Projection Calculation for Coords: ", asset.vertices[v].x, asset.vertices[v].y, asset.vertices[v].z);
    console.log("Camera is at: ", camera.x, camera.y, camera.z);
    console.log("Translating X and Y coords: ", asset.vertices[v].x - camera.x, asset.vertices[v].y - camera.y);

    canvasPos.u = ((asset.vertices[v].x - camera.x + xPos) / depth) * scale;
    canvasPos.v = ((asset.vertices[v].y - camera.y + yPos) / depth) * scale;

    console.log("Dividing by depth: ", canvasPos.u, canvasPos.v);
    console.log("Center and Scale X: ", canvasPos.u * size, (canvasPos.u * size) + size / 2);
    console.log("Center and Scale Y: ", canvasPos.v * size, (canvasPos.v * size) + size / 2);

    //console.log("CAnvas Pos: ", canvasPos);
    canvasPos.u = Math.round(((canvasPos.u + 1) / 2) * 199) + xOffset;
    canvasPos.v = Math.round(((1 - canvasPos.v) / 2) * 199) + yOffset;

    //console.log("Size: ", size);

    console.log("Canvas Pos: ", canvasPos.u, canvasPos.v);

    //setPixelColor(Math.round(canvasPos.u), Math.round(canvasPos.v), "red");

    projectedVertices.push(canvasPos);

  }

  //console.log(projectedVertices);

  for (let e = 0; e < asset.triangles.length; e++) { //Here I define my triangles based on 3 vertices

    let color = asset.triangles[e][3]; //Color for each triangle

    const A = asset.triangles[e][0];
    const B = asset.triangles[e][1];
    const C = asset.triangles[e][2];

    const u1 = projectedVertices[A].u;
    const v1 = projectedVertices[A].v;
    const z1 = projectedVertices[A].z;

    const u2 = projectedVertices[B].u;
    const v2 = projectedVertices[B].v;
    const z2 = projectedVertices[B].z;

    const u3 = projectedVertices[C].u;
    const v3 = projectedVertices[C].v;
    const z3 = projectedVertices[C].z;


    const ABC = edgeFunction(u1, v1, u2, v2, u3, v3); //Calculate the area of the triangle

    if (ABC === 0) {

        continue;
    }


    // Find the bounding box for the triangle
    const minX = Math.max(0, Math.floor(Math.min(u1, u2, u3)));

    const maxX = Math.min(199, Math.ceil(Math.max(u1, u2, u3)));

    const minY = Math.max(0, Math.floor(Math.min(v1, v2, v3)));

    const maxY = Math.min(199, Math.ceil(Math.max(v1, v2, v3)));

    // Search the bounding box
    for (let y = minY; y <= maxY; y++) {

        for (let x = minX; x <= maxX; x++) {

            const px = x + 0.5; //Find the center of the current pixel
            const py = y + 0.5;


            const ABP = edgeFunction(u1, v1, u2, v2, px, py); //Caclculate the areas of our subtriangles

            const BCP = edgeFunction(u2, v2, u3, v3, px, py);

            const CAP = edgeFunction(u3, v3, u1, v1, px, py);


            let inside; // Handle either triangle winding


            if (ABC > 0) { //We want all the areas to be positive or all the areas to be negative

                inside = ABP >= 0 && BCP >= 0 && CAP >= 0;

            } else {

                inside = ABP <= 0 && BCP <= 0 && CAP <= 0;
            }


            if (!inside) { //I'm not quite sure why this is important but it has to be here

                continue;
            }


            const weightA = BCP / ABC; //Find our baryocentric coords
            const weightB = CAP / ABC;
            const weightC = ABP / ABC;

            const depth = weightA * z1 + weightB * z2 + weightC * z3; //Average the depths of each vertex to find the general depth of the triangle

            //I use layers to separate background from foreground. If two triangles are on the same layer and pixels I check the depth
            if (layer > pixelGridLayer[x][y] || layer === pixelGridLayer[x][y] && depth < pixelGridDepth[x][y]) {

                pixelGridDepth[x][y] = depth; //Update the depth array to track the closest triangle drawn on each pixel
                pixelGridLayer[x][y] = layer; //Update the layer array to track the triangle on the highest layer on each pixel

                setPixelColor(x, y, color); //Set the pixel color if the triangle should be drawn
            }
        }
    }
}

}

function edgeFunction(x1, y1, x2, y2, x3, y3) { //Calculates the area of a triangle

  const result = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)); //Shoelace formula

  //console.log("Result: ", result);

  return result;
}

function drawLine(x1, y1, x2, y2, color){ //Default line drawing using JS functions
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    //this is how you draw a line on the canvas 
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function drawLineCustom(x1, y1, x2, y2, color) { //Custom line drawing function

  const dx = Math.round(x2 - x1); //Figure out the distances between the two vertices in the x and y directions
  const dy = Math.round(y2 - y1);

  const steps = Math.max(Math.abs(dx), Math.abs(dy)); //Determine the number of pixels we need to traverse to connect the vertices

    for (let i = 0; i <= steps; i++) { //Loop through the pixels

        const t = i / steps; //We can derive the increase needed in either direction to reach the end vertex in the correct number of steps

        const x = x1 + dx * t; //Multiply the necessary increase by the total x distance to be traversed. If this equals the next pixel then it will be colored in
        const y = y1 + dy * t; //Do the same for y. These can be independently calculated using their respective distances

        setPixelColor(Math.round(x), Math.round(y), color); //Round the pixels to ensure they have an appropriate pixel and then color it in
    }

}

let playerXOffset = 0; //Vars for the game loop
let spawnTimer = 0;
const spawnInterval = 2000;
let hasCrashed = false;

function game_loop(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas for Part 1

    if(pixelGridOn) { //If Parts 2 or 3 are active, clear the pixel grid

      clearPixelGrid();

    }

    if(!pixelGridOn) { //Part 1 Draw the player

      draw(player_model, playerXOffset, -14, camera.z + 15, 0.4, "red", 0, -100);

    } else if (triangles) { //Part 3 Draw the player

      drawCustom(player_model, playerXOffset, -14, camera.z + 15, 0.8, 0, 30, 1);

    } else { //Part 2 Draw the player

      draw(player_model, playerXOffset, -14, camera.z + 15, 0.8, "red", 0, size - 230);

    }

    drawEnvironment(); //Draw the background

    if(moveRight && playerXOffset < 20) { //Move the player right

      playerXOffset += 1;

    }

    if(moveLeft && playerXOffset > -20) { //Move the player left

      playerXOffset -= 1;

    }

    if (!lastTime) { //Define this time variable to track the last time a hazard spawned

      lastTime = timestamp;
    }

    const deltaTime = timestamp - lastTime; //Check how long its been since a hazard last spawned
    lastTime = timestamp; //Set the last time to the timestamp
    spawnTimer += deltaTime; //Add the time passed since the last spawn to the spawn timer

    if(spawnTimer >= spawnInterval) { //Once the spawn time hits the spawn interval number, spawn a hazard

      spawnHazard();
      spawnTimer = 0;
      console.log("Spawning Hazard");

    }

    for(const hazardInstance of hazards) { //Delete a hazard once it goes behind the camera

      if(hazardInstance.z < camera.z) {

        console.log(hazards);

        hazards.shift();

      }

      else {

        if(!pixelGridOn) { //Draw hazard for Part 1

          draw(hazard, hazardInstance.x, -14, hazardInstance.z, .2, "orange", 0, 0);

        } else if (triangles) { //Draw hazard for Part 3

          drawCustom(hazard, hazardInstance.x, -14, hazardInstance.z, 0.4, 0, 0, 1);


        } else { //Draw hazard for Part 2

          draw(hazard, hazardInstance.x, -14, hazardInstance.z, 0.4, "orange", 0, size - 200);

        }


      }

      if(checkCollision(hazardInstance)) { //Check the collision between the car and hazard

        hasCrashed = true;

      }

      if(hasCrashed){break;}; //End the game loop if a crash is detected

    }

    if(pixelGridOn) { //Update the pixel grid for Parts 2 and 3

      drawPixelGrid();

    }


    requestAnimationFrame(game_loop); //Loop the function

    
} 


const cubes = [ //Data for the cube instances I use for the background (color data isn't used)
                {z: 0, color: "white"}, 
                {z: 2, color: "white"}, 
                {z: 4, color: "white"}, 
                {z: 6, color: "white"}, 
                {z: 8, color: "white"},
                {z: 10, color: "white"}, 
                {z: 12, color: "white"}, 
                {z: 14, color: "white"},
                {z: 16, color: "white"},
                {z: 18, color: "white"},
                {z: 20, color: "white"}, ];

function drawEnvironment() { //Draw the environment

  if(camera.z >= 100) { //Reset the camera's depth once it reaches 100

      camera.z = 10;

      for(let cube of cubes) { //Set the background cubes back on the reset to keep them in the same relative position

        cube.z -= 90;
      }

      for(let hazardInstance of hazards) { //Set the hazards back on the rest to keep them on the same relative position

        hazardInstance.z -= 90;
      }
    }
    else {

      if(!hasCrashed) { //Move through the environment by increasing the camera's depth

        camera.z += .3;

      }

    }

    for(let cube of cubes) { //Loop through the cube instances

      if(!triangles) {

        if (cube.z >= camera.z) { //For parts 1 and 2 draw the cubes only when they're in front of the camera

          if(!pixelGridOn) {

            draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, 0);

          } else {

            draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, size - 200);

          }

        
        } else { //Once a cube goes behind the camera set it back by 20 to spawn it behind the cube furthest from the camera

          cube.z += 20;

        } 

    } else { //For Part 3 I allow the cube to travel 1 unit behind the camera to make it look better. Allowing it to go further ruins the vertex projection

      if (cube.z >= camera.z - 1) {

        drawCustom(environment_box, 0, 0, cube.z, 1, 0, 0, 0);

      } else {

        cube.z += 20;

      }

    }
  }
}

const rows = 200; //Define the pixel grid, depth grid, and layer grid
const cols = 200;
const pixelGrid = Array.from({ length: cols }, () => Array(rows).fill("#050510"));
const pixelGridDepth = Array.from({ length: cols }, () => Array(rows).fill(999));
const pixelGridLayer = Array.from({ length: cols },() => Array(rows).fill(0));


function drawPixelGrid() { //Draw the pixel grid

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#444444";

    for(let v=0; v< rows; v++){
      for(let u=0; u<cols; u++){

        ctx.fillStyle = pixelGrid[u][v];
        ctx.fillRect(u * canvas.width / 200, v * canvas.height / 200, 5, 5);

      }
    }

  }

function setPixelColor(u,v,color){ //Set the color of an individual pixel

  if(u >= 0 && v >= 0 && u < 200 && v < 200) { //Make sure that the pixels are located within the confines of the pixel grid

    //console.log("Setting Pixel: ", u, v);

    pixelGrid[u][v] = color;

  }

}


function clearPixelGrid() { //Clear the pixel grid, used to update the grid 

  for(let i = 0; i < cols; i++) {

    pixelGrid[i].fill("#050510");
    pixelGridDepth[i].fill(999);
    pixelGridLayer[i].fill(0);
  }
}

let lastTime = 0;

const hazards = []; //Hazard array

function spawnHazard() { //Spawn the hazards on a random lane

  const lanes = [-13.5, 0, 13.5];

  const lane = lanes[Math.floor(Math.random() * lanes.length)];

  hazards.push({x: lane, z: camera.z + 100});

}

function checkCollision(hazardInstance) { //Collision check

  const xDistance = Math.abs(hazardInstance.x - playerXOffset);
  const zDistance = hazardInstance.z - camera.z;

  if(xDistance < 11 && zDistance > 8.5 && zDistance < 14) { //Make sure the car doesn't get too close to a hazard on the x and z axis

    return true;

  }

  return false;
}


let moveRight = false;
let moveLeft = false;

document.addEventListener("keydown", (event) => { //Event listeners

    if (event.key === "ArrowLeft") {
        moveLeft = true;
        //camera.x -= 0.01;
    }

    if (event.key === "ArrowRight") {
        moveRight = true;
        //camera.x += 0.01
    }

    if(event.key === "Enter") { //Enter changes the rendering mode

      if(triangles) {

          triangles = false;

          pixelGridOn = false;
      
      } else if(pixelGridOn) {

        triangles = true;

      } else {

        pixelGridOn = true;

      }
    }
});

document.addEventListener("keyup", (event) => {

    if (event.key === "ArrowLeft") {
        moveLeft = false;
    }

    if (event.key === "ArrowRight") {
        moveRight = false;
    }
});

window.addEventListener("resize", resizeCanvas); //Detect a change in the canvas size

resizeCanvas();

requestAnimationFrame(game_loop); //Main game loop

