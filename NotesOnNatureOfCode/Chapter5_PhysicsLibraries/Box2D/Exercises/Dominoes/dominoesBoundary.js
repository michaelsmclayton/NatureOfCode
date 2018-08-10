//////////////////////////////////////////////////////////////////////////////////////////////
//                            BOX2D: STATIC BOXES (BOUNDARY CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In our introduction to Box2D, we made objects that were pushed by gravity. However, what
  if we want to install some immovable boundaries in the Box2D world that would block the path
  of the Box objects? Box2D makes this easy for us by providing a means to lock a body (and any
  associated shapes) in place. Just set the BodyDef object’s type to STATIC.
*/

// A boundary is a simple rectangle with x,y,width,and height
class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Define a body
    let bd = new box2d.b2BodyDef();
    /////////////////////////////////////////////////////////////////////////////////
    bd.type = box2d.b2BodyType.b2_staticBody; // Define the body type as static
    /////////////////////////////////////////////////////////////////////////////////
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Define a shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));

    // Attach the fixture (with shape attached) to the body
    this.body = world.CreateBody(bd).CreateFixture(fd);
  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    fill(127);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}