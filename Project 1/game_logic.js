import { car } from "./assets.js"
import { environment } from "./assets.js"
import {player } from "./assets.js"

const car_model = car.car_model;
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

function game_loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.addEventListener("keydown", (event) => {

      event.preventDefault();
       switch (event.key) {
        case "ArrowRight":
          if(playerXOffset < 20 && camera.x < 0.70) {
            playerXOffset += 0.001;
            //camera.x += 0.001;
          }
          console.log(camera.x);
          break;
        case "ArrowLeft":
          if(playerXOffset > -20 && camera.x > -0.70) {
            playerXOffset -= 0.001;
            //camera.x -= 0.001;
          }
          console.log(playerXOffset);
          break;
      }
    });

    if(camera.z >= 0) {
      camera.z = -100;

      for(let cube of cubes) {

        cube.z -= 100;
      }
    }
    else {
      camera.z += .1;
      draw(player_model, playerXOffset, -14, camera.z + 20, 0.4, "red", -80, 0);  
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

//draw(player_model, 0, -14, 0, .5, "red", 350, 0);
resizeCanvas();
game_loop();

/*document.addEventListener("keydown", (event) => {

      event.preventDefault();
       switch (event.key) {
        case "ArrowUp":
          camera.y += 1;
          console.log("Arrow up");
          console.log(camera.y);
          break;
        case "ArrowDown":
          camera.y -= 1;
          console.log("Arrow down");
          break;
        case "ArrowRight":
          camera.x += 0.01;
          console.log("Arrow right");
          break;
        case "ArrowLeft":
          camera.x -= 0.01;
          console.log("Arrow left");
          break;
        case "+":
          camera.z += 0.01;
          break;
        case "-":
          camera.z -= 0.01;
          break;   
      }
    });

draw(car_model, 0, 0, 0, .5, "red");


/*draw(environment_box, -10, "white");
draw(environment_box, -8, "white");
draw(environment_box, -6, "white");
draw(environment_box, -4, "white");
draw(environment_box, -2, "white");
draw(environment_box, 0, "white");*/