//////////////////////////////////////////////////////////////////////////////////////////////
//                        AUTONOMOUS AGENTS: ARRIVING (VEHICLE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In the previous example, our vehicle moved towards the target. However, in doing so, the vehicle
  always overshot the target, oscillating back and forth around it. What if, instead, we wanted our
  vehicle to slow down as it approaches the target?

    Before we can answer this question, we should think about why the seek behavior causes the vehicle
  to fly past the target so that it has to turn around and go back. On every frame of this sketch, the
  vehicle is thinking "I want to go as fast as possible towards the target!". The vehicle wants to get
  to the target so much that it doesn’tmake any intelligent decisions about its speed relative to the
  target’s proximity. Whether it’s far away or very close, it always wants to go as fast as possible.
  In some cases, this is the desired behavior (e.g. a missile flying at a target  should always travel
  at maximum speed.) However, in many other cases (a car pulling into a parking spot, a bee landing on
  a flower), the vehicle’s thought process needs to consider its speed relative to the distance from its
  target (e.g. "I’m very far away. I want to go as fast as possible towards the target!" vs. "I’m almost
  there. I want to go very slowly towards the target!".

    How can we implement this “arriving” behavior in code? In our previous example, the magnitude of the
  desired vector was always “maximum” speed. However, if we restricted this maximum speed based on current
  distance from the target, we would make vehicles slow down when they get closer to the target. See code
  in seek() function below for further detail.

    Reynolds did describe a more sophisticated approach. Let’s imagine a circle around the target with a
  given radius. If the vehicle is within that circle, it slows down—at the edge of the circle, its desired
  speed is maximum speed, and at the target itself, its desired speed is 0. In other words, if the distance
  from the target is less than r, the desired speed is between 0 and maximum speed mapped according to that
  distance.

    The arrive behavior is a great demonstration of the magic of “desired minus velocity.” Let’s think
  about how this steering force compared to other forces we looked at in previous chapters. For example,
  in the “gravitational attraction” examples, the force always pointed directly from the object to the target
  (the exact direction of the desired velocity), whether the force was strong or weak. In contrast, the
  steering force isn’t based on just the desired velocity, but on the desired velocity relative to the
  current velocity. The steering force, therefore, is essentially a manifestation of the current velocity’s
  error: "I’m supposed to be going this fast in this direction, but I’m actually going this fast in another
  direction. My error is the difference between where I want to go and where I am currently going." Taking
  that error and applying it as a steering force results in more dynamic, lifelike simulations. With
  gravitational attraction, you would never have a force pointing away from the target, no matter how close.
  But with arriving via steering, if you are moving too fast towards the target, the error would actually
  tell you to slow down!
*/

// The "Vehicle" class
class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.maxspeed = 4;
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

  ///////////////////////////////////////////////////////////////////
  // A method that calculates a steering force towards a target
  ///////////////////////////////////////////////////////////////////
  arrive(target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    var d = desired.mag();

    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      /* map(value, start1, stop1, start2, stop2)
          [ start1: lower bound of the value's CURRENT range
            stop1: upper bound of the value's CURRENT range
            start2: lower bound of the value's TARGET range
            stop2: upper bound of the value's TARGET range ] */
      var m = map(d, 0, 100, 0, this.maxspeed); // E.g. if maxspeed = 1, and d = 50, m = .5;
      desired.setMag(m); // Set new magnitude of desired
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
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