//////////////////////////////////////////////////////////////////////////////////////////////
//                             BOX2D: POLYGONS (CUSTOM SHAPE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Now that we can make simple geometric forms in Box2D, let’s think about how we can make
  a more complex form. There are two strategies in Box2D for making forms (i.e. that are more
  advanced than a basic circle or square). One is to use a PolygonShape.
  
    In our previous examples, we used PolygonShape to generate a rectangular shape with the
  setAsBox() function. However, a PolygonShape object can also be generated from an array of
  vectors, which allows you to build a completely custom shape as a series of connected vertices.
  This works very similarly to the ChainShape class.

    When building your own polygon in Box2D, you must remember two important details:

    • ORDER OF VERTICES: The vertices should be defined in COUNTERCLOCKWISE ORDER (When they
        are translated to Box2D World vectors, they will actually be in clockwise order since
        the vertical axis is flipped)

    • CONVEX SHAPES ONLY: A concave shape is one where the surface curves inward. Convex is the
    opposite. Note how in a concave shape every internal angle must be 180 degrees or less. Box2D
    is not capable of handling collisions for concave shapes. If you need a concave shape, you will
    have to build one out of multiple convex shapes (more about that in the next section).
*/

class CustomShape {
  constructor(mouseX, mouseY) {

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(mouseX, mouseY);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Configure the polygon shape (going COUNTERCLOCKWISE)
    let vertices = [];
    vertices[0] = scaleToWorld(-25, 25); // bottom-left
    vertices[1] = scaleToWorld(10, 20); // bottom-right
    vertices[2] = scaleToWorld(20, 0); // between bottom-right and top-right
    vertices[3] = scaleToWorld(20, -15); // top-right
    vertices[4] = scaleToWorld(-10, -10); // top-left

    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsArray(vertices, vertices.length);

    // Create the body
    this.body = world.CreateBody(bd);

    // Attach the fixture
    this.body.CreateFixture(fd);

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

  /* When it comes time to display the shape in P5, we can't use rect() or ellipse(). Since the
    shape is built out of custom vertices, we’ll want to use P5’s beginShape(), endShape(), and
    vertex()functions. */
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    let f = this.body.GetFixtureList();
    let ps = f.GetShape();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    //println(pos.x + " " + pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0, 0, 20, 20);
    beginShape();
    // For every vertex, convert to pixel vector
    for (let i = 0; i < ps.m_count; i++) {
      let v = scaleToPixels(ps.m_vertices[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}
