//////////////////////////////////////////////////////////////////////////////////////////////
//            PARTICLE SYSTEMS: SYSTEM OF PARTICLE SYSTEMS (PARTICLE SYSTEM CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

class ParticleSystem {
  constructor(num, position) {
    this.origin = position.copy();
    this.particles = [];
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin));
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}