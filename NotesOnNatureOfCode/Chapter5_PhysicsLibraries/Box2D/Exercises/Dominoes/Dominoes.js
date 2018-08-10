//////////////////////////////////////////////////////////////////////////////////////////////
//                                  BOX2D: STATIC BOXES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
const boundaryHeight = 20;

// A list for all of our rectangles
let boxes = [];
let firstLineHeight = .3;
let secondLineHeight = .5;
let thirdLineHeight = .7;

let balls = [];

function setup() {
  createCanvas(640, window.innerHeight);

  console.log((secondLineHeight*height)-(firstLineHeight*height))

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(0, firstLineHeight*height, width*1.75, boundaryHeight));
  boundaries.push(new Boundary(.7*width, secondLineHeight*height, width-20, boundaryHeight));
  boundaries.push(new Boundary(.2*width, thirdLineHeight*height, width*1.75, boundaryHeight));

  // Add walls
  boundaries.push(new Boundary(0, (thirdLineHeight*height)-.1*height, .075*width, .2*height));
  //boundaries.push(new Boundary(width, (thirdLineHeight*height)-.25*height, .075*width, .5*height));


  // Add first load of dominoes
  for (i=0.06; i<.85; i+=.075){
    boxes.push(new Domino(i*width, firstLineHeight*height));
  }

  // Add second load of dominoes (with ball)
  for (i=0.43; i<.95; i+=.075){
    boxes.push(new Domino(i*width, secondLineHeight*height));
  }
  balls.push(new Ball(0.3*width, secondLineHeight*height));

  // Add third load of dominoes (with ball)
  for (i=0.17; i<.9; i+=.075){
    boxes.push(new Domino(i*width, thirdLineHeight*height));
  }
  //balls.push(new Ball(0.3*width, secondLineHeight*height));
  
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

  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }

  // Display all the balls
  for (let i = 0; i < balls.length; i++) {
    balls[i].display();
  }
}

function mousePressed() {
  boxes[0].pushDomino()
}