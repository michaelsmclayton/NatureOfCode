//////////////////////////////////////////////////////////////////////////////////////////////
//                            BOX2D: CHAIN SHAPES (SURFACE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    If you want a fixed boundary that is a curved surface (as opposed to a polygon), this can be
  achieved with the shape ChainShape. The ChainShape class is another shape like PolygonShape or
  CircleShape, so to include one in our system, we follow the same steps:
*/

class ChainShape {
  constructor(configureShapeFunction, reactToCollisions, propertiesObject) {

    // 1) Define a body
    let bd = new box2d.b2BodyDef();
    this.body = world.CreateBody(bd);

    // 2) Define a fixture
    let fd = new box2d.b2FixtureDef();
    fd.density = 1.0; // Some physics
    fd.friction = 0.1;
    fd.restitution = 0.3;

    ////////////////////////////////////////////////////////////////
    // 3) Define the chain shape
    ////////////////////////////////////////////////////////////////
    // Define the chain shape
    let chain = new box2d.b2ChainShape();
    fd.shape = chain;

    ////////////////////////////////////////////////////////////////
    // 4) Configure the shape of the chain shape
    ////////////////////////////////////////////////////////////////
    this.surface = configureShapeFunction(propertiesObject);

    // 5) Create the chain shape
    chain.CreateChain(this.surface, this.surface.length);

    // 6) Attach the fixture to the body
    this.body.CreateFixture(fd);

    // Set to react to collisions or not
    if (reactToCollisions){
      this.body.SetUserData(this);
    }
  }

  // A simple function to just draw the edge chain as a series of vertex points
  display() {
    noStroke();
    fill("#FFF");
    beginShape();
    for (let i = 0; i < this.surface.length; i++) {
      let v = scaleToPixels(this.surface[i]);
      vertex(v.x, v.y);
    }
    //vertex(width, height);
    //vertex(0, height);
    endShape(CLOSE);
  }
}