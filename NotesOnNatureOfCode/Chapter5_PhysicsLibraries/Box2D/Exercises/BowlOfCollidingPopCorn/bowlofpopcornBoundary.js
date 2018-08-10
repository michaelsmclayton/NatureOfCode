//////////////////////////////////////////////////////////////////////////////////////////////
//                       BOX2D: COLLISION LISTENING (BOUNDARY CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A boundary is a simple rectangle with x,y,width,and height
class Boundary {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = window.innerWidth*.05;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.3;

    // Define a circle
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    // // Define a square shape
    // fd.shape = new box2d.b2PolygonShape();
    // fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.w/2));

    // Create the body
    this.body = world.CreateBody(bd).CreateFixture(fd);
  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}