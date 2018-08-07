//////////////////////////////////////////////////////////////////////////////////////////////
//                              OSCILLATION: POINTING VELOCITY
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let mover;

function setup() {
  createCanvas(640, 360);
  mover = new Mover();
}

function draw() {
  background("#333");
  mover.update();
  mover.checkEdges();
  mover.display();
}