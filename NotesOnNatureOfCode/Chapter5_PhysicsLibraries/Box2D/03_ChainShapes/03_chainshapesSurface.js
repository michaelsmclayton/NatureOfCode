//////////////////////////////////////////////////////////////////////////////////////////////
//                            BOX2D: CHAIN SHAPES (SURFACE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    If you want a fixed boundary that is a curved surface (as opposed to a polygon), this can be
  achieved with the shape ChainShape. The ChainShape class is another shape like PolygonShape or
  CircleShape, so to include one in our system, we follow the same steps:
*/

class Surface {
  constructor() {

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
    /* 4) Configure the shape of the chain shape
    ////////////////////////////////////////////////////////////////
      The ChainShape object is a series of connected vertices. To create the chain, we must first
    specify an array of vertices (each as a Vec2 object). For example, if we wanted a straight line
    from the left-hand side of our window to the right-hand side, we would just need an array of two
    vertices: (0,150) and (width,150) */
    this.surface = []; // Here we keep track of the screen coordinates of the chain
    this.surface.push(new box2d.b2Vec2(0, height/2)); // Far-left-x, middle-y
    this.surface.push(new box2d.b2Vec2(width/2, (height/2)+100)); // Middle-x, middle-y plus 100
    this.surface.push(new box2d.b2Vec2(width, height/2)); // Far-right-x, middle-y
    for (let i = 0; i < this.surface.length; i++) {
      this.surface[i] = scaleToWorld(this.surface[i]); // This is what box2d uses to put the surface in its world
    }

    // 5) Create the chain shape
    chain.CreateChain(this.surface, this.surface.length);

    // 6) Attach the fixture to the body
    this.body.CreateFixture(fd);
  }

  // A simple function to just draw the edge chain as a series of vertex points
  display() {
    strokeWeight(1);
    stroke(200);
    fill(200);
    beginShape();
    for (let i = 0; i < this.surface.length; i++) {
      let v = scaleToPixels(this.surface[i]);
      vertex(v.x, v.y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}