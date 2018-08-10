//////////////////////////////////////////////////////////////////////////////////////////////
//                                      BOX2D: POLYGONS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// How to make a custom *convex* polygon

let world; // A reference to our box2d world
let polygons = []; // A list for all of our polygons

function setup() {
  createCanvas(640, 360);
  world = createWorld(); // Initialize box2d physics and create the world
}

function draw() {
  background(51);

  let timeStep = 1.0 / 30; // We must always step through time!
  world.Step(timeStep, 10, 10); // 2nd and 3rd arguments are velocity and position iterations

  // Display all the boxes
  for (let i = polygons.length - 1; i >= 0; i--) {
    polygons[i].display();
    if (polygons[i].done()) {
      polygons.splice(i, 1);
    }
  }
}

function mousePressed() {
  let cs = new CustomShape(mouseX, mouseY);
  polygons.push(cs);
}