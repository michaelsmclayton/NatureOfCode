//////////////////////////////////////////////////////////////////////////////////////////////
//                           BOX2D: REVOLUTE JOINTS (WINDMILL CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Another joint you can create in Box2D is a REVOLUTE joint. A revolute joint connects two Box2D
  bodies at a common anchor point, which can also be referred to as a “hinge.” The joint has an “angle”
  that describes the relative rotation of each body. To use a revolute joint, we follow the same steps
  we did with the distance joint:
*/

// Two particles connected with distance joints
class Windmill {
  constructor(x, y) {
    this.len = 32;

    //////////////////////////////////////////////////////////
    /* Step 1: Make sure you have two bodies ready to go
    //////////////////////////////////////////////////////////
      In this example, we have two BOX objects. We’ll call them boxes box1 and box2 */
    this.box1 = new Box(x, y - 20, 120, 10, false);
    this.box2 = new Box(x, y, 10, 40, true);

    //////////////////////////////////////////////////////////
    /// Step 2: Define a revolute joint
    //////////////////////////////////////////////////////////
    let revoluteJointDefinition = new box2d.b2RevoluteJointDef(); // This time we define a RevoluteJointDef object

    //////////////////////////////////////////////////////////
    /// Step 3: Configure the revolute joint
    //////////////////////////////////////////////////////////
    // Initialise the joint with its two bodies and anchor position
    let body1 = this.box1.body;
    let body2 = this.box2.body;
    let anchorPosition = this.box1.body.GetWorldCenter();
    revoluteJointDefinition.Initialize(body1, body2, anchorPosition);

    // Turning on a motor (a RevoluteJoint object is that you can motorize it so it spins autonomously)
    revoluteJointDefinition.enableMotor = false; // is it on?
    revoluteJointDefinition.motorSpeed = PI * 2; // how fast?
    revoluteJointDefinition.maxMotorTorque = 1000.0; // how powerful?

    /* There are many other properties you can set for a Revolute joint For example, you can limit
    its angle between a minimum and a maximum. See box2d manual for more */
    revoluteJointDefinition.enableLimit = false; // set to true to limit angle movement
    revoluteJointDefinition.lowerAngle = -PI/8;
    revoluteJointDefinition.upperAngle = PI/8;

    //////////////////////////////////////////////////////////
    /// Step 4: Create the distance joint
    //////////////////////////////////////////////////////////
    this.revoluteJoint = world.CreateJoint(revoluteJointDefinition); // Create the joint
  }

  display() {
    this.box2.display();
    this.box1.display();

    // Draw anchor just for debug
    let anchor = scaleToPixels(this.box1.body.GetWorldCenter());
    fill(0);
    noStroke();
    ellipse(anchor.x, anchor.y, 8, 8);
  }

  // Turn the motor on or off
  toggleMotor() {
    this.revoluteJoint.EnableMotor(!this.revoluteJoint.IsMotorEnabled());
  }

  motorOn() {
    return this.revoluteJoint.IsMotorEnabled();
  }
}