//////////////////////////////////////////////////////////////////////////////////////////////
//                            OSCILLATION: PENDULAR MOTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let p;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // Make a new Pendulum with an origin position and armlength
  p = new Pendulum(createVector(width/2, 0), height*.6);

}

function draw() {
  background(51);
  p.draw();
}

function mousePressed() {
  p.clicked(mouseX, mouseY);
}

function mouseReleased() {
  p.stopDragging();
}