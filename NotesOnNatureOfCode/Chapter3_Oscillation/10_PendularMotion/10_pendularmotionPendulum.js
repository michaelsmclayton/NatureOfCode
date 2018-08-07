//////////////////////////////////////////////////////////////////////////////////////////////
//                            OSCILLATION: PENDULAR MOTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A Simple Pendulum Class, which includes functionality for user can click and drag the pendulum

/*
    A pendulum is a BOB suspended from a PIVOT. The bob is connected to the pivot by the
  ARM. In this example, given that the length of the arm is constant, the position of the
  bob can always be described by it's angle (θ) relative to the pendulum at rest (i.e. at an
  angle of 0). At each point, the bob of the pendulum is exposed to gravity (Fg). This pulls the
  bob down. However, as the bob is attached to the pivot, the bob cannot fall. The tension
  force of the arm keeps the bob accelerating towards the pendulum’s rest state (i.e. pointing
  down). The bob therefore also experiences a force (Fp) that is perpendicular to the arm of
  the pendulum (and which points in direction that the pendulum is swinging).
  
    Importantly, given that a right-angle triangle can be made by combining the force of
  gravity with the angle (θ) of the pendulum compared to its rest, we can use trigonometry
  to calculate the force of Fp.
  
    If Fp is the side opposite to the angle θ, and if Fg is the hypotenuse of this triangle,
  and if sine(θ) equal Fp / Fg (using SOACAHTOA):

  Fp = -1 * Fg * sine(θ) // Calculates the swinging force of the pendulum

    As before, we don't have to use the exact Fg experienced on earth. For our purposes, we
  can just use an arbitrary constant. Therefore, if we combine this constant with the force
  of Fp that was calculated in the previous step, we can use use Newton’s second law to
  calculate the angular acceleration at each moment. As Acceleration = Force / Mass, and if
  we assume that this pendulum has a mass of 1, the angular acceleration must be directly
  equal to the force of Fp. Therefore, we simply set the angular acceleration to Fg * sine(θ).

    We could end things here. However, another important feature that can influence the
  motion of a pendulum is the length of its arm: the longer the arm, the slower the
  acceleration. Therefore, to simulate a pendulum more accurately, we need to divide the
  perpendicular force by that arm length (r). Therefore, a more accurate equation for Fp would be:

  Fp = (-1 * Fg * sin(angle)) / r;

    Finally, a real-world pendulum is going to experience some amount of friction (at the
  pivot point) and air resistance. Although we have previously modelled the effect of
  friction in Chapter 2, we can loosely simulate the resistance experienced by the pendulum
  by simply reducing the angular velocity during each cycle. For example, the following code
  (when added to the draw cycle) reduces the velocity by 1.5% (or multiplies it by 99.5%)
  during each frame of animation:

  this.aVelocity *= 0.995;; // Arbitrary damping
*/

// Note this is an ideal world scenario with no tension in the
// pendulum arm, a more realistic formula might be:
// Angular Acceleration = (g / R) * sine(theta)

// For a more substantial explanation, visit:
// http://www.myphysicslab.com/pendulum1.html


// This constructor could be improved to allow a greater variety of pendulums
class Pendulum {

  constructor(origin, armLength) {
    // Fill all variables
    this.origin = origin.copy();
    this.position = createVector();
    this.armLength = armLength; // Length of the pendulum
    this.angle = PI / 4; // Starting angle

    this.aVelocity = 0.0; // Angular velocity
    this.aAcceleration = 0.0; // Angular acceleration
    this.damping = 0.995; // Arbitrary damping value added to simulate friction and air resistance
    this.ballr = 48.0; // Arbitrary ball radius

    this.dragging = false;
  }

  draw() {
    this.update();
    this.drag(); // for user interaction
    this.display();
  }

  /////////////////////////////////////////////////////////////////////
  // Function to calculate the force of pendulum and implement angular acceleration
  /////////////////////////////////////////////////////////////////////
  update() {
    // As long as we aren't dragging the pendulum, let it swing!
    if (!this.dragging) {
      // aAcceleration = Fp = (-1 * Fg * sin(angle)) / r;
      let gravity = 0.4; // Fg (arbitrary constant)
      let forceOfPendulum = (-1 * gravity / this.armLength) * sin(this.angle); // Fp: -1 pushes the bob down (Calculate acceleration [see: http://www.myphysicslab.com/pendulum1.html])
      this.aAcceleration = forceOfPendulum; // Set acceleration to Fp
      this.aVelocity += this.aAcceleration; // Increment velocity
      this.aVelocity *= this.damping; // Added to simulate friction and air resistance
      this.angle += this.aVelocity; // Increment angle
    }
  }

  display() {
    // Find position of pendulum bob (translating from Polar to Cartesian coordinates)
    let xPosition = this.armLength * cos(this.angle); // derived from cos(θ) = x/r
    let yPosition = this.armLength * sin(this.angle); // derived from sine(θ) = y/r
    this.position.set(yPosition, xPosition, 0); // Polar to cartesian conversion
    this.position.add(this.origin); // Add the origin location to move the pendulum so that its position is relative to that origin

    // Draw the pendulum 
    stroke(255);
    strokeWeight(2);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y); // Draw the arm
    ellipseMode(CENTER); // Draw the ball
    fill(127);
    if (this.dragging) fill(200);
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }


  ///////////////////////////////////////////////////////////////
  // The methods below are for mouse interaction
  ///////////////////////////////////////////////////////////////

  // This checks to see if we clicked on the pendulum ball
  clicked(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballr) {
      this.dragging = true;
    }
  }

  // This tells us we are not longer clicking on the ball
  stopDragging() {
    this.aVelocity = 0; // No velocity once you let go
    this.dragging = false;
  }

  drag() {
    // If we are draging the ball, we calculate the angle between the
    // pendulum origin and mouse position
    // we assign that angle to the pendulum
    if (this.dragging) {
      let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY)); // Difference between 2 points
      this.angle = atan2(-1 * diff.y, diff.x) - radians(90); // Angle relative to vertical axis
    }
  }
}