// The Nature of Code
//////////////////////////////////////////////////////////////////////////////////////////////
//                          INTRODUCTION TO FORCES (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Newton defined a force as "a vector that causes an object with mass to accelerate". The previous chapters
  introduced you to vectors and acceleration. The new concept here is 'OBJECT WITH MASS'.
*/

/* NEWTON'S THREE LAWS OF MOTION:

  *** Newton's First Law:

  "An object that is at rest, stays at rest. An object that is in motion, stays in motion"

    In Newton's day, the prevailing theory of motion (formulated by Aristotle) stated that if an object is moving,
  some force is required to keep it moving. However, this is incorrect as, in the absence of any forces, no force
  is required to keep an object moving. An object (such as a ball) tossed in the earth’s atmosphere slows down because
  of air resistance (a force). An object’s velocity will only remain constant in the absence of any forces or if the
  forces that act on it cancel each other out, i.e. the net force adds up to zero. This is often referred to as EQUILIBRIUM.
  The falling ball will reach a terminal velocity (that stays constant) once the force of air resistance equals the force of gravity.
  
    Given these condiserations, the previously stated law is missing an important element related to forces. We could expand
  the law by stating that: "An object at rest stays at rest and an object in motion stays in motion at a constant speed
  and direction unless acted upon by an unbalanced force"


  *** Newton's Third Law:

  "For every action there is an equal and opposite reaction"

    This law is confusing as it sounds like one force causes another. A better way of stating the law might be "Forces
  always occur in pairs. The two forces are of equal strength, but in opposite directions". However, this still causes
  confusion because it sounds like these forces would always cancel each other out. This is not the case. Remember,
  the forces act on different objects, snd just because the two forces are equal, it doesn’t mean that the movements
  are equal (or that the objects will stop moving). For example, if you push a car, the force is applied both to the
  car, and to your body. If the car can move easily, this force will push the car. If the car cannot move, this force
  may injure your hand. If you are standing on ice, this force may also push you in the opposite direction.


  *** Newton's Second Law:

  "Force equals mass times acceleration" (F = M * A)
    (and therefore: acceleration = force / mass)

    If F = M * A, then A = F / M. This shows that acceleration is directly proportional to force and inversely proportional to
  mass. This means that if you get pushed, the harder you are pushed, the faster you’ll move (accelerate). In addition, the
  bigger you are, the slower you’ll move. In P5 space, we can simulate a world in which all objects have a mass of 1. Therefore,
  in this world, A = F / 1, meaning that acceleration equals force.

  This is great news. We saw in Chapter 1 that acceleration was the key to controlling the movement of our objects. Location was
  adjusted by velocity, and velocity by acceleration. Acceleration was where it all began. However, we now learn that force is
  truly where it all begins.

  Let’s take our Mover class, with location, velocity, and acceleration. Now our goal is to be able to add forces to this object,
  perhaps saying "mover.applyForce(wind)" or "mover.applyForce(gravity)", where wind and gravity are PVectors (see below):
*/


class Mover {
  constructor() {
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) { // force is a vector (e.g. wind = createVector(0.01, 0); gravity = createVector(0, 0.1))
    // Calculate the current acceleration based on the input force and the object mass
    let calculatedAcceleration = force; // A = F / 1;
    // Add the current acceleration to the object (adding allows for accumulation of many, different forces)
    this.acceleration.add(calculatedAcceleration); // Update acceleration
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Acceleration, in our simulation, has no memory; it is simply calculated based on the environmental forces present at a single moment in time
    this.acceleration.mult(0); // Since we add all forces together at any moment, we must clear acceleration (i.e. set it to zero) before each time update() is called
  }

  display() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.position.x, this.position.y, 48, 48);
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
