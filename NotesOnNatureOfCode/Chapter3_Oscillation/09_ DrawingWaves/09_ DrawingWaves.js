//////////////////////////////////////////////////////////////////////////////////////////////
//                              OSCILLATION: DRAWING WAVES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Maybe better for this answer to be OOP???

/*
    We previously looked at creating objects oscillate in their location around the
  screen. However, if also we want to display a sine wave itself, we have pretty
  much everything we need. When we oscillate a single circle up and down according to
  the sine function (i.e. as in simple, harmonic motion), what we are looking at is
  a continuous increase in the position along the x-axis of a sine wave.

    With a for loop, we can draw sine waves by placing a bunch of these oscillators
  next to each other. See as examples below: renderStaticWave(), renderSingleFreqWave(),
  and renderMultFreqWave():
*/

// Static wave properties
let staticAngularVel = 0.1;

// Single frequency oscillating wave
let singleFreqStartAngle = 0;
let singleFreqAngleVel = 0.23;

// Multiple frequency wave properties
let xspacing = 8; // How far apart should each horizontal position be spaced
let w; // Width of entire wave
let maxwaves = 5; // total # of waves to add together
let theta = 0; // Phase offset?
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues; // Using an array to store height values for the wave (not entirely necessary)


function setup() {
  // Setup screen
  createCanvas(window.innerWidth, 360);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;

  // For multiple frequency oscillation, create an array of waves, with different amplitudes and x location
  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }
  yvalues = [];
}

function draw() {
  background(51);
  calcMultWave();
  renderStaticWave();
  renderSingleFreqWave();
  renderMultFreqWave();
}

////////////////////////////////////////////////////////////
// STATIC, LINE DRAWING OF A SINGLE WAVE
////////////////////////////////////////////////////////////
/* This function starts at the far left, and works rightward (with x increasing by
  5 with every iteration of the for loop). Each iteration, the angle also increases
  in line with its angular velocity (meaning that a different point in the wave
  function is plotted on every iteration */
function renderStaticWave() {
  stroke("#08A");
  strokeWeight(10);
  noFill();
  beginShape();
  let currentStaticAngle = 0; // Angle remains 
  for (let x = 0; x <= width; x += 5) {
    let y = map(sin(currentStaticAngle), -1, 1, height*.1, height*.9);
    vertex(x, y); // Draw to point
    currentStaticAngle += staticAngularVel; // Change the angle to be plotted
  }
  endShape();
}

////////////////////////////////////////////////////////////
// MOVING, CIRCLE DRAWING OF A SINGLE WAVE
////////////////////////////////////////////////////////////
/* Similar to above, this function starts at the far left, and
works rightward (with x increasing by 24 with every iteration).
Furthermore, the angle is also increased by the angular velocity
on each iteration. However, this function draws a moving wave
on the screen because, each time the renderSingleFreqWave()
function is called, the singleFreqStartAngle is increased by 0.015 */
function renderSingleFreqWave() {
  singleFreqStartAngle += 0.015; // The higher this number, the faster the oscillation
  let angle = singleFreqStartAngle; // The phase at which the oscillation starts on the left-hand side
  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, height*.1, height*.9);
    noStroke()
    fill(255, 20);
    strokeWeight(2);
    ellipse(x, y, 48, 48);
    angle += singleFreqAngleVel;
  }
}

////////////////////////////////////////////////////////////
// MOVING, CIRCLE DRAWING OF MULTIPLE WAVES ADDED TOGETHER
////////////////////////////////////////////////////////////
/*
    Here, the waves of many different oscillations are added
  together. To get different waves, if the oscillation frequency
  index (j) is even, the sine of the x position is added to the
  overall wave. If the frequency index (j) is odd, the cosine of
  the x position is added.
*/
function calcMultWave() {
  // Increment theta to change the extent to which the oscillation starting point changes at each screen refresh
  theta += 0.02;

  // Set all height values to zero
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0; // An array which stores the combination of all waveforms
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) { // Iterate through all wave
    let x = theta; 
    for (let i = 0; i < yvalues.length; i++) { // Iterate through all points on the x-axis (and therefore all points of y)
      // Every other wave is cosine instead of sine
      if (j % 2 === 0) {
        yvalues[i] += sin(x) * amplitude[j];
      } else {
        yvalues[i] += cos(x) * amplitude[j];
      }
      x += dx[j]; // Increase x position to plot next point
    }
  }
}

function renderMultFreqWave() {
  // A simple way to draw the wave with an ellipse at each position
  noStroke();
  fill(30, 150, 75, 100);
  ellipseMode(CENTER);
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}