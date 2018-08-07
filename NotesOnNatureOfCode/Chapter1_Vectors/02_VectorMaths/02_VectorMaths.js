//////////////////////////////////////////////////////////////////////////////////////////////
//                          MATHEMATICAL OPERATIONS WITH VECTORS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  In Processing, the addition operator + is reserved for primitive values (integers,
  floats, etc.) only. Processing doesn’t know how to add two PVector objects together
  any more than it knows how to add two PFont objects or PImage objects. Fortunately
  for us, the PVector class includes functions for common mathematical operations:
      • add() — add vectors
      • sub() — subtract vectors
      • mult() — scale the vector with multiplication
      • div() — scale the vector with division
      • mag() — calculate the magnitude of a vector
      • setMag() - set the magnitude of a vector
      • normalize() — normalize the vector to a unit length of 1
      • limit() — limit the magnitude of a vector
      • heading() — the 2D heading of a vector expressed as an angle
      • rotate() — rotate a 2D vector by an angle
      • lerp() — linear interpolate to another vector
      • dist() — the Euclidean distance between two vectors (considered as points)
      • angleBetween() — find the angle between two vectors
      • dot() — the dot product of two vectors
      • cross() — the cross product of two vectors (only relevant in three dimensions)
      • random2D() - make a random 2D vector
      • random3D() - make a random 3D vector
*/
/*
    WARNING ABOUT USING MATHS OPERATIONS TO CREATE NEW VECTORS
      Image that you have two vectors: X and Y. You want to make a
      new vector W from the sum of X and Y. You might assume that you
      could write the following code:
        w = X.add(Y);
      However, this would be wrong! The add function on the vector class
      does not return a vector. Instead, to perform this operation, you
      would have to write something like:
        w = createVector(X.x+Y.x, X.y+Y.y)
*/

// Animation variables
const windowWidth = 800;
const windowHeight = 500;
const backgroundColour = "#555"

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Draw background and get current mouse location
  background(backgroundColour);
  let mouse = createVector(mouseX,mouseY); // A vector that points to the mouse position
  let center = createVector(width/2,height/2); // A vector that points to the center of the window
  
  /////////////////////////////////////////////////////////////////
  // Vector addition and subtraction
  /////////////////////////////////////////////////////////////////
  /*
    When adding two vectors together, we simply add both x’s and both y’s. For example,
    if we create a new vector W from the sum of vectors X and Y, this means that:
      Wx = Xx + Yx, and , Wy = Xy + Yy;
    The equivalent is also true for subtraction
  */
  mouse.sub(center); // Subtract the center vector from the mouse vector
  // mouse.add(center); // Add the center vector from the mouse vector (which we don't want to do)

  /////////////////////////////////////////////////////////////////
  // Vector multiplication
  /////////////////////////////////////////////////////////////////
  /*
    Moving on to multiplication, we have to think a little bit differently. When we
    talk about multiplying a vector, what we typically mean is scaling a vector. If we
    wanted to scale a vector to twice its size or one-third of its size (leaving its
    direction the same), we would say: “Multiply the vector by 2” or “Multiply the
    vector by 1/3.” Note that we are multiplying a vector by a scalar, a single number,
    not another vector.
    To scale a vector, we multiply each component (x and y) by a scalar. For example,
    if we wanted to create a new vector W, that was a vector X multiplied by scaler N,
    this means that:
      Wx = Xx * N, and, Wy = Xy * N;
  */
  mouse.mult(0.5); // The vector is now half its original size (multiplied by 0.5).
  //mouse.div(2);// — Equivalent to above, using division rather than multiplication

  /////////////////////////////////////////////////////////////////
  // Vector magnitude
  /////////////////////////////////////////////////////////////////
  /*
      The magnitude of a vector is the length of that vector. Imagine a
      right-angle triangle made from x and y coordinates. The magnitude
      of the vector is the hypotenuse of that triangle (i.e. (a^2 + b^2)
      = c^2; c = sqrt(a^2 + b^2). Using this formula, we can calculate
      the magnitude of a vector W as:
        ||W|| = sqrt(Wx*Wx + Wy*Wy)
  */
  let mouseMagnitude = mouse.mag(); // Get the magnitude of the mouse vector
  
  /////////////////////////////////////////////////////////////////
  // Normalising vectors
  /////////////////////////////////////////////////////////////////
  /*
      Normalizing refers to the process of making something “standard”.
      In the case of vectors, let’s assume that a standard vector has a
      length of 1. To normalize a vector, therefore, is to take a vector
      of any length and, keeping it pointing in the same direction, change
      its length to 1, turning it into what is called a 'unit vector'.
      For any given vector A, its unit vector is calculated as follows:
          Â (unit vector of A) = A / ||A||;
      In other words, to normalize a vector, simply divide each component
      by its magnitude. This is pretty intuitive. Say a vector is of length
      5 (with sides of length 3 and 4). Well, 5 divided by 5 is 1. So,
      looking at our right triangle, we then need to scale the hypotenuse
      down by dividing by 5 (5/5) In that process the sides shrink, divided
      by 5 as well (3/5, 4/5, 5/5).
  */
  let normaliseVector = false;
  if (normaliseVector) {
    mouse.normalize(); // Normalize the vector
    mouse.mult(100); // Multiply unit vector by 100 (meaning that the length is always 100)
  }

  /////////////////////////////////////////////////////////////////
  // Plot the current mouse vector magnitude
  fill(255); stroke(0); rect(0,0,mouseMagnitude,10);

  // Display the current mouse vector
  translate(width/2,height/2); strokeWeight(2); stroke(255);
  line(0,0,mouse.x,mouse.y);
}
