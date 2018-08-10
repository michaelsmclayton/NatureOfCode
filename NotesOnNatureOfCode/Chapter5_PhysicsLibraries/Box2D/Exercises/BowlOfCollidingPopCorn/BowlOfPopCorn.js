//////////////////////////////////////////////////////////////////////////////////////////////
//                                 BOX2D: COLLISION LISTENING
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let world; // A reference to our box2d world
let particles = []; // A list for all of our particles
let circleBoundaries = [];

function setup() {
  createCanvas(800, 600);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Set a contact listener
  world.SetContactListener(new CustomListener()); // State that we want to listen for collisions

  // Add all boundaries (clockwise)
  circleBoundaries.push(new Boundary(width/2, .8*height)); // Bottom-middle

  // Left channel
  circleBoundaries.push(new Boundary(.825*width, .5*height));
  circleBoundaries.push(new Boundary(.775*width, .6*height));
  circleBoundaries.push(new Boundary(.7*width, .7*height));
  circleBoundaries.push(new Boundary(.6*width, .775*height));

  // Right channel
  circleBoundaries.push(new Boundary(.4*width, .775*height));
  circleBoundaries.push(new Boundary(.3*width, .7*height));
  circleBoundaries.push(new Boundary(.225*width, .6*height));
  circleBoundaries.push(new Boundary(.175*width, .5*height));



  // circleBoundaries.push(new Boundary(.3*width, .45*height));
  // circleBoundaries.push(new Boundary(.7*width, .5*height));
  // circleBoundaries.push(new Boundary(.3*width, .8*height));
  
  // circleBoundaries.push(new Boundary(width-(.3*width), .8*height));
}

function draw() {
  background("#0AF");

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (random(1) < 0.1) {
    let sz = random(10, 20);
    particles.push(new Particle((random(.6*width)+(.2*width)), 20, sz));
  }

  // Display the cirle boundaries
  for (let i = circleBoundaries.length - 1; i >= 0; i--) {
    circleBoundaries[i].display();
  }

  // Look at all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    // Particles that leave the screen, we delete them (note they have to be deleted from both the box2d world and our list
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
  

}