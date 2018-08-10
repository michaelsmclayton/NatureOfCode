//////////////////////////////////////////////////////////////////////////////////////////////
//                                  BOX2D: STATIC BOXES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
const boundaryWidth = (window.innerWidth/6);
const boundaryHeight = 20;

// A list for all of our rectangles
let boxes = [];

function setup() {
  createCanvas(640, window.innerHeight);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(.3*width, .4*height, boundaryWidth, boundaryHeight));
  boundaries.push(new Boundary(.7*width, .6*height, boundaryWidth, boundaryHeight));

  let b = new Box(width / 2, 30);
  boxes.push(b);
}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Boxes fall from the top every so often
  if (random(1) < 0.2) {
    let b = new Box(width / 2, 30);
    boxes.push(b);
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}