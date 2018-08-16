//////////////////////////////////////////////////////////////////////////////////////////////
//                     AUTONOMOUS AGENTS: FLOW FIELDS (FLOW FIELD CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    The previous example showed us that we can make an steering behaviour we like. However,
  let's now get back to the task at hand and examine a couple more of Reynolds’s steering
  behaviors. This section focuses on FLOW FIELD FOLLOWING.

    What is a flow field? Think of your P5 window as a grid. In each cell of the grid lives
  an arrow pointing in some direction (i.e. a vector). As a vehicle moves around the screen,
  it asks, “Hey, what arrow is beneath me? That’s my desired velocity!” Reynolds’s flow field
  following example has the vehicle predicting its future location and following the vector
  at that spot. However, simplicity’s sake, we’ll have the vehicle simply look to the vector
  at its current location.

    In the code below, we build a class that describes the flow field itself (i.e. the grid of
  vectors). A two-dimensional array is a convenient data structure to store a grid of information
  as we reference each element with two indices (i.e. columns and rows). However, how do we
  compute the vectors in the flow field itself? One way might be to have every vector in the
  flow field pointing to the right. Perhaps we want the vectors to point in random directions. A
  nice approach though is to use 2D Perlin noise (mapped to an angle).
  
    Given that this code creates a FlowField class, we can create a an object called flow.
  Using the lookup() function, our vehicle can then retrieve a desired vector from the flow
  field and use Reynolds’s rules (steering = desired - velocity) to calculate a steering force.
*/

// Flow Field Following
class FlowField {

  constructor(r) {
    this.cellSize = r; // How large is each "cell" of the flow field
    this.cols = width / this.cellSize; // Determine the number of columns based on sketch's width
    this.rows = height / this.cellSize; // Determine the number of rows based on sketch's height
    this.field = this.make2Darray(this.cols); // A flow field is a two dimensional array of p5.Vectors
    this.makeNewFlowField();
  }

  //////////////////////////////////////////////////////
  // Function generate a new flow field (using 2D perlin noise)
  //////////////////////////////////////////////////////
  makeNewFlowField() {
    noiseSeed(Math.floor(random(10000))); // Reseed noise so we get a new flow field every time
    let frequencyOfNoise = .15;
    let xoff = 0; // Initialise variable to keep current x in noise;
    for (let i = 0; i < this.cols; i++) { // Loop through columns
      let yoff = 0; // Initialise variable to keep current y in noise;
      for (let j = 0; j < this.rows; j++) { // Loop through rows
        let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI); // Get Perlin noise angle (0-TWO_PI)
        this.field[i][j] = createVector(cos(theta), sin(theta)); // Polar to cartesian coordinate transformation to get x and y components of the vector
        yoff += frequencyOfNoise; // Increment y;
      }
      xoff += frequencyOfNoise; // Increment x
    }
  }

  //////////////////////////////////////////////////////
  // Function get the direction vector for the cell a vehicle is currently in
  //////////////////////////////////////////////////////
  lookup(vehiclePosition) { // E.g. column = current position / cell size (i.e. if size is 10 and window is 100, 50 = column 5)
    // The constrain() function makes sure we don’t look outside of the flow field array
    let column = Math.floor(constrain(vehiclePosition.x / this.cellSize, 0, this.cols - 1));
    let row = Math.floor(constrain(vehiclePosition.y / this.cellSize, 0, this.rows - 1));
    return this.field[column][row].copy();
  }

  // Draw every vector
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.cellSize, j * this.cellSize, this.cellSize - 2);
      }
    }
  }

  // Renders a vector object 'v' as an arrow and a location 'x,y'
  drawVector(v, x, y, scayl) {
    push();
    let arrowsize = 4;
    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  }

  make2Darray(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  }
}