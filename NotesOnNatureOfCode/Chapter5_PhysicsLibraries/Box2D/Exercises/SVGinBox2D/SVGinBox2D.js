//////////////////////////////////////////////////////////////////////////////////////////////
//                                      BOX2D: POLYGONS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// How to make a custom *convex* polygon

let world; // A reference to our box2d world
let particles = []; // A list for all of our particles
let surfaces = [];
let screenWidth = 640;
let screenHeight = .9*window.innerHeight;

function setup() {
  createCanvas(screenWidth, screenHeight);
  world = createWorld(); // Initialize box2d physics and create the world
  world.SetContactListener(new CustomListener()); // State that we want to listen for collisions

  // Draw surfaces
  xSize = 0.9; ySize = 0.5;
  surfaces.push(new ChainShape(this.drawSVG, false, {svgElement: document.getElementById("mPath"), xSize, ySize}));


}

function draw() {
  background("#07A");
  let timeStep = 1.0 / 30; // We must always step through time!
  world.Step(timeStep, 10, 10); // 2nd and 3rd arguments are velocity and position iterations
  
  // Generate a particle
  if (particles.length<20) {
    if (random(1) < 0.1) {
      let sz = random(8, 12);
      particles.push(new Particle(random(width*.25)+(width*.2), random(height/4), sz));
    }
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

}

function getSVGPositions(svgPath){ // Sizes taken in percent
  pathLength = Math.floor( svgPath.getTotalLength() );
  svgResolution = 2000;
  iIncrement = 1/svgResolution;
  vertices = [];
  for (let prcnt=0; prcnt<1; prcnt+=iIncrement){
    currentPoint = prcnt*pathLength;
    pt = svgPath.getPointAtLength(currentPoint);
    pt.x = pt.x;
    pt.y = pt.y;
    vertices.push(pt);
  }
  return vertices
}


function drawSVG(svgProperties){ // Sizes taken in percent

  // Get points of SVG path
  svgLines = getSVGPositions(svgProperties.svgElement);

  // Get lowest and highest dimensions of SVG
  function getLowHighValues(property){
    let low = 0, high = 0, currentValue;
    for (let i=0; i<svgLines.length; i++){
      currentValue = svgLines[i][property];
      if (currentValue > high) high = currentValue
      if (currentValue < low) low = currentValue
    }
    return {low, high}
  }
  xDimensions = getLowHighValues('x');
  yDimensions = getLowHighValues('y');

  // Scale SVG
  scaleWidth = svgProperties.xSize * screenWidth;
  scaleHeight = svgProperties.ySize * screenHeight;
  function convertToScale(i, property, dimensions, newScale) {
    currentValue = svgLines[i][property];
    currentPercent = currentValue / dimensions.high;
    newValue = currentPercent * newScale;
    return newValue;
  }
  for (let i=0; i<svgLines.length; i++){
    svgLines[i].x = convertToScale(i, 'x', xDimensions, scaleWidth);
    svgLines[i].y = convertToScale(i, 'y', xDimensions, scaleHeight);
  }

  // Get final vertices
  surface = [];
  xOffset = screenWidth/2-(svgProperties.xSize*screenWidth)/2; // Center X
  yOffset = screenHeight/2-(svgProperties.ySize*screenHeight)/1.25; // Center Y
  for (let i=0; i<svgLines.length; i++){
    let currentX = svgLines[i].x + xOffset;
    let currentY = svgLines[i].y + yOffset-200;
    surface.push(scaleToWorld(currentX, currentY));
  }
  return surface
}

// function drawSVG(svgProperties){ // Sizes taken in percent

//   // Get lowest and highest dimensions of SVG
//   svgLines = svgProperties.svgElement.points;
//   function getLowHighValues(property){
//     let low = 0, high = 0, currentValue;
//     for (let i=0; i<svgLines.length; i++){
//       currentValue = svgLines[i][property];
//       if (currentValue > high) high = currentValue
//       if (currentValue < low) low = currentValue
//     }
//     return {low, high}
//   }
//   xDimensions = getLowHighValues('x');
//   yDimensions = getLowHighValues('y');

//   // Scale SVG
//   scaleWidth = svgProperties.xSize * screenWidth;
//   scaleHeight = svgProperties.ySize * screenHeight;
//   function convertToScale(i, property, dimensions, newScale) {
//     currentValue = svgLines[i][property];
//     currentPercent = currentValue / dimensions.high;
//     newValue = currentPercent * newScale;
//     return newValue;
//   }
//   for (let i=0; i<svgLines.length; i++){
//     svgLines[i].x = convertToScale(i, 'x', xDimensions, scaleWidth);
//     svgLines[i].y = convertToScale(i, 'y', xDimensions, scaleHeight);
//   }

//   // Get final vertices
//   surface = [];
//   xOffset = screenWidth/2-(svgProperties.xSize*screenWidth)/2; // Center X
//   yOffset = screenHeight/2-(svgProperties.ySize*screenHeight)/1.25; // Center Y
//   for (let i=0; i<svgLines.length; i++){
//     let currentX = svgLines[i].x + xOffset;
//     let currentY = svgLines[i].y + yOffset;
//     surface.push(scaleToWorld(currentX, currentY));
//   }
//   return surface
// }