//////////////////////////////////////////////////////////////////////////////////////////////
//                        OSCILLATION: POINTING VELOCITY (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Three very important concepts in trigonometry are: SINE, COSINE, and TANGENT. The ways these
    things can be calculated is contained in the word SOH-CAH-TOA

      SOH: sine(angle) = opposite / hypotenuse

      CAH: cosine(angle) = adjacent / hypotenuse

      TOA: tangent(angle) = opposite / adjacent

                                            . (desired position)
                                           /|
                                          /θ| (θ is the angle)
                                         /  |
                            hypotenuse  /   | opposite
                                       /    |
                                      /     |
                 (current position) ./____[]| (right-angle triangle)
                                     adjacent 

    Right-angle triangles are very important in computer graphics as a vector pointing from
  one position to another will almost certainly be a right angle triangle. For example, in the
  diagram about, the hypoenuse is a straight line between the 'current position' and the 'desired
  position'. These trigonometric functions are very useful as they allow us to establish the
  relationships between the components of a vector and its direction + magnitude.
*/

/*
    If you remember, in Chapter 1, we wrote a sketch in which objects accelerated towards the
  mouse. However, as these objects were circles, we didn't really care about the orientation
  of these objects: a cirlce rotated by any angle looks unchanged. However, in some cases, we
  may want to have an object move with a head and a tail to move towards a given point. Perhaps
  you are drawing a spaceship, and when we say "point in the direction of movement," what we
  really mean is “rotate according to the velocity vector.” Velocity is a vector, with an x and
  a y component, but to rotate in P5 we need an angle, in radians.

    We can use the SOHCAHTOA rule to find this angle. We know, from the notes above, that the
  tangent(angle) is equal to the opposite / adjacent. In the context of 2D drawing, this means
  the tangent(angle) is equal to the velocityy / velocityx. To get the angle from this, we
  can use a function called the INVERSE TANGENT (sometimes referred to as arctangent or tan^-1).
  Therefore, if tangent(angle) = velocityy / velocityx, then angle = arctangent(velocityy /
  velocityx). This procedure can be implemented in Javascript using the Math.atan2() function.
*/

class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = 0;
    this.topspeed = 4;
  }

  update() {
    let mouse = createVector(mouseX, mouseY); // Get current position of mouse
    let dir = p5.Vector.sub(mouse, this.position); // Create vector pointing from object to mouse
    dir.normalize(); dir.mult(0.5); // Fix to a magnitude of 0.5
    this.acceleration = dir; // Have the acceleration have the object move towards the mouse
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  display() {
    // Calculate the angle based on the current direction of velocity
    let angle = Math.atan2(this.velocity.y, this.velocity.x)
    // angle = this.velocity.heading(); // The easiest way to do this!
    stroke(0);
    strokeWeight(2);
    fill(127);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(angle); // Rotate the object so that it points with the previously calculated angle
    rect(0, 0, 30, 10);
    pop();
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}