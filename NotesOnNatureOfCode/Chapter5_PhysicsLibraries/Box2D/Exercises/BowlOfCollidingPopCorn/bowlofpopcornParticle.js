//////////////////////////////////////////////////////////////////////////////////////////////
//                  BOX2D: COLLISION LISTENING (PARTICLE WITH FORCES CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A circular particle
class Particle {
  constructor(x, y, r) {
    this.r = r;

    this.col = color(127);

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.3;

    // Create the body
    this.body = world.CreateBody(bd);

    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));

    ///////////////////////////////////////////////
    /* Set user data to this
    ///////////////////////////////////////////////
      In order for us to get the user data when we are calculating particle collusions
    (see '09_collisionlisteningCustomListener.js')it is necessary to set the user data using
    the SetUserData() function inside of this constructor. */
    this.body.SetUserData(this);
  }

  ///////////////////////////////////////////////////////////////
  /// Function to apply a force to this particle
  ///////////////////////////////////////////////////////////////
  applyForce(force){ // force = new box2d.b2Vec2(xForce, yForce)
    let bodyPosition = this.body.GetWorldCenter(); // Get the center of the current body
    this.body.ApplyForce(force, bodyPosition); // Apply force to body
  }

  // Change color when hit
  applyCollision() {
    this.applyForce(new box2d.b2Vec2(0, random(-3000,0)));
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height + this.r * 2) {
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
    fill(255);
    noStroke();
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }
}