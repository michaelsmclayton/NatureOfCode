//////////////////////////////////////////////////////////////////////////////////////////////
//                                      BOX2D: POLYGONS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// How to make a custom *convex* polygon

let world; // A reference to our box2d world
let particles = []; // A list for all of our particles
let surfaces = [];

function setup() {
  createCanvas(640, .9*window.innerHeight);
  world = createWorld(); // Initialize box2d physics and create the world
  world.SetContactListener(new CustomListener()); // State that we want to listen for collisions

  // Draw M and C surfaces
  surfaces.push(new ChainShape(this.drawM, false));
  surfaces.push(new ChainShape(this.drawC, false));

  // Draw wall
  surfaces.push(new ChainShape(this.drawWall, true));

}

function draw() {
  background("#07A");
  let timeStep = 1.0 / 30; // We must always step through time!
  world.Step(timeStep, 10, 10); // 2nd and 3rd arguments are velocity and position iterations
  
  // Generate a particle
  if (random(1) < 0.25) {
    let sz = random(8, 12);
    particles.push(new Particle(random(width), 0, sz));
  }

  // Look at all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    // Particles that leave the screen, we delete them
    // (note they have to be deleted from both the box2d world and our list
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

  // Draw the surfaces
  for (let i = surfaces.length - 1; i >= 0; i--) {
    surfaces[i].display();
  }

  textSize(50);
  textFont('Arial');
  text('ICHAEL', .465*width, .375*height);
  text('LAYTON', .6*width, .6*height);

}

// Function to draw an M
function drawM() {
  const startingX = 88, startingY = .5*window.innerHeight+25;
  const height = 250, width = .2*height;
  const mHeight = .3*height, mWidth = .2*height;
  let currentX = startingX;
  let currentY = startingY;
  const steps = [{x: 0, y: 0}, // Stay at starting position on first move
                 {x: 0, y: -height},
                 {x: width, y: 0},
                 {x: mWidth, y: mHeight},
                 {x: mWidth, y: -mHeight},
                 {x: width, y: 0},
                 {x: 0, y: height},
                 {x: -width, y: 0},
                 {x: 0, y: -(height-(width*2))},
                 {x: -mWidth, y: mHeight},
                 {x: -mWidth, y: -mHeight},
                 {x: 0, y: mHeight+75},
                ]
  surface = [];
  steps.forEach((step)=>{
    currentX += step.x;
    currentY += step.y;
    surface.push(scaleToWorld(currentX, currentY)); // bottom-left
  })
  surface.push(scaleToWorld(startingX, startingY));
  return surface;
}

// Function to draw a C
function drawC() {
  const startingX = 447, startingY = .5*window.innerHeight;
  const twoPI = 3.142 * 2;
  const height = 300;
  const numberOfPoints = 40;
  surface = [];

  // Circle angles
  const innerStartingTheta = .75*twoPI;
  const outerEndTheta = .75*twoPI;
  const innerEndTheta = .1*twoPI;
  const outerStartingTheta = .12*twoPI;

  // Outer circle
  const outerRadius = height * 0.45;
  const outerIncrement = (outerEndTheta-outerStartingTheta)/numberOfPoints;
  for (let outerTheta = outerStartingTheta; outerTheta<outerEndTheta; outerTheta+=outerIncrement){
     let currentX = outerRadius*Math.cos(outerTheta) + startingX;
     let currentY = outerRadius*Math.sin(outerTheta) + startingY;
     surface.push(scaleToWorld(currentX, currentY));
  }

  // Inner circle
  const innerRadius = height * 0.3;
  const innerIncrement = (innerEndTheta-innerStartingTheta)/numberOfPoints;
  let innerTheta = innerStartingTheta
  for (let i=0;i<numberOfPoints;i++){
    let currentX = innerRadius*Math.cos(innerTheta) + startingX;
    let currentY = innerRadius*Math.sin(innerTheta) + startingY;
    surface.push(scaleToWorld(currentX, currentY));
    innerTheta += innerIncrement;
  }

  // Last connection
  let currentX = outerRadius*Math.cos(outerStartingTheta) + startingX;
  let currentY = outerRadius*Math.sin(outerStartingTheta) + startingY;
  surface.push(scaleToWorld(currentX, currentY));

  return surface;
}

function drawWall(){
  let surface = [];
  let startingX = 115, startingY = .5*window.innerHeight+180;
  let xDiff = -200, yDiff = 50; wallWidth = -30;
  let currentX = startingX;
  let currentY = startingY;
  const steps = [{x: 0, y: 0}, // Stay at starting position on first move
                 {x: 0, y: wallWidth},
                 {x: -xDiff, y: -yDiff},
                 {x: 0, y: -wallWidth},
                ]
  surface = [];
  steps.forEach((step)=>{
    currentX += step.x;
    currentY += step.y;
    surface.push(scaleToWorld(currentX, currentY)); // bottom-left
  })

  return surface
}