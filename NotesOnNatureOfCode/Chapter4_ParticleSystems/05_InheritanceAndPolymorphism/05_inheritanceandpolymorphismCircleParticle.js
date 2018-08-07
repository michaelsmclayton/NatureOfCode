//////////////////////////////////////////////////////////////////////////////////////////////
//          PARTICLE SYSTEMS: INHERITANCE AND POLYMORPHISM (CIRCLE PARTICLE SUBCLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Most of the code for this segment is contained within 05_inheritanceandpolymorphismSquareParticle.js

// Child class constructor
class CircleParticle extends Particle {

  // // Apparently this is optional in P5 (although it isn't in Processing)
  // constructor(position) {
  //   super(position) // Call the constructor function from the parent class
  // }

  // Add a display method, which prints each particle as a circle
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }
}