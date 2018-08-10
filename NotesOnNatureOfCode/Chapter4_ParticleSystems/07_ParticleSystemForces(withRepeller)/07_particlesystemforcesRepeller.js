//////////////////////////////////////////////////////////////////////////////////////////////
//      PARTICLE SYSTEMS: APPLYING FORCES TO PARTICLES [WITH REPELLER] - (REPELLER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    This example also includes a Repeller object that pushes particles away when they get close.
  You can think of this as the opposite of the Attractor object we made in Chapter 2. However,
  this requires a bit more sophistication than consistent forces like gravity as each force an
  attractor or repeller exerts on a particle must be calculated for each particle. The calculation
  of this repulsion force is performed below in the repel(p) function of this class.
*/

class Repeller {
  constructor(x, y) {
    this.power = 500;
    this.position = createVector(x, y);
  }

  display() {
    stroke(255);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 32, 32);
  }

  repel(particle) {
     // Calculate direction of force
    let direction = p5.Vector.sub(this.position, particle.position);

     // Get the distance between particle and repeller (i.e. magnitude of previously calculated vector)
    let distance = direction.mag();

     // Normalize the direction vector (distance doesn't matter here, we just want this vector for direction)
    direction.normalize();

    // Keep distance within a reasonable range
    distance = constrain(distance, 1, 100);

    // Calculate the repelling force (which is inversely proportional to distance)
    let force = -1 * this.power / (distance * distance);

    // Multiply the direction and force vectors to get a force vector with direction
    let directedForce = direction.mult(force);

    // Return the calculated force vector
    return directedForce;
  }
};