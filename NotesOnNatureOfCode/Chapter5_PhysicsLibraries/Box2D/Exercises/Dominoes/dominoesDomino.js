//////////////////////////////////////////////////////////////////////////////////////////////
//                             BOX2D: STATIC BOXES (BOX CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// Most of the notes for this section can be found in '02_staticboxesBoundary.js'

// A rectangular box
class Domino {
  constructor(x, y) {
    this.w = 20
    this.h = 80;
    this.started = false;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Create the body
    this.body = world.CreateBody(bd);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Attach the fixture
    this.body.CreateFixture(fd);
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  pushDomino(){
    if (!this.started){
      this.body.SetAngularVelocity(random(10, 0));
      this.started = true;
    }
  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height + this.w * this.h) {
      this.killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}