//////////////////////////////////////////////////////////////////////////////////////////////
//                                    FORCES: ATTRACTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com
// An object for a draggable attractive body in our world

/*
    In our previous sketches of gravity, we always used planet earth as the strongest source of
  gravity. Given the tremendous scale of the Earth's gravitational force, this means that we
  didn't look at how two objects with comparable mass might influence each other through gravity.

    In lesson 03, we look at gravity as always pointing down. However, in this example, the force
  of gravity can point in any direction. Therefore, in outer space, the equation for gravity is:

  Fgravity = ( (G * mass1 * mass2) / r^2 ) / ^r
  
  where:
    G = The UNIVERSAL GRAVITATIONAL CONSTANT which, in our world, equals 6.67428 x 10-11 meters
      cubed per kilogram per second squared. Although this number matters for serious modelling
      of the universe, it isn't important for P5 sketches. Again, it’s a constant that we can use
      to make the forces in our world weaker or stronger. Just making it equal to one and ignoring
      it isn’t such a terrible choice either.

    mass1 & mass 2 = the MASSES of objects 1 and 2

    r^2 = the DISTANCE between the two objects squared. As this part is in the denominator, the greater
      the distance between two objects, the weaker the force of gravity.

    ^r  = DIRECTIONAL UNIT VECTOR pointing from object 1 to object 2 (computed by subtracting the location of one object from the other)
*/

class Attractor {

  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = .05*width;
    if (this.mass > 55){this.mass = 55}
    this.G = 1;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
    this.rollover = false;
    console.log(this.mass)
  }

  calculateAttraction(m) {

    ///// Calculate direction of force

    // 1. Calculate a vector pointing (r) from the position of this attractor, to the position of the mover
    let force = p5.Vector.sub(this.position, m.position); // done by subtracting this from that position

    // 2. Find the distance between this and that by taking the magnitude of the pointing vector created in step 1
    let distance = force.mag();

    // Limit the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5, 25);

    // 3. Normalize vector (^r; distance doesn't matter here, we just want this vector for DIRECTION)
    force.normalize();

    ///// Calculate magnitude/strength of the force

    // 4. Calculate gravitional force magnitude ( (G * mass1 * mass2) / r^2)
    let strength = (this.G * this.mass * m.mass) / Math.pow(distance,2);

    // Get force vector --> direction * magnitude
    force.mult(strength);

    ///// Return force
    return force;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    noStroke()
    if (this.dragging) {
      fill(200);
    } else if (this.rollover) {
      fill(175);
    } else {
      fill(255);
    }
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
  }

  // The methods below are for mouse interaction
  handlePress(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  handleHover(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}