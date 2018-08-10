//////////////////////////////////////////////////////////////////////////////////////////////
//                           BOX2D: DISTANCE JOINTS (PAIR CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com
/*
    Box2D joints allow you to connect one body to another, enabling more advanced simulations of
  swinging pendulums, elastic bridges, squishy characters, wheels spinning on an axle, etc. There
  are many different kinds of Box2D joints.
  
    We focus here on DISTANCE JOINTS, which connect two bodies with a fixed length. The joint is
  attached to each body at a specified anchor point (a point relative to the body’s center). For
  any Box2D joint, we need to follow these steps: (which are similar to the methodology of building
  bodies and shapes)
*/

// Two particles connected with distance joints

// Constructor
class Pair {
  constructor(x, y) {
    this.len = 32;

    //////////////////////////////////////////////////////////
    /* Step 1: Make sure you have two bodies ready to go
    //////////////////////////////////////////////////////////
      In this example, we have two Particle objects that each store a reference to a Box2D
    Body object. We’ll call them particles p1 and p2 */
    this.p1 = new Particle(x, y);
    this.p2 = new Particle(x + random(-1, 1), y + random(-1, 1));

    //////////////////////////////////////////////////////////
    /// Step 2: Define a distance joint
    //////////////////////////////////////////////////////////
    let distanceJointDefinition = new box2d.b2DistanceJointDef(); // We specifically define a DistanceJointDef object

    //////////////////////////////////////////////////////////
    /// Step 3: Configure the distance joint
    //////////////////////////////////////////////////////////
    // Tell the joint which two bodies it connects
    distanceJointDefinition.bodyA = this.p1.body; 
    distanceJointDefinition.bodyB = this.p2.body;

    // Set the rest length of the joint (remember from our lession on springs)
    let restLength = scaleToWorld(this.len);
    distanceJointDefinition.length = restLength;

    // Add additional properties, which affect how springy the joint is
    distanceJointDefinition.frequencyHz = 3; // Try a value less than 5 (0 for no elasticity)
    distanceJointDefinition.dampingRatio = 0.1; // Ranges between 0 and 1 (1 for no springiness)

    // Make the joint.  Note we aren't storing a reference to the joint ourselves anywhere!
    // We might need to someday, but for now it's ok

    //////////////////////////////////////////////////////////
    /// Step 4: Create the distance joint
    //////////////////////////////////////////////////////////
    let distanceJoint = world.CreateJoint(distanceJointDefinition); // Variable definition is not necessary
  }

  done() {
    return this.p1.done() && this.p2.done();
  }

  display() {
    // Get the body's position
    let pos1 = scaleToPixels(this.p1.body.GetPosition());
    let pos2 = scaleToPixels(this.p2.body.GetPosition());

    stroke(200);
    strokeWeight(2);
    line(pos1.x, pos1.y, pos2.x, pos2.y);

    this.p1.display();
    this.p2.display();
  }
}