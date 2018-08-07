//////////////////////////////////////////////////////////////////////////////////////////////
//                         OSCILLATION: SPRING FORCES (SPRING CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// An Object to describe an anchor point that can connect to "Bob" objects via a spring
// http://www.myphysicslab.com/spring2d.html

/*
    The force of a spring is calculated according to HOOKE'S LAW (named after Robert Hooke,
  a British physicist who developed the formula in 1660. Hooke originally stated the law in
  Latin: "Ut tensio, sic vis," or “As the extension, so the force”. More directly, the
  law states that "the force of the spring is directly proportional to the extension
  of the spring". In other words, if you pull on the bob a lot, the force will be strong;
  if you pull on the bob a little, the force will be weak. This can be written mathematically
  as follows:

  Fspring = -k * x * ^direction

  where:

    -1 = this means that the force will always occur in the direction that is opposite to
      the current displacement of the spring. If we stretch the spring beyond its rest length,
      there should be a force pulling it back towards the anchor. If it shrinks below its rest
      length, the force should push it away from the anchor.

    k = a constant that scales the force. More specifically, this constant reflects how
      'springy' the spring is. Is it highly elastic (high k) or quite rigid (low k)?

    x = refers to the displacement of the spring, or the difference between the current
      length and the rest length. The rest length is defined as the length of the spring
      in a state of equilibrium.

    ^direction = refers to a unit vector pointing from spring anchor to its bob

    Given this equation, we can work out the MAGNITUDE of the spring force by knowing three
  pieces of information (in addition to the springiness of the spring): the anchor of the spring
  (i.e. where it is connected), the resting length of the spring, the current length of the
  spring. To determine the current x (i.e. displacement of the spring), all we need to do is
  calculate the difference between the current length and the rest length. This can be written
  mathematically as:

  x (i.e. spring displacement) = current spring length - resting length;

    The distance between the anchor and the bob can be calculated by taking the magnitude of a
  vector that points from the anchor to the bob. This vector can be created by subtracting the
  position vector of the anchor from the position vector of the bob. The rest length can be
  stored as a constant scalar. However, we also need to find the DIRECTION of the force. Thankfully,
  we can do this easily by simply taking the unit vector of the vector pointing from the spring
  anchor to the bob.

  These steps are all followed in the code below
*/

class Spring {

  constructor(x, y, l) {
    this.anchor = createVector(x, y); // Position of the spring anchor
    this.restLength = l; // Resting length of the spring
    this.k = 0.2; // Springiness of the spring
  }
  
  // Calculate and apply spring force
  calculateAndApplySpringForce(bob) {

    /* Create a vector pointing from the spring anchor to its bob (by subtracting the
      position of the anchor from the current position of the bob) */
    let force = p5.Vector.sub(bob.position, this.anchor);

    /* Find the current distance between the bob and the anchor by taking the magnitude
      of the vector (calculated in the previous steps), which points from the anchor
      to the bob */
    let currentSpringLength = force.mag();

    /* Calculate the displacement of the spring (i.e. x) by finding the distance between
      the current spring length and its resting length */
    let currentSpringDisplacement = currentSpringLength - this.restLength;

    // Calculate spring force 
    force.normalize(); // Create a unit vector pointing from anchor to bob (^direction)
    force.mult(-1 * this.k * currentSpringDisplacement); // Apply Hooke's Law (F = k * stretch)
    bob.applyForce(force); // Apply the force to the bob
  }

  // Constrain the distance between bob and anchor between min and max
  constrainLength(b, minLength, maxLength) {
    let dir = p5.Vector.sub(b.position, this.anchor);
    let d = dir.mag();
    // Is it too short?
    if (d < minLength) {
      dir.normalize();
      dir.mult(minLength);
      // Reset location and stop from moving (not realistic physics)
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0);
      // Is it too long?
    } else if (d > maxLength) {
      dir.normalize();
      dir.mult(maxLength);
      // Reset location and stop from moving (not realistic physics)
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0);
    }
  }

  // Constrain the distance between bob and anchor between min and max
  constrainLength(bob, minlen, maxlen) {
    let dir = p5.Vector.sub(bob.position, this.anchor);
    let d = dir.mag();
    // Is it too short?
    if (d < minlen) {
      dir.normalize();
      dir.mult(minlen);
      // Reset position and stop from moving (not realistic physics)
      bob.position = p5.Vector.add(anchor, dir);
      bob.velocity.mult(0);
      // Is it too long?
    } else if (d > maxlen) {
      dir.normalize();
      dir.mult(maxlen);
      // Reset position and stop from moving (not realistic physics)
      bob.position = p5.Vector.add(this.anchor, dir);
      bob.velocity.mult(0);
    }
  }

  display() {
    stroke(255);
    fill(127);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.anchor.x, this.anchor.y, 10, 10);
  }

  displayLine(b) {
    strokeWeight(2);
    stroke(255);
    line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
  }
}
