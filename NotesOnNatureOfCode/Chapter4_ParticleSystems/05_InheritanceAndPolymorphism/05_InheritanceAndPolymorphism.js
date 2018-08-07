//////////////////////////////////////////////////////////////////////////////////////////////
//              PARTICLE SYSTEMS: INHERITANCE AND POLYMORPHISM (PARTICLE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Most of the code for this segment is contained within 05_inheritanceandpolymorphismSquareParticle.js

/* Particles are generated each cycle through draw(), fall with gravity and fade out over time.
  A ParticleSystem object manages a variable size list of particles */

let particleSystem;

function setup() {
  createCanvas(640, window.innerHeight);
  particleSystem = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
  background(51);
  particleSystem.addParticle();
  particleSystem.run();
}