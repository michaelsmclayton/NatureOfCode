//////////////////////////////////////////////////////////////////////////////////////////////
//                                  FORCES: MUTUAL ATTRACTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let movers = [], G = 1;
const numberOfPlanets = 15;
function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < numberOfPlanets; i++) {
    movers[i] = new Mover(random(0.1, 2), random(width), random(height));
  }
}

function draw() {
  background("#111");
  
  // A nested loop means that gravitational interactions can be calculated between every Mover
  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        let force = movers[j].calculateAttraction(movers[i]);
        movers[i].applyForce(force);
      }
    }
    movers[i].update();
    movers[i].display();
  }
}