//////////////////////////////////////////////////////////////////////////////////////////////
//                         PARTICLE SYSTEMS: AN ARRAY OF PARTICLES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// let particleSystem;

// function setup() {
//   createCanvas(640, window.innerHeight);
//   particleSystem = new ParticleSystem(createVector(width / 2, 50), {r:100,g:100,b:100});
// }

// const emissionsPerFrame = 1;

// function draw() {
//   background(51);
//   for (let i=0; i<emissionsPerFrame; i++){
//     particleSystem.addParticle();
//   }
//   particleSystem.run();
// }

let systems = [];

const emissionsPerFrame = 5;

color = "rgb(255,255,255)"

let white = {r:200,g:200,b:200},
    black = {r:100,g:100,b:100},
    blue = {r:79,g:92,b:144},
    green = {r:79,g:144,b:79},
    orange = {r:250,g:100,b:5},
    red = {r:144,g:79,b:79};

function setup() {
  createCanvas(640, window.innerHeight);

  //////////////////////////////
  // VERTICAL
  //////////////////////////////

  // Top to bottom
  systems.push(new ParticleSystem(createVector(width/2, 50), blue, createVector(0, 0.05)));

  // Bottom to top
  systems.push(new ParticleSystem(createVector(width/2, height-50), white, createVector(0, -0.05)));

  //////////////////////////////
  // DIAGONAL
  //////////////////////////////

  // // Left to top
  // systems.push(new ParticleSystem(createVector(50, height/2), black, createVector(.05, -.05)));

  // // Left to bottom
  // systems.push(new ParticleSystem(createVector(50, height/2), white, createVector(.05, .05)));

  // // Right to top
  // systems.push(new ParticleSystem(createVector(width-50, height/2), white, createVector(-0.05, -.05)));

  // // Right to top
  // systems.push(new ParticleSystem(createVector(width-50, height/2), black, createVector(-0.05, .05)));

  
  // //////////////////////////////
  // // HORIZONTAL
  // //////////////////////////////

  // // Left to right
  // systems.push(new ParticleSystem(createVector(50, height/2), white, createVector(0.05, 0)));
  
  // // Right to left
  // systems.push(new ParticleSystem(createVector(width-50, height/2), white, createVector(-0.05, 0)));

}

function draw() {
  background(51);
  for (let i = 0; i < systems.length; i++) {
    for (let e=0; e < emissionsPerFrame; e++){
      systems[i].addParticle();
    }
    systems[i].run();
  }
}