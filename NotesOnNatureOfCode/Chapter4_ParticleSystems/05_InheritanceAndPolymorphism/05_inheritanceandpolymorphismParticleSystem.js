//////////////////////////////////////////////////////////////////////////////////////////////
//          PARTICLE SYSTEMS: INHERITANCE AND POLYMORPHISM (PARTICLE SYSTEM CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Most of the code for this segment is contained within 05_inheritanceandpolymorphismSquareParticle.js

class ParticleSystem {

  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    if (r < 0.5) { // Randomly choose between circle and square particles (50% vs. 50%)
      this.particles.push(new CircleParticle(this.origin));
    } else {
      this.particles.push(new SquareParticle(this.origin));
    }
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}