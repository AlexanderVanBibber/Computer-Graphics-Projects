import { environment } from "./assets.js"
import {player } from "./assets.js"
import { road_hazard } from "./assets.js"
import { road_lines } from "./assets.js"

const hazard = road_hazard.road_cone;
const environment_box = environment.environment_box;
const player_model = player.player_car;
const road_line = road_lines.line;

let camera = {x: 0, y: 0, z: 0};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = Math.min(window.innerWidth, window.innerHeight);

console.log(size);

function resizeCanvas() {

  canvas.width = size;
  canvas.height = size;

}

let pixelGridOn = false;
let triangles = false;
let killGameLoop = false;

function draw(asset, xPos, yPos, zPos, scale, color, xOffset, yOffset){

    let projectedVertices = [];

    for(let v = 0; v< asset.vertices.length; v++){
       //console.log("original position:");
       //console.log( asset.vertices[v] );

      //console.log("projected position"); 
       let canvasPos = {};
       let depth = asset.vertices[v].z - camera.z + zPos;

       canvasPos.u = ((asset.vertices[v].x - camera.x + xPos) / depth * scale);
       canvasPos.v = ((asset.vertices[v].y - camera.y + yPos) / depth * scale);
       //console.log( canvasPos );

       //console.log("scale and center"); 
       if(!pixelGridOn) {

        canvasPos.u = ((canvasPos.u * size) + (size / 2)) + xOffset;
        canvasPos.v = ((canvasPos.v * size) + (size / 2)) + yOffset;

       } else {

        canvasPos.u = Math.round(((canvasPos.u + 1) / 2) * 199) + xOffset;
        canvasPos.v = Math.round(((canvasPos.v + 1) / 2) * 199) + yOffset;

       }
       
       //console.log( canvasPos );

       projectedVertices.push(canvasPos);
       //console.log("---------------"); 

    }

    for(let e = 0; e < asset.edges.length; e++){
      
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


        drawLine(u1, v1, u2, v2, color);

      } else {

        //console.log(u1, v1, u2, v2);

        drawLineCustom(u1, v1, u2, v2, color);
      }

    }
}


function drawCustom(asset, xPos, yPos, zPos, scale, xOffset, yOffset, layer) {

  let projectedVertices = [];

  for(let v = 0; v < asset.vertices.length; v++) {

    let canvasPos = {};

    let depth = asset.vertices[v].z - camera.z + zPos;

    canvasPos.z = depth;

    //console.log("Depth: ", depth);

    //console.log("Starting Projection Calculation for Coords: ", asset.vertices[v].x, asset.vertices[v].y, asset.vertices[v].z);
    //console.log("Camera is at: ", camera.x, camera.y, camera.z);
    //console.log("Translating X and Y coords: ", asset.vertices[v].x - camera.x, asset.vertices[v].y - camera.y);

    canvasPos.u = ((asset.vertices[v].x - camera.x + xPos) / depth) * scale;
    canvasPos.v = ((asset.vertices[v].y - camera.y + yPos) / depth) * scale;

    //console.log("Dividing by depth: ", canvasPos.u, canvasPos.v);
    //console.log("Center and Scale X: ", canvasPos.u * size, (canvasPos.u * size) + size / 2);
    //console.log("Center and Scale Y: ", canvasPos.v * size, (canvasPos.v * size) + size / 2);

    //console.log("CAnvas Pos: ", canvasPos);
    canvasPos.u = Math.round(((canvasPos.u + 1) / 2) * 199) + xOffset;
    canvasPos.v = Math.round(((1 - canvasPos.v) / 2) * 199) + yOffset;

    //console.log("Size: ", size);

    //console.log("Canvas Pos: ", canvasPos.u, canvasPos.v);

    //setPixelColor(Math.round(canvasPos.u), Math.round(canvasPos.v), "red");

    projectedVertices.push(canvasPos);

  }

  //console.log(projectedVertices);

  for (let e = 0; e < asset.triangles.length; e++) {

    let color = asset.triangles[e][3];

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


    // Triangle area
    const ABC = edgeFunction(
        u1, v1,
        u2, v2,
        u3, v3
    );

    if (ABC === 0) {
        continue;
    }


    // Bounding box
    const minX = Math.max(
        0,
        Math.floor(Math.min(u1, u2, u3))
    );

    const maxX = Math.min(
        199,
        Math.ceil(Math.max(u1, u2, u3))
    );

    const minY = Math.max(
        0,
        Math.floor(Math.min(v1, v2, v3))
    );

    const maxY = Math.min(
        199,
        Math.ceil(Math.max(v1, v2, v3))
    );

    console.log("ABC: ", ABC);
    console.log(minX, maxX, minY, maxY);


    // Rasterize
    for (let y = minY; y <= maxY; y++) {

        for (let x = minX; x <= maxX; x++) {

            // Pixel center
            const px = x + 0.5;
            const py = y + 0.5;


            const ABP = edgeFunction(
                u1, v1,
                u2, v2,
                px, py
            );

            const BCP = edgeFunction(
                u2, v2,
                u3, v3,
                px, py
            );

            const CAP = edgeFunction(
                u3, v3,
                u1, v1,
                px, py
            );


            // Handle either triangle winding
            let inside;

            if (ABC > 0) {
                inside =
                    ABP >= 0 &&
                    BCP >= 0 &&
                    CAP >= 0;
            } else {
                inside =
                    ABP <= 0 &&
                    BCP <= 0 &&
                    CAP <= 0;
            }


            if (!inside) {
                continue;
            }


            // Barycentric coordinates
            const weightA = BCP / ABC;
            const weightB = CAP / ABC;
            const weightC = ABP / ABC;


            // Interpolate depth
            const depth =
                weightA * z1 +
                weightB * z2 +
                weightC * z3;

            //console.log("Depth: ", depth, pixelGridDepth[x][y]);
            // Z-buffer
            if (layer > pixelGridLayer[x][y] || layer === pixelGridLayer[x][y] && depth < pixelGridDepth[x][y]) {

                pixelGridDepth[x][y] = depth;
                pixelGridLayer[x][y] = layer;

                //console.log("Drawing triangle");

                setPixelColor(x, y, color);
            }
        }
    }
}

}

function edgeFunction(x1, y1, x2, y2, x3, y3) {

  const result = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1));

  //console.log("Result: ", result);

  return result;
}

function drawLine(x1, y1, x2, y2, color){
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    //this is how you draw a line on the canvas 
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function drawLineCustom(x1, y1, x2, y2, color) {

  const dx = Math.round(x2 - x1);
  const dy = Math.round(y2 - y1);

  const steps = Math.max(Math.abs(dx), Math.abs(dy));

    for (let i = 0; i <= steps; i++) {

        const t = i / steps;

        const x = x1 + dx * t;
        const y = y1 + dy * t;

        setPixelColor(Math.round(x), Math.round(y), color);
    }

}

let playerXOffset = 0;
let spawnTimer = 0;
const spawnInterval = 1000;
let hasCrashed = false;

function game_loop(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(pixelGridOn) {

      clearPixelGrid();

    }

    if(!pixelGridOn) {

      draw(player_model, playerXOffset, -14, camera.z + 15, 0.4, "red", 0, -100);

    } else if (triangles) {

      drawCustom(player_model, playerXOffset, -14, camera.z + 15, 0.8, 0, 30, 1);

    } else {

      draw(player_model, playerXOffset, -14, camera.z + 15, 0.8, "red", 0, size - 230);

    }

    drawEnvironment();  

    if(moveRight && playerXOffset < 20) {

      playerXOffset += 1;

    }

    if(moveLeft && playerXOffset > -20) {

      playerXOffset -= 1;

    }

    if (!lastTime) {

      lastTime = timestamp;
    }

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    spawnTimer += deltaTime;

    if(spawnTimer >= spawnInterval) {

      spawnHazard();
      spawnTimer = 0;
      console.log("Spawning Hazard");

    }

    for(const hazardInstance of hazards) {

      if(hazardInstance.z < camera.z) {

        console.log(hazards);

        hazards.shift();

      }

      else {

        if(!pixelGridOn) {

          draw(hazard, hazardInstance.x, -14, hazardInstance.z, .2, "orange", 0, 0);

        } else if (triangles) {

          drawCustom(hazard, hazardInstance.x, -14, hazardInstance.z, 0.4, 0, 0, 1);

        } else {

          draw(hazard, hazardInstance.x, -14, hazardInstance.z, 0.4, "orange", 0, size - 200);

        }


      }

      if(checkCollision(hazardInstance)) {

        hasCrashed = true;

      }

      if(hasCrashed){break;};

    }

    if(pixelGridOn) {

      drawPixelGrid();

    }


    requestAnimationFrame(game_loop);

    
}


const cubes = [ 
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

function drawEnvironment() {

  if(camera.z >= 100) {

      camera.z = 1;

      for(let cube of cubes) {  

        cube.z -= 100;
      }

      for(let hazardInstance of hazards) {

        hazardInstance.z -= 100;
      }
    }
    else {

      if(!hasCrashed) {

        camera.z += .5;

      }

    }

    if(triangles) {

      drawCustom(environment_box, 0, 0, camera.z, 1, 0, 0, 0);

    }

    for(let cube of cubes) {

      if (cube.z > camera.z) {

        if(!pixelGridOn) {

          draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, 0);

        } else if (triangles) {

          drawCustom(environment_box, 0, 0, cube.z, 1, 0, 0, 0);

        } else {

          draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, size - 200);

        }

        
      }

      else {

        cube.z += 20;

      }
    }
}

const rows = 200;
const cols = 200;
const pixelGrid = Array.from({ length: cols }, () => Array(rows).fill("#050510"));
const pixelGridDepth = Array.from({ length: cols }, () => Array(rows).fill(999));
const pixelGridLayer = Array.from({ length: cols },() => Array(rows).fill(0));


let seePixelOutline = false;

function drawPixelGrid() {

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#444444";

    for(let v=0; v< rows; v++){
      for(let u=0; u<cols; u++){

        ctx.fillStyle = pixelGrid[u][v];
        ctx.fillRect(u * canvas.width / 200, v * canvas.height / 200, 5, 5);

        if( seePixelOutline ){
          ctx.strokeRect(u*5, v*5, 5, 5);
        }

      }
    }

  }

function setPixelColor(u,v,color){

  if(u >= 0 && v >= 0 && u < 200 && v < 200) {

    //console.log("Setting Pixel: ", u, v);

    pixelGrid[u][v] = color;

  }

}


function clearPixelGrid() {

  for(let i = 0; i < cols; i++) {

    pixelGrid[i].fill("#050510");
    pixelGridDepth[i].fill(999);
    pixelGridLayer[i].fill(0);
  }
}

let lastTime = 0;

const hazards = [];

function spawnHazard() {

  const lanes = [-13.5, 0, 13.5];

  const lane = lanes[Math.floor(Math.random() * lanes.length)];

  hazards.push({x: lane, z: camera.z + 100});
}

function checkCollision(hazardInstance) {

  const xDistance = Math.abs(hazardInstance.x - playerXOffset);
  const zDistance = hazardInstance.z - camera.z;

  if(xDistance < 11 && zDistance > 8.5 && zDistance < 14) {

    return true;

  }

  return false;
}

function game_loop_test(timestamp) {

  pixelGridOn = true;

  clearPixelGrid();

  drawEnvironment();

  drawPixelGrid();

  console.log(camera.z);

  requestAnimationFrame(game_loop_test);
}

let moveRight = false;
let moveLeft = false;

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        moveLeft = true;
        //camera.x -= 0.01;
    }

    if (event.key === "ArrowRight") {
        moveRight = true;
        //camera.x += 0.01
    }

    if(event.key === "k") {
      killGameLoop = true;
    }

    if(event.key === "Enter") {

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

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
//setPixelColor(0, 0, "red");
//draw(player_model, 0, -14, camera.z + 20, 0.4, "red", 0, 500);
//draw(hazard, 0, -14, 0, 1, "orange", 0, size - 150);
//draw(player_model, -20, -14, 20, 1, "red", 500, 200);
//drawCustom(hazard, 5, 1, 0, 0);
if(!killGameLoop) {

  requestAnimationFrame(game_loop);

}
//requestAnimationFrame(game_loop_test);
//clearPixelGrid();
//drawCustom(player_model, -20, -14, 10, 0.8, 50, 0, 0);
//draw(player_model, 20, -20, 20, 1, "red", -50, size - 130);
//drawPixelGrid();

