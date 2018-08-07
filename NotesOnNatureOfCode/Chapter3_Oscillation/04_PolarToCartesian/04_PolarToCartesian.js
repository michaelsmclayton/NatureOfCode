//////////////////////////////////////////////////////////////////////////////////////////////
//                        OSCILLATION: POLAR TO CARTESIAN COORDINATES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// PolarToCartesian
// Convert a polar coordinate (r,theta) to cartesian (x,y):
// x = r * cos(theta)
// y = r * sin(theta)

/*
    So far in all our sketches, we have to specify a pixel location, a set of X AND Y COORDINATES.
  These coordinates are known as CARTESIAN COORDINATES.

    Another useful coordinate system, known as POLAR COORDINATES, describes a point in space as an
  angle of rotation around the origin and a radius from the origin. Thinking about this in terms
  of a vector:

  • Cartesian coordinate => the x,y components of a vector
  • Polar coordinate  => the magnitude (length) and direction (angle) of a vector

    In P5, all objects are always drawn using Cartesian coordinates. However, we can use trigonometry
  to translate from Polar to Cartesian coordinates.

                  |                   . POLAR: (r, θ); CARTESIAN: (x, y)
                  |                  /|
                  |                 / |
                  |                /  |     sin(θ) = y/r;   y = r * sine(theta)
          y-axis  |               /   | y   cos(θ) = x/r;   x = r * cosine(theta)
                  |              /    |
                  |             /     |
                  | angle (r) ./θ/r___|
                  |________________x_____
                          x-axis
  
    This type of conversion can be useful in certain applications. For example, to move a shape
  along a circular path using Cartesian coordinates is not so easy. With polar coordinates, on
  the other hand, it’s simple: increment the angle!
*/

let radius; // Radius of the line (magnitude of the vector)
let theta; // Angle of the line (direction of the vector)

function setup() {
  createCanvas(640, 600);
  // Initialize all values
  radius = height * 0.45;
  theta = 0;
}

function draw() {
  background("#222");

  // Translate the origin point to the center of / somewhere on the screen
  translate(width/2, height/1.5);

  //////////////////////////////////////////////////////
  // Convert polar to cartesian
  //////////////////////////////////////////////////////
  let x = radius * cos(theta);
  let y = radius * sin(theta);

  // Draw the ellipse at the cartesian coordinate
  ellipseMode(CENTER);
  fill("#06A");
  stroke(255);
  strokeWeight(5);
  line(0, 0, x, y);
  ellipse(x, y, 48, 48);

  // Increase the angle over time
  theta += 0.02;
  radius -= Math.cos(theta)*2;
}