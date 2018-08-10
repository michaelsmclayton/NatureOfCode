//////////////////////////////////////////////////////////////////////////////////////////////
//                                  BOX2D: DISTANCE JOINTS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// All of the notes for this section can be found in '06_distancejointsPair.js'

let world; // A reference to our box2d world
let boundaries = []; // A list we'll use to track fixed objects
let pairs = []; // A list for all of our rectangles

function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(new Boundary(3 * width / 4, height - 50, width / 2 - 50, 10));

}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the pairs
  for (let i = pairs.length - 1; i >= 0; i--) {
    pairs[i].display();
    if (pairs[i].done()) {
      pairs.splice(i, 1);
    }
  }
}

function mousePressed() {
  let p = new Pair(mouseX, mouseY);
  pairs.push(p);
}