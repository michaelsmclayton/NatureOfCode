//////////////////////////////////////////////////////////////////////////////////////////////
//                                    FORCES: ATTRACTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Most of the explanation of this sketch is contained in 07_attractionAttractor.js
*/

let movers = [], attractor,
moverMinMass = .0005 * window.innerWidth,
moverMaxMass = .002 * window.innerWidth;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(moverMinMass, moverMaxMass), random(width), random(height));
  }
  attractor = new Attractor();
}

function draw() {
  background("#111");
  attractor.display();
  for (let i = 0; i < movers.length; i++) { // Looping through all movers
    let force = attractor.calculateAttraction(movers[i]); // The Mover object is passed into the Attractor object, and a force is return
    movers[i].applyForce(force); // The previously defined force is then applied to the Mover object
    movers[i].update();
    movers[i].display();
  }
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}