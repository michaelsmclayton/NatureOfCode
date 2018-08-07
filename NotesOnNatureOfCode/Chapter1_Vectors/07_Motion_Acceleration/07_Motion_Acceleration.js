//////////////////////////////////////////////////////////////////////////////////////////////
//                                  VECTORS: ACCELERATION
//////////////////////////////////////////////////////////////////////////////////////////////

// Animation variables
const windowWidth = 700;
const windowHeight = 700;
const backgroundColour = "#FFF"
const ballColour = 0;
const ballOpacityValue = 150; // 0-255
const ballRadius = 20;
const numberOfBalls = 200;
let mover;
//document.body.style ="cursor: none"

// Choose acceleration type
const accelerationType = 'centralBurst'; // 'constant', 'random', 'towardMouse', 'centralBurst'

// Choose number of objects (only for towardMouse acceleration)
const numberOfObjects = 'multiple'; // 'single', 'multiple'
if ((accelerationType=='towardMouse' || accelerationType=='centralBurst') && numberOfObjects=='multiple'){
  mover = [];
}

// Setup and draw
function setup() {
  createCanvas(windowWidth, windowHeight);
  if ((accelerationType=='towardMouse' || accelerationType=='centralBurst') && numberOfObjects=='multiple'){
    for (var i = 0; i<numberOfBalls; i++) {
      mover[i] = new Mover();
    }
  } else {
    mover = new Mover(accelerationType, ballColour, ballRadius, ballOpacityValue);
  }
}

function draw() {
  background(backgroundColour);
  // noStroke(); fill(ballColour,ballOpacityValue);
  // ellipse(width/2, height/2, 30, 30);
  let jitter = 0.15;
  if ((accelerationType=='towardMouse' || accelerationType=='centralBurst') && numberOfObjects=='multiple'){
    for (let i = 0; i < mover.length; i++) {
      mover[i].update(); mover[i].display();
      // mover[i].acceleration.add(createVector(random(-jitter,jitter),random(-jitter,jitter)))
    }
  } else {
    mover.update(); mover.display();
  }
  if (accelerationType!='towardMouse' && accelerationType!='centralBurst'){
    mover.checkEdges();
  }
}

// When the user clicks the mouse
function mousePressed() {
  console.log('Pressed')
  if ((accelerationType=='towardMouse' || accelerationType=='centralBurst') && numberOfObjects=='multiple'){
    for (let i = 0; i < mover.length; i++) {
      mover[i].burst();
    }
  }
}
