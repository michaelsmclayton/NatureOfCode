//////////////////////////////////////////////////////////////////////////////////////////////
//                  AUTONOMOUS AGENTS: STAYING WITHIN WALLS (VEHICLE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

///////////////////////////////////////
/* MAKING NEW BEHAVIOURS (WITH THE HYPOTHETICAL EXAMPLE OF WANDERING)
///////////////////////////////////////

    In the first two examples of this chapter, we covered seeking and arriving. For both of
  these behaviours, the code boils down to calculating a single vector for each behavior: the
  desired velocity. In fact, every single one of Reynolds’s steering behaviors follows this
  same pattern (see flow field, path-following, flocking in later sections). However, these
  are examples of common steering behaviors. As long as you can come up with a vector that
  describes a vehicle’s desired velocity, then you have created your own steering behavior.
  
    For example, take the wandering behaviour. Reynolds said that “[w]andering is a type of random
  steering which has some long term order: the steering direction on one frame is related to the
  steering direction on the next frame. This produces more interesting motion than, for example,
  simply generating a random steering direction each frame.” In other words, for Reynolds, the
  goal of wandering is not simply random motion, but rather a sense of moving in one direction for
  a little while, wandering off to the next for a little bit, and so on and so forth. However,
  how could this be implemented in code?

    One way is to have a vehicle that predicts its future location as a fixed distance in front
  of it (in the direction of its velocity). The vehicle then draws an imaginary circle with radius
  r at that location, and then picks a random point along the circumference of the circle. That
  random point moves randomly around the circle in each frame of animation. Importantly, that random
  point then becomes the vehicles new target, meaning that its desired vector points in that
  direction. This process should imitate the process of wandering. However, the seemingly random
  and arbitrary nature of this solution should drive home the point that these are made-up
  behaviors are only inspired by real-life motion. You can just as easily concoct some elaborate
  scenario to compute a desired velocity yourself.
*/

///////////////////////////////////////
/* STAYING WITHIN WALLS
///////////////////////////////////////

    As an example of another behaviour we might create, lets say we want to create a steering
  behavior called “stay within walls.” We’ll define the desired velocity as:
  
    "If a vehicle comes within a distance (d) of a wall, it desires to move at maximum speed
    in the opposite direction of the wall.

    If we define the walls of the space as the edges of a P5 window and the distance d as 25,
  the code is rather simple (see below).
*/

// The "Vehicle" class
class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 4);
    this.position = createVector(x, y);
    this.maxspeed = 3;
    this.maxforce = 0.1;
    this.r = 6;
  }

  // Method to update location
  update() {
    this.velocity.add(this.acceleration); // Update velocity
    this.velocity.limit(this.maxspeed); // Limit speed
    this.position.add(this.velocity); // Update location
    this.acceleration.mult(0); // Reset accelerationelertion to 0 each cycle
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  checkBoundaries(d) {
    let desired = null;

    // Check X position
    if (this.position.x < d) { // If the x position is on the far left (i.e. < d)..
      desired = createVector(this.maxspeed, this.velocity.y); // ..change desire vector to point rightwards (with no change to y velocity)
    } else if (this.position.x > width-d) { // If the x position is on the far right (i.e. < width-d)..
      desired = createVector(-this.maxspeed, this.velocity.y); // ..change desire vector to point leftwards (with no change to y velocity)
    }

    // Check Y position
    if (this.position.y < d) { // If the y position is at the very top
      desired = createVector(this.velocity.x, this.maxspeed); // ..change desire vector to point downwards (with no change to x velocity)
    } else if (this.position.y > height - d) { // If the y position is at the very bottom
      desired = createVector(this.velocity.x, -this.maxspeed); // ..change desire vector to point upwards (with no change to x velocity)
    }

    // If there is a calculated desire force..
    if (desired !== null) {
      desired.normalize(); 
      desired.mult(this.maxspeed); // ..normalise and scale to max speed
      let steer = p5.Vector.sub(desired, this.velocity); // Get steering behaviour (i.e. desired - current velocity)
      steer.limit(this.maxforce); // Limit the force to max force
      this.applyForce(steer); // Apply force
    }
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}