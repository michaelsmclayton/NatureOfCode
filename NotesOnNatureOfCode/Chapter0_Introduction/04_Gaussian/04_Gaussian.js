//////////////////////////////////////////////////////////////////////////////////////////////
//                                  GAUSSIAN DISTRIBUTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Animation variables
const windowWidth = 800;
const displayDimensions = 2; // 1-2
const windowHeight = 500;
const backgroundColour = "#DDD";
const dotGreyValue = 0; // 0-255
const dotOpacityValue = 20; // 0-255
const dotHeight = 20;
const dotWidth = 20;

// Set up the canvas
function setup() {
  createCanvas(windowWidth, windowHeight)
  background(backgroundColour);
}

// Recursively draw a circle, sampling from a normal distribution
function draw() {

  // Get the x and y coordinates of the currently printed dot
  let xLocation = randomGaussian(); // Get a gaussian random number (mean = 0, std = 1.0)
  let yLocation = randomGaussian();
  const standardDeviation = 60; // Define a standard deviation
  const xMean = width/2; // Define a mean value (middle of the screen along the x-axis)
  const yMean = height/2;
  xLocation = ( xLocation * standardDeviation ) + xMean; // Scale the gaussian random number by standard deviation and mean
  if (displayDimensions==2){
    yLocation = ( yLocation * standardDeviation ) + yMean;
  } else {
    yLocation = height / 2;
  }
  
  // Plot the currently generated dot
  fill(dotGreyValue, dotOpacityValue); // Define the shape fill (see notes below)
  noStroke(); // State that there is not border (in contrast to stroke())
  ellipse(xLocation, yLocation, dotWidth, dotHeight);   // Draw an ellipse at our "normal" random position

}

/* Notes
fill(v1, v2, v3, [alpha])
fill(value)
fill(gray, [alpha])
fill(values)
fill(color)
*/