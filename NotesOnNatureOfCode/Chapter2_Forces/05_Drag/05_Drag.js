//////////////////////////////////////////////////////////////////////////////////////////////
//                             DRAG (AIR AND FLUID RESISTANCE)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Demonstration of multiple force acting on bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

let movers = [], liquid;
function setup() {
  // Set up
  createCanvas(640, 360);
  reset(); // Function is defined below to allow restarting with every mouse click

  // State the coefficient of drag
  coefficientOfDrag = 0.1;

  // Create a liquid object
  liquidXStart = 0; liquidWidth = width;
  liquidYStart = height/2; liquidHeight = height/2;
  liquid = new Liquid(liquidXStart, liquidYStart, liquidWidth, liquidHeight, coefficientOfDrag);
}

function draw() {
  background("#00BFFF"); // Draw sky
  liquid.display(); // Draw water

  for (let i = 0; i < movers.length; i++) {

    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      let dragForce = liquid.calculateDrag(movers[i]); // Mover objects are passed into the liquid object (like in real life!)
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.1 * movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);

    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }

}

// Restart all the Mover objects randomly
function reset() {
  for (let i = 0; i < 9; i++) {
    movers[i] = new Mover(random(0.5, 3), 40 + i * 70, 0);
  }
}

// Have reset() called on all mouse presses
function mousePressed() {
  reset();
}

