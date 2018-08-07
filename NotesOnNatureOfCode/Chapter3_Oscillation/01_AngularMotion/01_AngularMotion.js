//////////////////////////////////////////////////////////////////////////////////////////////
//                              OSCILLATION: ANGULAR MOTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Before moving ahead to topics like particle systems, steering forces, and group behaviors
  (etc), it is important that we also understand TRIGONOMETRY. Trigonometry is the mathematics of
  triangles (specifically right triangle). It will allow us to think about angles and angular
  velocity and acceleration, sine and cosine functions, and calculate more complex forces in an
  environment that involves angles (e.g. a pendulum swinging or a box sliding down an incline).

    The first thing to cover radians and degrees. You’re familiar with the concept of angles 
  in degrees: A full rotation goes from 0 to 360 DEGREES. 90 degrees (a right angle) is 1/4th 
  of 360. However, P5 requires angles to be specified in RADIANS. A radian is a unit of measurement
  for angles defined by the ratio of the length of the arc of a circle to the radius of that
  circle. One radian is the angle at which that ratio equals one: (180 degrees = PI radians,
  360 degrees = 2*PI radians, 90 degrees = PI/2 radians, etc). The formula to convert from degrees
  to radians is:
  
    radians = 2*PI * (degrees/360)

    Thankfully, if we prefer to think in degrees but code with radians, P5 makes this easy. The
  radians() function automatically converts values from degrees to radians, and the constants
  PI and TWO_PI provide convenient access to these commonly used numbers (equivalent to 180 and
  360 degrees, respectively).

    In our previous sketches, we have used principles of location, velocity, and acceleration to
  move objects around a screen. As with this linear motion, we can apply these same principles to
  angular motion:

              LINEAR MOTION              |                       ANGULAR MOTION
    location = location + velocity       |   angle = angle + angular velocity
    velocity = velocity + acceleration   |   angular velocity = angular velocity + angular acceleration

    This principle is demonstrated in the code below. The baton starts off with an angle of 0, an
  angular velocity of 0, and an angular acceleration of .01. At every moment of this sketch, the
  baton-like object is rotated by the current angle (useing the rotate() function, and the radians()
  function to translate from degrees). Also at every moment of this sketch the angle is increased
  by the angular velocity, and the angular velocity is increased by the acceleration. This leads to
  a sketch in which the baton rotates very slowly at the start of the sketch, but rotates faster and
  faster as the sketch progresses.
*/

let angle = 0; // Initialise angle to 0
let angularVelocity = 0; // Initialise anglular velocity to 0
let angularAcceleration = 0.01; // Initialise anglular acceleration to 0
let currentAngleInRadians; // Initialise currentAngleInRadians

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background("#CCC");

  // Rotate the baton-like object
  translate(width / 2, height / 2); // Orient to the center of the screen
  currentAngleInRadians = radians(angle); // Convert angle in degrees to angle in radians
  rotate(currentAngleInRadians); // Rotate the baton by the current angle in radians

  // Display baton-like objects
  stroke(0); strokeWeight(5); fill(127);
  line(-60, 0, 60, 0);
  ellipse(60, 0, 16, 16);
  ellipse(-60, 0, 16, 16);

  // Change angle by velocity, and velocity by acceleration
  angle += angularVelocity;
  angularVelocity += angularAcceleration;

  // // Set angle back to origin if it passes 360
  // if (angle > 360){
  //   angle = angle - 360;
  // }
}