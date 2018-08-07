//////////////////////////////////////////////////////////////////////////////////////////////
//                      OSCILLATION: FORCES WITH ANGULAR MOTION (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    This sketch applies the concept of angular momement within the context of gravitational
  attractor (introduced in the previous chapter). In addition to orbiting around the central
  Attractor, the Movers now rotate. The angle of their rotation is changed by their angular
  velocity, and their angular velocity is changed by their angular acceleration. If we were
  being serious about this, we could model the physics of angular acceleration using the
  concepts of torque (http://en.wikipedia.org/wiki/Torque) and moment of inertia
  (http://en.wikipedia.org/wiki/Moment_of_inertia). However, such principles are a little
  beyond the scope of this course. Therefore, in a quick and dirty solution here, we will produce
  reasonable results by simply calculating angular acceleration as a function of the object’s
  acceleration vector (here, along the x dimension). In other words, if the object is accelerating
  to the right, its angular rotation accelerates in a clockwise direction; acceleration to the left
  results in a counterclockwise rotation.
*/

class Mover {

  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.angle = 0; // Initalise each Mover with an angle
    this.aVelocity = 0; // Initalise each Mover with an angular velocity
    this.aAcceleration = 0; // Initalise each Mover with an angular acceleration
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
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
    this.aAcceleration = this.acceleration.x / 10.0; // Update the angular acceleration from acceleration in the x dimension
    this.aVelocity += this.aAcceleration; // Apply that angular acceleration to the angular velocity
    this.aVelocity = constrain(this.aVelocity, -0.1, 0.1); // (contrain that velocity)
    this.angle += this.aVelocity; // Update the angle, based on the current angular velocity
    this.acceleration.mult(0);
  }

  display() {
    noStroke()
    fill(this.colour.r, this.colour.g, this.colour.b, 200); 
    rectMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, this.mass * 16, this.mass * 16);
    pop();
  }
}