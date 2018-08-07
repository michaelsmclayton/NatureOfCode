//////////////////////////////////////////////////////////////////////////////////////////////
//                               FORCES WITH MASS (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    The previous example showed only the effects of forces on a object with a mass of one. However,
  many forces (e.g. gravitation) are proportional to mass. Furthermore, things get interesting when
  you start applying forces to objects with different mass.

    Illustrating these points, this code displays 20 circles of different diameters (i.e. and therefore
    different masses) bouncing in a window. All of the circle are exposed to a gravitational force:

    F = ((M1 * M2 * G)/d^2): (Force of gravity = mass of one object (e.g. earth), multiplied by the mass of a second object (e.g. me), multiplied by the gravitational constant, divided by distance squared

    However, for our purposes of simulation, the size of the earth is pretty much constant, the distance to the earth
    is pretty much constant, and the gravitational constant is 100% constant. Therefore, we can think of the equation
    for graviation as being simply: a large constant, multiplied by the mass of an object.

    These principles explain why two balls of different mass will fall to earth at the same speed (assuming there is
    not wind resistance etc). If the graviational force is some constant * mass, and if acceleration is force / mass,
    then acceleration due to gravity is: some constant * mass / mass; The two masses here cancel each other out, meaning
    that the gravitational acceleration is equal to the constant, regardless of the mass of an object.
*/

class Mover {
  constructor(m, x, y) {
    this.mass = m; // Mass is now added as a propety of the mover
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    // Calculate the current acceleration based on the input force and the object mass
    let calculatedAcceleration = p5.Vector.div(force, this.mass);
    this.acceleration.add(calculatedAcceleration);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    // Display a circle with a diameter of mass * 16
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