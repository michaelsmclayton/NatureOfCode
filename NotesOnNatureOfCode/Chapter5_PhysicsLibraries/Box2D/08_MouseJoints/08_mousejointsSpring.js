//////////////////////////////////////////////////////////////////////////////////////////////
//                             BOX2D: MOUSE JOINTS (SPRING CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    The last joint we’ll look at is a MOUSE joint. A mouse joint is typically used for moving
  a body with the mouse. However, it can also be used to drag an object around the screen according
  to some arbitrary x and y. The joint functions by pulling the body towards a “target” position.

    Before we look at the MouseJoint object itself, let’s ask why we even need it in the first place.
  If you look at the Box2D documentation, there is a function called setTransform() that specifically
  “sets the position of the body’s origin and rotation (radians).” Consequently, if a body has a
  position, can’t we could move that body by changings its position. However, this would have the effect
  of breaking the physics. If you manually assign the location of an body, it’s like saying “teleport
  that body” and Box2D no longer knows how to compute the physics properly. However, Box2D does allow
  you to tie a rope to an object and drag it to a given position. This is what the MouseJoint does.
  It’s like a string you attach to a body and pull towards a target.

    It is important to note that, while the technique for dragging an object around using a MouseJoint
  is useful, Box2D also allows a body to have a KINEMATIC type. Kinematic bodies can be controlled by
  the user by setting their velocity directly. For example, let’s say you want an object to follow a
  target (like your mouse): You could create a vector that points from a body’s location to a target.
  Once you have that vector, you could assign it to the body’s velocity so that it moves to the target.
  You can also do the same with angular velocity. However, it is also important to note that kinematic
  bodies do not collide with other kinematic or static bodies. In these cases, the mouse joint strategy
  is preferable.

    The code for creating a mouse joint can be found in the bind() function below. 
*/

// Class to describe the spring joint (displayed as a line)
class Spring {
  constructor(x, y) {
    // At first it doesn't exist
    this.mouseJoint = null;
  }

  /////////////////////////////////////////////////////////////////
  // Create a mouse joint between the box and the mouse (i.e. attach the spring to an x,y location and the Box object's location)
  /////////////////////////////////////////////////////////////////
  bind(mouseX, mouseY, box) {
    // Define the joint
    let md = new box2d.b2MouseJointDef();
    
    // Body A is just a fake ground body for simplicity (there isn't anything at the mouse)
    md.bodyA = world.CreateBody(new box2d.b2BodyDef()); //world.GetGroundBody();
    
    // Body 2 is the box's boxy
    md.bodyB = box.body;
    
    // Get the mouse location in world coordinates
    md.target = scaleToWorld(mouseX, mouseY); // Set the target of the mouse joint to the current mouse location

    // Some stuff about how strong and bouncy the spring should be
    md.maxForce = 1000.0 * box.body.m_mass;
    md.frequencyHz = 5.0;
    md.dampingRatio = 0.9;

    // Make the joint!
    this.mouseJoint = world.CreateJoint(md);
  }

  /////////////////////////////////////////////////////////////////
  // Function to destroy a mouse join (i.e. when the mouse stops being pressed)
  /////////////////////////////////////////////////////////////////
  destroy() {
    // We can get rid of the joint when the mouse is released
    if (this.mouseJoint !== null) {
      world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    }
  }

  // If it exists we set its target to the mouse location
  update(x, y) {
    if (this.mouseJoint !== null) {
      // Always convert to world coordinates!
      let mouseWorld = scaleToWorld(x, y);
      this.mouseJoint.SetTarget(mouseWorld);
    }
  }

  display() {
    if (this.mouseJoint !== null) {

      let posA = this.mouseJoint.GetAnchorA();
      let posB = this.mouseJoint.GetAnchorB();

      // We can get the two anchor points
      let v1 = scaleToPixels(posA.x, posA.y);
      let v2 = scaleToPixels(posB.x, posB.y);
      // And just draw a line
      stroke(200);
      strokeWeight(2);

      line(v1.x, v1.y, v2.x, v2.y);
    }
  }
}