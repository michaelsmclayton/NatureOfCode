//////////////////////////////////////////////////////////////////////////////////////////////
//                      PARTICLE SYSTEMS: SYSTEM OF PARTICLE SYSTEMS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    We now know how to create an individual Particle object that is contained inside of
  a system of Particle objects (which we call a “particle system". However, if we can have
  a system of Particle objects (all stored in an array), and if Particle System is also an
  object, we can also make a SYSTEM OF PARTICLE SYSTEMS

    This generation of multiple particle systems is achieved in this sketch. EVERY TIME THE
  MOUSE IS CLICKED ON SCREEN, A NEW PARTICLE SYSTEM IS GENERATED WITH AN ORIGIN AT THE CLICK
  LOCATION. In the script, in system is held in an array called systems. On each screen refresh,
  a particle is added to each particle system, and in system is run (i.e. .run() function called),
  which in turn updates all the particles in a given ParticleSystem.
*/

let systems = []; // Initalise an array to store all active ParticleSystems

function setup() {
  displayText();
  createCanvas(window.innerWidth, window.innerHeight*.8);
}

function draw() { // On each screen refresh...
  background(255);
  for (let i = 0; i < systems.length; i++) {
    systems[i].addParticle(); // Add a new particle to each system
    systems[i].run(); // Initiate a system run (which, in turn, updates all particles within the system)
  }
}

function mousePressed() { // When the mouse is pressed..
  systems.push(new ParticleSystem(1, createVector(mouseX, mouseY))); // ..add a new ParticleSystem to the systems array
}

function displayText() { // Text to tell users to click
  let text = createP("CLICK TO ADD PARTICLE SYSTEMS");
  text.style("font-family", "Arial");
  text.style("color", "#FFFFFF");
  text.style("font-size", "18pt");
  text.position((window.innerWidth/2)-180, 0);
}