//////////////////////////////////////////////////////////////////////////////////////////////
//               BOX2D: ATTACHING MULTIPLE SHAPES TO A SINGLE BODY (LOLLIPOP CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In the previous section, we learned how to create a polygon shape. These shapes will get us
  pretty far in Box2D. Nevertheless, the convex shape requirement will severely limit the range of
  possibilities. The good news is that we can completely eliminate this restriction by creating a
  single Box2D body out of multiple shapes!
  
    In this example, we will generate a little alien creature, simplifying the shape to be a thin
  rectangle with a circle on top. Remember that, when we wanted to attach just one shape to a body,
  we had to define that fixture with a shape, and attach that fixture to the body. To attach a second
  shape to the body, we simply have to define another fixture with a shape, and attach that fixture
  to the body as well.

    When you attach a shape to a body, by default, the center of the shape will be located at the
  center of the body. But in our case, if we take the center of the rectangle to be the center of the
  body, we want the center of the circle to be offset along the y-axis from the body’s center. This
  is achieved by using the local position of a shape, accessed via a Vec2 variable called m_p. This
  offsetting process can be found in the code below.

    Lastly, it is important to note that the stuff you draw in your P5 window doesn’t magically
  experience physics simply because we created some Box2D bodies and shapes. These examples work
  because we very carefully matched how we draw our elements with how we defined the bodies and
  shapes we put into the Box2D world. If you accidentally draw your shape differently, you won’t
  get an error, not from P5 or from Box2D. However, your sketch will look odd and the physics won’t
  work correctly.
*/


// A rectangle with a circle on top
class Lollipop {
  constructor(x, y) {
    this.w = 8;
    this.h = 24;
    this.r = 8;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define fixture #1 (rectangle)
    let fd1 = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd1.shape = new box2d.b2PolygonShape();
    fd1.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));
    fd1.density = 1.0;
    fd1.friction = 0.5;
    fd1.restitution = 0.2;

    // Define fixture #2 (circle)
    let fd2 = new box2d.b2FixtureDef();
    fd2.shape = new box2d.b2CircleShape();
    fd2.shape.m_radius = scaleToWorld(this.r);
    let offset = scaleToWorld(new box2d.b2Vec2(0, -this.h/2)); // Calculate the offset of this cirlce
    fd2.shape.m_p = new box2d.b2Vec2(offset.x, offset.y); // Add the calculated the offset to this cirlce
    fd2.density = 1.0;
    fd2.friction = 0.5;
    fd2.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);

    // Attach both fixture #1 and #2
    this.body.CreateFixture(fd1);
    this.body.CreateFixture(fd2);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
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
    ellipse(0, -this.h / 2, this.r * 2, this.r * 2);
    pop();
  }
}