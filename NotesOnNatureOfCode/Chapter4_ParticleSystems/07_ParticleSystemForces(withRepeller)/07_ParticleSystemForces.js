//////////////////////////////////////////////////////////////////////////////////////////////
//              PARTICLE SYSTEMS: APPLYING FORCES TO PARTICLES [WITH REPELLER]
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let ps;
let repeller;

function setup() {
  createCanvas(640, 360);
  ps = new ParticleSystem(createVector(width / 2, 50)); // Add a particle system
  repeller = new Repeller(width / 2, height / 2); // Add a repeller object
}

function draw() {
  background(51);
  ps.addParticle(mouseX, mouseY); // Add a new particle where the mouse currently is

  // Apply gravity force to all Particles
  let gravity = createVector(0, 0.1);
  ps.applyForce(gravity);

  // Apply a repulsion force away from the Repeller object
  ps.applyRepeller(repeller); // Note that the Repeller object is passed into this ParticleSystem function

  // Display repeller and particles
  repeller.display();
  ps.run();

}