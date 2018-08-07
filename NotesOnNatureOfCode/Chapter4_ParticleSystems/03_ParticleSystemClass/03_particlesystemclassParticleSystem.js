//////////////////////////////////////////////////////////////////////////////////////////////
//               PARTICLE SYSTEMS: AN ARRAY OF PARTICLES (PARTICLE SYSTEM CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In addition to the Particle class created in this sketch, we can also create a ParticleSystems
  class. This will allow us to remove the bulky logic of looping through all particles from the
  main sketch script, as well as open up the possibility of easily having more than one particle
  system (see Systems of Particle Systems next).

    A ParticleSystem is initialised with an origin point, and an array to store the particule in
  this system. It will have functions to addParticle() [i.e. pushing a new particle into the
  particle system], and to update each particle by invoking its run() function (i.e.. changing
  location, lifespan, colour, etc).
*/

class ParticleSystem {
  constructor(position, startingColour, acceleration) {
    this.origin = position.copy(); // Set the emitter position of this particle system (taking a copy so position doesn't change)
    this.particles = []; // Initialise an array to store all of the particles in this system.
    
    //??????????????????????????????????????????
    // Custom code to have colour change over time
    //??????????????????????????????????????????
    this.startingColour = startingColour; // this.startingColour
    this.finishingColour = {r: 0, g: 0, b: 0};
    const arrayLength = 255;
    this.colourRange = this.colourTransition(this.finishingColour, this.startingColour, arrayLength)

    this.acceleration = acceleration;
  }

  // Function to add a particle to the system
  addParticle() {
    this.particles.push(new Particle(this.origin, this.startingColour, this.acceleration));
  }

  run() {
    // Run every particle
    for (let particle of this.particles) {     // ES6 for..of loop
      particle.run();
      // ?? Custom code to update each particle colour
      // particle.updateColour(this.colourRange)
    }

    // Filter removes any elements of the array that do not pass the test   // Without ES6 arrow code would look like:
    this.particles = this.particles.filter(particle => !particle.isDead()); // this.particles = this.particles.filter(function(particle) {return !particle.isDead();});
  }

  ///////////////////////////////////////////////////////
  // Custom function to transition between two colours
  ///////////////////////////////////////////////////////
  colourTransition(finishingColour, startingColour, arrayLength){ 
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
}