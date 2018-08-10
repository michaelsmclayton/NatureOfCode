//////////////////////////////////////////////////////////////////////////////////////////////
//                  BOX2D: COLLISION LISTENING (PARTICLE WITH FORCES CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In Chapter 2, we spent a lot of time thinking about building environments with multiple forces.
  An object might respond to gravitational attraction, wind, air resistance, etc. However, so far
  in Box2D, we’ve only had the ability to manipulate a single global force—gravity.

    To apply forces in the same way that we did in previous chapter, we just have to use the
  ApplyForce() function (with is a method of the body object). See the code below for a more
  detailed description.
*/

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
  /* Function to apply a force to this particle
  ///////////////////////////////////////////////////////////////
    Here we are receiving a force vector and passing it along to the Box2D
  Body object. Box2D is a more sophisticated engine than our examples from Chapter
  2. Our earlier forces examples assumed that the force was always applied at the
  mover’s center. Here we get to specify exactly where on the body the force is
  applied. In the code below, we’re just applying it to the center by asking the body
  for its center. However, this could be adjusted. */
  applyForce(force){ // force = new box2d.b2Vec2(xForce, yForce)
    let bodyPosition = this.body.GetWorldCenter(); // Get the center of the current body
    this.body.ApplyForce(force, bodyPosition); // Apply force to body
  }

  // Change color when hit
  applyCollision() {
    this.col = color(255, 0, 0);
    this.applyForce(new box2d.b2Vec2(0, -1000))
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
    fill(this.col);
    stroke(200);
    strokeWeight(2);
    ellipse(0, 0, this.r * 2, this.r * 2);
    // Let's add a line so we can see the rotation
    line(0, 0, this.r, 0);
    pop();
  }
}