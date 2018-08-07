//////////////////////////////////////////////////////////////////////////////////////////////
//                          PARTICLE SYSTEMS: AN ARRAY OF PARTICLES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

let particles = []; // This will contain an array of Particle objects

function setup() {
  createCanvas(640, window.innerHeight);
}

function draw() {
  background(51);
  for (let i=0; i<10; i++){
    particles.push(new Particle(createVector(width / 2, 50)));
  }

  // Looping through backwards to delete
  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i];
    p.updateColour(colourRange)
    p.run();
    if (p.isDead()) {
      //remove the particle
      particles.splice(i, 1);
    }
  }
}

///////////////////////////////////////////////////////
// Custom function to transition between two colours
///////////////////////////////////////////////////////
function colourTransition(finishingColour, startingColour, arrayLength){
  const range = function(start, end) {
    let step = Math.abs(start-end)/arrayLength;
    const len = Math.floor((Math.abs(start-end)) / step) + 1;
    return Array(len).fill().map((_, idx) => start + (idx * step))
  }
  let colourRange = {
    r: range(finishingColour.r, startingColour.r),
    g: range(finishingColour.g, startingColour.g),
    b: range(finishingColour.b, startingColour.b)
  }
  return colourRange;
}
let startingColour = {r: 1, g: 100, b: 250};
let finishingColour = {r: 0, g: 0, b: 1};
const arrayLength = 255;
let colourRange = colourTransition(finishingColour, startingColour, arrayLength)