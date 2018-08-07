//////////////////////////////////////////////////////////////////////////////////////////////
//                      DRAG (AIR AND FLUID RESISTANCE) (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Most of the explanation of this script is container in 05_DragLiquid.js
*/

class Mover {
  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  // Newton's 2nd law: F = M * A (or A = F / M)
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  // Bounce off bottom of window
  checkEdges() {
    if (this.position.y > height) {
      this.velocity.y *= -0.9; // A little dampening when hitting the bottom
      this.position.y = height;
    }
  }
}