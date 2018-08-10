//////////////////////////////////////////////////////////////////////////////////////////////
//      PARTICLE SYSTEMS: APPLYING FORCES TO PARTICLES [WITH REPELLER] - (PARTICLE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    The previous examples in this chapter have shown how particles can be made and controlled
  within a particle system. In these examples, we tended to state that each particle had a
  constant acceleration (e.g. "this.acceleration = createVector(0, 0.05)"), However, in Chapter 2,
  we did a lot of work applying forces to objects (i.e. following Newton’s second law [F = M* A]
  that we would also like to use when creating systems of particles.

    The process of applying forces to particles is pretty similar to applying forces to single
  objects. As with our Mover class before, we need to add an applyForce(force) function to our
  Particle class. This function will recieve a force, divide that force by mass, and then add the
  force to acceleration. To make sure that acceleration does not accumulate to unnatural highs,
  we also need to reset acceleration to zero on every screen update (i.e. by multiplying acceleration
  by zero). However, in order to apply a force to every particle in a particle system, we also need
  to add an applyForce() function to the Particle System class. This topic is described in more
  detail in '07_particlesystemforcesParticleSystem.js'
*/

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
    this.mass = 1; // Let's do something better here!
  }

  run() {
    this.update();
    this.display();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Apply a force to this particle, using Newton’s second law (F = M* A)
  ///////////////////////////////////////////////////////////////////////////
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }
  
  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Set the acceleration back to zero on every screen update
    this.lifespan -= 2.0;
  }

  // Method to display
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}