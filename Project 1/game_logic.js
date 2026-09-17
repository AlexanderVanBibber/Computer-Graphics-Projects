import { environment } from "./assets.js"
import {player } from "./assets.js"
import { road_hazard } from "./assets.js"

const hazard = road_hazard.road_cone;
const environment_box = environment.environment_box;
const player_model = player.player_car;

let camera = {x: 0, y: 0, z: -10};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {

  const size = Math.min(window.innerWidth, window.innerHeight);

  canvas.width = size;
  canvas.height = size;


}

function draw(asset, xPos, yPos, zPos, scale, color, yOffset, xOffset){

    let projectedVertices = [];

    //- loop through the original vertices (X, Y, Z)
    //- and determine their position in 3D space relative to camera (x, y, z)
    //- then project them onto the 2D plane
    for(let v = 0; v< asset.vertices.length; v++){   //  you could also write it foreach...
       //console.log("original position:");  //helpful to print things
       //console.log( asset.vertices[v] );

       //console.log("projected position"); 
       let canvasPos = {};
       canvasPos.u = ((asset.vertices[v].x - camera.x + xPos) / (asset.vertices[v].z + zPos - camera.z) * scale);
       canvasPos.v = ((asset.vertices[v].y - camera.y + yPos) / (asset.vertices[v].z + zPos - camera.z) * scale);
       //console.log( canvasPos );

       //console.log("scale and center"); 
       canvasPos.u = (canvasPos.u * canvas.width + canvas.width/2) + xOffset;
       canvasPos.v = (canvasPos.v * canvas.height + canvas.height/2) + yOffset;
       //console.log( canvasPos );

       projectedVertices.push(canvasPos);
       //console.log("---------------"); 

    }

    for(let e = 0; e < asset.edges.length; e++){
      
      //first vertex
      let e1 = asset.edges[e][0]; //idx
      let u1 = projectedVertices[ e1 ].u; 
      let v1 = canvas.height - projectedVertices[ e1 ].v;

      //second vertex
      let e2 = asset.edges[e][1]; //idx
      let u2 = projectedVertices[ e2 ].u;
      let v2 = canvas.height - projectedVertices[ e2 ].v;

      //console.log("Drawing edge")
      //console.log(u1, v1, u2, v2);

      drawLine(u1, v1, u2, v2, color);
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

const cubes = [{z: -10, color: "white"}, {z: -8, color: "white"}, {z: -6, color: "white"}, {z: -4, color: "white"}, {z: -2, color: "white"}, {z: 0, color: "white"}, {z: 2, color: "white"}, {z: 4, color: "white"}, {z: 6, color: "white"}, {z: 8, color: "white"}];

let playerXOffset = 0;
let spawnTimer = 0;
const spawnInterval = 1000;
let hasCrashed = false;

function game_loop(timestamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      draw(player_model, playerXOffset, -14, camera.z + 20, 0.4, "red", -80, 0);
    }

    for(const hazardInstance of hazards) {

      if(hazardInstance.z < camera.z) {

        hazards.shift();

      }

      else {

        draw(hazard, hazardInstance.x, -14, hazardInstance.z, .2, "orange", 0, 0);

      }

      if(checkCollision(hazardInstance)) {

        console.log("X Distance:", hazardInstance.x - playerXOffset);
        console.log("Z Distance:", hazardInstance.z - camera.z);
        console.log("Hazard Z: ", hazardInstance.z);
        console.log("Camera Z: ", camera.z);

        hasCrashed = true;

      
      }

      if(hasCrashed){break;};

    }

    for(let cube of cubes) {

      if (cube.z >= camera.z) {

        draw(environment_box, 0, 0, cube.z, 1, cube.color, 0, 0);
        
      }

      else {

        cube.z += 20;
        //console.log("New cube depth");
        //console.log(cube.z);

      }
    }

    //console.log("Z value");
    //console.log(camera.z);

    requestAnimationFrame(game_loop);

    
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

  if(xDistance < 11 && zDistance > 7.5 && zDistance < 15) {

    return true;

  }

  return false;
}

resizeCanvas();

let moveRight = false;
let moveLeft = false;

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        moveLeft = true;
    }

    if (event.key === "ArrowRight") {
        moveRight = true;
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

requestAnimationFrame(game_loop);