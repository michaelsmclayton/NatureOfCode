// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Array of Images for particle textures

let ps;

let imgs = [];

const urlBase = "https://raw.githubusercontent.com/shiffman/The-Nature-of-Code-Examples/master/chp04_systems/Exercise_4_12_ArrayofImages/data/"

function preload() {
  imgs[0] = loadImage(urlBase + "emitter.png");
  imgs[1] = loadImage(urlBase + "particle.png");
  imgs[2] = loadImage(urlBase + "reflection.png");
}

function setup() {
  createCanvas(640, 360);
  ps = new ParticleSystem(imgs);
}


function draw() {
  // Try additive blending!
  blendMode(ADD);
  clear();

  background(0);

  // Additive blending!
  ps.addParticle(mouseX, mouseY);


  let up = createVector(0, -0.2);
  ps.applyForce(up);

  ps.update();
}