//////////////////////////////////////////////////////////////////////////////////////////////
//  PARTICLE SYSTEMS: APPLYING FORCES TO PARTICLES [WITH REPELLER] - (PARTICLE SYSTEM CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In the Particle class, we created a function which applies a force to a particle (using
  Newton's second law). However, in order to apply a force to every particle within a particle
  system, an applyForce(force) function also needs to be added to the Particle System class.
  This function loops through every particle in the system and calls particle.applyForce(force)
  to apply the current force to each particle. It might seem silly to write this function as,
  what we’re saying is “apply a force to a particle system so that the system can apply that
  force to all of the individual particles.” Nevertheless, it’s really quite reasonable. After
  all, the ParticleSystem object is in charge of managing the particles, so if we want to talk
  to the particles, we’ve got to talk to them through their manager.

    In addition to the force of gravity, this example also has a repeller object in the center
  of this sketch. As its name suggests, this object repels all particles, meaning that the closer
  they move towards the repeller object, the stronger they experience a force pushing them away
  from that object. This repulsion force is calculated and applied in this code in the applyRepeller()
  function. Further description of this process can be found in '07_particlesystemforcesRepeller.js'
*/

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Particle(x, y));
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    // Run every particle
    for (let particle of this.particles) {
      particle.run();
    }
    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  /////////////////////////////////////////////////////////////////////////
  // A function to apply a force to all Particles
  /////////////////////////////////////////////////////////////////////////
  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f); // Call the applyForce function on every particle in the system
    }
  }

  applyRepeller(repllerObject) { // Note that the Repeller object is passed into this function
    for (let particle of this.particles) {
      let force = repllerObject.repel(particle);
      particle.applyForce(force);
    }
  }

}