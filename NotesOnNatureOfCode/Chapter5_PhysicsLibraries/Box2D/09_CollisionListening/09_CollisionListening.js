//////////////////////////////////////////////////////////////////////////////////////////////
//                                 BOX2D: COLLISION LISTENING
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let world; // A reference to our box2d world
let particles = []; // A list for all of our particles
let boundaries = []; // A list for all boundaries

function setup() {
  createCanvas(800, 600);

  // Initialize box2d physics and create the world
  world = createWorld();

  //////////////////////////////////////////////////
  /// Set a contact listener
  //////////////////////////////////////////////////
  world.SetContactListener(new CustomListener()); // State that we want to listen for collisions

  // Add all boundaries
  boundaries.push(new Boundary(0, height-5, width*2, 20));
  boundaries.push(new Boundary(0, .3*height, .8*width, 20));
  boundaries.push(new Boundary(width, .6*height, .8*width, 20));
}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (random(1) < 0.1) {
    let sz = random(4, 8);
    particles.push(new Particle(random(width), 20, sz));
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Look at all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    // Particles that leave the screen, we delete them
    // (note they have to be deleted from both the box2d world and our list
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

}