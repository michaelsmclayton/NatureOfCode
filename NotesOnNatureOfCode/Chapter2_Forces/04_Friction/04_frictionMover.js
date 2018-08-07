//////////////////////////////////////////////////////////////////////////////////////////////
//                               FRICTION (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Most of the explanation of this script is container in 04_DrawFriction.js
*/

class Mover {
  constructor(m, x, y) {
    this.mass = m;
    this.baseAcceleration = createVector(3, 0); // Here, a constant, rightward force is applied to the objects
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = this.baseAcceleration // The starting acceleration is set to this base acceleration
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0).add(this.baseAcceleration);
  }

  display() {
    stroke(0);
    strokeWeight(3);
    fill(255);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}