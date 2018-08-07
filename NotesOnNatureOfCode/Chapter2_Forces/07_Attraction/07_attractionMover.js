//////////////////////////////////////////////////////////////////////////////////////////////
//                                    FORCES: ATTRACTION (MOVER)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Most of the explanation of this sketch is contained in 07_attractionAttractor.js
*/

class Mover {
  constructor(mass, x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.colour = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    noStroke();
    fill(this.colour.r, this.colour.g, this.colour.b, 255); 
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