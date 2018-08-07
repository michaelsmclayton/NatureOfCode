//////////////////////////////////////////////////////////////////////////////////////////////
//                                 PERLIN NOISE WALK
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Animation variables
const windowWidth = 800;
const windowHeight = 500;
const backgroundColour = "#DDD"
const walkerColour = '#F50000';
let walker;

// Set up the canvas and create 'Walker' instance
function setup() {
  createCanvas(windowWidth, windowHeight)
  background(backgroundColour);
  walker = new Walker();
}

// Draw walk
function draw() {
  walker.walk();
  walker.display();
}

class Walker{
  constructor(){
    this.position = createVector(width/2,height/2); // State starting position
    this.noff = createVector(random(1000),random(1000)); // State starting position for perlin noise for x and y planes
  }

 display() {
    strokeWeight(2); // Circle border width
    fill(51); // Circle fill colour
    stroke(0); // Draw circle border
    ellipse(this.position.x, this.position.y, 48, 48); // Draw circle
  }

  walk() {
    this.position.x = map(noise(this.noff.x),0,1,0,width); // noise() return a value between 0 and 1. This value is scaled using map(value, currentMin, currentMax, newMin, newMax)
    this.position.y = map(noise(this.noff.y),0,1,0,height);
    this.noff.add(0.01,0.01,0); // Increment the x and y values of noff (to change the Perlin noise values for the next draw() loop)
  }
}

/* Notes
  For the noise() function, in order to
  access a particular noise value, we have to pass a specific
  "moment in time" to the noise() function (e.g. noise(3))
*/
