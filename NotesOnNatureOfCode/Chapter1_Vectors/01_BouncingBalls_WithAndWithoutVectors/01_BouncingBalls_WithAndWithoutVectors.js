//////////////////////////////////////////////////////////////////////////////////////////////
//                           BOUNCING BALLS (WITH AND WITHOUT VECTORS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Without vector, we can animate the movement of a ball by referring the speed and
  location of the ball along the x and y dimensions (each having its only single
  variable: x, y, xspeed, yspeed). However, this requires us to name multiple variables,
  which can get confusing when thinking about additional forces like wind and friction.
  The situation gets even more complicated when thinking about movement in 3-dimensions
  (i.e. in which a z-dimension also needs to be considered).
  
  Instead, we can use single objects to refer to all the x, y, and z properties of a vector.
  For example, in this script, the position of the ball is initialised using the createVector()
  function, with the x and y coordinates given as inputs to the function. The velocity of the
  ball is also described using a single vector object.
*/

// Animation variables
const windowWidth = 800;
const windowHeight = 500;
const backgroundColour = "#DDD"
const withoutVectorColour = '#AAAAAA';
const withVectorColour = '#0055FA';
let x, y, xspeed, yspeed, position, velocity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialise variables for bouncing ball (WITHOUT vectors)
  x = 100, y = 100, xspeed = 2.5, yspeed = 2;
  // Initialise variables for bouncing ball (WITH vectors)
  position = createVector(100, 100);
  velocity = createVector(2.5, 5);
}

function draw() {
  background(backgroundColour);

  //////////////////////////////////////////////////////////////////////////////////
  // Bouncing ball (WITHOUT vectors)
  //////////////////////////////////////////////////////////////////////////////////
  x = x + xspeed; y = y + yspeed; // 1) Change x and y positions (based on x and y speed)
  if ((x > width) || (x < 0)) { // 2) If x is greater than canvas width, or less than 0
    xspeed = xspeed * -1; // 3) Reverse the direction of the x speed
  }
  if ((y > height) || (y < 0)) { // 4) If y is greater than canvas height, or less than 0
    yspeed = yspeed * -1; // 5) Reverse the direction of the y speed
  }
  stroke(0); strokeWeight(2); fill(withoutVectorColour); // Circle style
  ellipse(x, y, 48, 48); // Display circle at x and y locations
  
  //////////////////////////////////////////////////////////////////////////////////
  // Bouncing ball (WITH vectors)
  //////////////////////////////////////////////////////////////////////////////////
  position.add(velocity); // 1) Change the position vector based on velocity vector
  if ((position.x > width) || (position.x < 0)) { // 2) If position.x is greater than canvas width, or less than 0
    velocity.x = velocity.x * -1; // 3) Reverse the direction of the x velocity
  }
  if ((position.y > height) || (position.y < 0)) { // 4) If posotion.y is greater than canvas height, or less than 0
    velocity.y = velocity.y * -1; // 5) Reverse the direction of the y velocity
  }
  stroke(0); strokeWeight(2); fill(withVectorColour); // Circle style
  ellipse(position.x, position.y, 48, 48); // Display circle at position.x and position.y locations
}