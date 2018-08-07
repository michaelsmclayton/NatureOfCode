//////////////////////////////////////////////////////////////////////////////////////////////
//                           INTRODUCTION TO FORCES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let m;
function setup() {
  createCanvas(640, 360);
  m = new Mover();
}

function draw() {
  background("#AAD");

  let wind = createVector(0.03, 0);
  let gravity = createVector(0, 0.1);

  m.applyForce(wind);
  m.applyForce(gravity);


  m.update();
  m.display();
  m.checkEdges();
}
