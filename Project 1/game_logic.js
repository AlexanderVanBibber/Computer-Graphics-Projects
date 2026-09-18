import { environment } from "./assets.js"
import {player } from "./assets.js"
import { road_hazard } from "./assets.js"

const hazard = road_hazard.road_cone;
const environment_box = environment.environment_box;
const player_model = player.player_car;

let camera = {x: 0, y: 0, z: -10};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = Math.min(window.innerWidth, window.innerHeight);

console.log(size);

function resizeCanvas() {

  canvas.width = size;
  canvas.height = size;

}

let pixelGridOn = false;

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

        canvasPos.u = (canvasPos.u * canvas.width + canvas.width/2) + xOffset;
        canvasPos.v = (canvasPos.v * canvas.height + canvas.height/2) + yOffset;

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

        console.log(u1, v1, u2, v2);


        drawLine(u1, v1, u2, v2, color);

      } else {

        console.log(u1, v1, u2, v2);

        drawLineCustom(u1, v1, u2, v2, color);
      }

    }
}

function drawCustom(asset, zPos, scale, xOffset, yOffset) {

  let projectedVertices = [];

  for(let v = 0; v < asset.vertices.length; v++) {

    let canvasPos = {};

    canvasPos.u = ((asset.vertices[v].x - camera.x) / (asset.vertices[v].z - camera.z + zPos)) * scale;
    canvasPos.v = ((asset.vertices[v].y - camera.y) / (asset.vertices[v].z - camera.z + zPos)) * scale;

    //console.log("CAnvas Pos: ", canvasPos);
    canvasPos.u = Math.round(((canvasPos.u + 1) / 2) * 200) + xOffset;
    canvasPos.v = Math.round(((canvasPos.v + 1) / 2) * 200) + yOffset;

    console.log("Canvas Pos: ", canvasPos);

    //setPixelColor(Math.round(canvasPos.u), Math.round(canvasPos.v), "red");

    projectedVertices.push(canvasPos);

  }

  //console.log(projectedVertices);

  for(let e = 0; e < asset.edges.length; e++){
    
    //first vertex
    let e1 = asset.edges[e][0]; //idx
    let u1 = projectedVertices[ e1 ].u; 
    let v1 = 200 - projectedVertices[ e1 ].v;

    //second vertex
    let e2 = asset.edges[e][1]; //idx
    let u2 = projectedVertices[ e2 ].u;
    let v2 = 200 - projectedVertices[ e2 ].v;

    drawLineCustom(u1, v1, u2, v2, "blue");
  }

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

  /*let roundX1 = Math.round(x1);
  let roundX2 = Math.round(x2);
  let roundY1 = Math.round(y1);
  let roundY2 = Math.round(y2);*/

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

        hazards.shift();

      }

      else {

        if(!pixelGridOn) {

          draw(hazard, hazardInstance.x, -14, hazardInstance.z, .2, "orange", 0, 0);

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

const cubes = [ {z: -10, color: "white"}, 
                {z: -8, color: "white"}, 
                {z: -6, color: "white"}, 
                {z: -4, color: "white"}, 
                {z: -2, color: "white"}, 
                {z: 0, color: "white"}, 
                {z: 2, color: "white"}, 
                {z: 4, color: "white"}, 
                {z: 6, color: "white"}, 
                {z: 8, color: "white"} ];

function drawEnvironment() {

  if(camera.z >= 0) {

      camera.z = -100;

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

    for(let cube of cubes) {

      if (cube.z >= camera.z) {

        if(pixelGridOn) {

          draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, size - 200);

        } else {

          draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, 0);

        }

        
      }

      else {

        cube.z += 20;

      }
    }

    //drawCustom(environment_box, -6, 2, -33, 30);

    //drawPixelGrid();
}

const rows = 200;
const cols = 200;
const pixelGrid = Array.from({ length: cols }, () => Array(rows).fill("#050510"));

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

let moveRight = false;
let moveLeft = false;

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        moveLeft = true;
    }

    if (event.key === "ArrowRight") {
        moveRight = true;
    }

    if(event.key === "ArrowUp") {
      camera.z += 0.01;
    }

    if(event.key === "Enter") {

      if(pixelGridOn) {

        pixelGridOn = false;
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

//drawPixelGrid();
requestAnimationFrame(game_loop);
