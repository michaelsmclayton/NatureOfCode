//////////////////////////////////////////////////////////////////////////////////////////////
//                                  TRADITIONAL RANDOM WALKS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Animation variables
const walkDirection = 'monteCarlo'; // ['four', 'eight', 'many', 'right'];
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

// Recursively move walker and display location
function draw() {
  switch (walkDirection){
    case 'four':
      walker.stepFour(); break;
    case 'eight':
      walker.stepEight(); break;
    case 'many':
      walker.stepMany(); break;
    case 'right':
      walker.stepRight(); break;
    case 'gauss':
      walker.stepGaussian(); break
    case 'monteCarlo':
      walker.stepMonteCarlo(3);
  }
  walker.constrainCoordinates();
  walker.display();
}

// Define the class of 'Walker'
class Walker {
  constructor(){ // The constructor function is called whenever an instance of this class is created
    // Give the class starting data
    this.x = width/2; // Set starting X location in middle
    this.y = height/2; // Set starting Y location in middle
  }
  
  // Give the class functionality
  display() {
    stroke(walkerColour); // stroke(rgb) - Sets the color used to draw lines and borders around shapes
    point(this.x,this.y); // point(x, y, [z]) - Draws a point in space at the dimension of one pixel
  }

  constrainCoordinates () {
    this.x = constrain(this.x,0,width-1); // constrain(n, low, high) - Constrains a value between a minimum and maximum value (i.e. value cannot be below minium or greater than maximum)
    this.y = constrain(this.y,0,height-1);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Generate walk functions from random distribiutions
  //////////////////////////////////////////////////////////////////////////////////////////////
  // Random walk with four directions
  stepFour() {
    /*  A random walk is a process in which the direction in which a walker moves
    at each moment in time is determined by a random process. Here, whether the
    walker moves left, right, up, or down is determined by the selection of a 
    random number between 0 and 3 */
    var randomChoice = floor(random(4)); // Pick a random number between zero and 3
    switch (randomChoice){ // Update the walker location based on the outcome of randomChoice
      case 0:
        this.x++; break;
      case 1:
        this.x--; break;
      case 2:
        this.y++; break;
      default:
        this.y--;
    }
  }
  // Random walk with eight directions
  stepEight() {
    /* To implement a Walker object that can step to any neighboring pixel (or stay put), we could
    pick a number between 0 and 8 (nine possible choices). However, a more efficient way to write
    the code would be to simply pick from three possible steps along the x-axis (-1, 0, or 1) and
    three possible steps along the y-axis */
    let stepX = floor(random(3)-1); // yields -1, 0, or 1
    let stepY = floor(random(3)-1);
    this.x += stepX;
    this.y += stepY;
  }
  // Random walk with continuous directions
  stepMany() {
    /* Taking this further, we could use floating point numbers (i.e. decimal numbers) for x and
    y instead and move according to an arbitrary random value between -1 and 1 */
    let stepX = random(-1, 1); // yields -1, 0, or 1
    let stepY = random(-1, 1);
    this.x += stepX;
    this.y += stepY;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Generate non-random walk functions (p.7)
  //////////////////////////////////////////////////////////////////////////////////////////////
  // Create a random walk that tends to the right
  stepRight(){
    let randomFloat = random(1);
    if (randomFloat < 0.4) { // A 40% change of moving to the right!
      this.x++;
    } else if (randomFloat < 0.6) {
      this.x--;
    } else if (randomFloat < 0.8) { // A 20% change of moving either up or down
      this.y++;
    } else {
      this.y--;
    }
  }
  // Create a random walk with normal distribitions
  stepGaussian(){
    this.x += randomGaussian();
    this.y += randomGaussian();
  }
  // Create a random walk using the Monte Carlo method
  stepMonteCarlo(distancePerMove){
    while (true) {
      let r1 = random(distancePerMove);
      let r2 = random(distancePerMove);
      let y = r1*r1; // y = x*x (you can define any function here)
      if (r2 < y){
        this.x += random(-r1, r1);
        this.y += random(-r1, r1);
        break;
      }
    }
  } /* Here we are saying that the likelihood that a random value
      will qualify is equal to the random number itself. Let’s say
      we pick 0.1 for R1. This means that R1 will have a 10% chance of
      qualifying. If we pick 0.83 for R1 then it will have a 83% chance
      of qualifying. The higher the number, the greater the likelihood
      that we will actually use it */
}
