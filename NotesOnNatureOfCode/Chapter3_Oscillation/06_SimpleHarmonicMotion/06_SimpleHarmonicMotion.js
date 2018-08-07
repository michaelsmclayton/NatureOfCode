//////////////////////////////////////////////////////////////////////////////////////////////
//                        OSCILLATION: SIMPLE HARMONIC MOTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    If you graph the sine function, you'll see that the output is a smooth curve
  alternating between –1 and 1 (i.e. a sine wave). This type of a behavior is
  known as oscillation (a periodic movement between two points). This means that
  that we can simulate oscillation in a P5 sketch by assigning the output of the
  sine function to an object’s location (multipied by some scaler).

    For example, in this sketch, a circle oscillates between the left and right
  sides of the screen. This is what is known as SIMPLE HARMONIC MOTION (or, to
  be fancier, “the periodic sinusoidal oscillation of an object”). However, before
  we code this, it is important to go over some of the terminology of oscillations
  and and waves.

    Simple harmonic motion can be expressed as any location (in our case, the x
  location) as a function of time, with the following two elements:

      • AMPLITUDE: The distance from the center of motion to either extreme

      • PERIOD: The amount of time it takes for one complete cycle of motion

    In a P5 sketch, AMPLITUDE can be measured rather easily in pixels (and/or)
  through divisions of screen width and height). For PERIOD, it is simplest to
  refer to the number of screen refreshes (from which milliseconds can be
  estimated if you know the refresh rate of the screen; you might also use the
  millis() function in P5 to estimate precise milliseconds).

    Once we know the amplitude (pixel range) and period (frame count) of our
  oscillation, we can use a formula to calculate x as a function of time:

  /////////////////////////////////////////////////////////////////
  x = amplitude * sine(TWO_PI * frameCount/period);
  /////////////////////////////////////////////////////////////////

  • amplitide: This is the scalar of the function. We know that the sine
  function will always oscillate between -1 and 1. Therefore, we multiply
  the output of this function by amplitude to give the wave a magnitude.

  • TWO_PI * frameCount/period: Overall, this refers to how far through the
  oscillation cycle we currently are. 'TWO_PI' refers to one full cycle of an
  oscillation (i.e. 360 degrees). 'frameCount/period' refers to ratio of the
  current frame count to overall period of the oscillation (which is) also
  measured in pixels.

  • sine(): This function plots a wave that oscillates between 1 and -1.
  Given a certain x position (e.g. TWO_PI), the function will return the
  y position of the wave.
*/

let period = 200;
let amplitude = 250;
let currentAngle, y;

function setup() {
  createCanvas(640, 600);
}

function draw() {
  background("#222");

  //////////////////////////////////////////////////////////////////
  // Calculating horizontal position according to formula for simple harmonic motion
  //////////////////////////////////////////////////////////////////
  currentAngle = TWO_PI * frameCount/period; // Get percentage through oscillation period
  y = amplitude * sin(currentAngle); // Multiply normalised sine wave to give oscillation magnitude

  // Display circle with line attached
  translate(width / 2, height / 2);
  stroke(255);
  fill(127);
  strokeWeight(5)
  line(0, 0, 0, y);
  ellipse(0, y, 48);
}