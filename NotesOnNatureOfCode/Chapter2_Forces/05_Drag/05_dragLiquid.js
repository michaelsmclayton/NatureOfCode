//////////////////////////////////////////////////////////////////////////////////////////////
//                      DRAG (AIR AND FLUID RESISTANCE) (LIQUID CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Friction also occurs when a body passes through a liquid or gas. This force has many different
  names: viscous force, drag force, fluid resistance. While the effect is ultimately the same as
  friction (i.e. the object slows down), the way in which we calculate a drag force is slightly
  different. Here is the formula:

  Force of drag = -1/2 * ρ * v^2 * A * Cd * ^v

  where:

    - -1/2 is a constant. This is fairly irrelevant to us, as we will be making up values for other
      constants anyway. However, the fact that it is negative is important, as it tells us that the
      force is in the opposite direction of velocity (just as with friction).

    - ρ is the Greek letter rho, and refers to the DENSITY OF THE LIQUID. Again, we don't need to worry
      about this too much. We can simplify the problem and consider this to have a constant value of 1.

    - v refers to the speed of the object moving. We know that an object’s speed is the magnitude of the
      velocity vector (i.e. velocity.mag()). And v^2 just means v squared or v * v.

    - A refers to the frontal area of the object that is pushing through the liquid (or gas). An aerodynamic
      Lamborghini, for example, will experience less air resistance than a boxy Volvo. Nevertheless, for a
      basic simulation, we can consider our object to be spherical and ignore this element.

    - Cd is the coefficient of drag, and is exactly the same as the coefficient of friction (ρ). It is a
      constant we’ll determine based on whether we want the drag force to be strong or weak.

    - As with friction, ^v refers to the velocity unit vector (i.e. velocity.normalize()). Again, as with
      friction, drag is a force that points in the opposite direction of velocity.

  Now that we have gone through the equation and identified some terms that can be set to one (e.g. ρ), we
  can rewrite to equation in a simplied form:

  Simplified force of drag = magnitude of the speed squared * the coefficient of drag * the direction opposite to velocity
                                                     (i.e. v^2 * Cd)                          (i.e. -1*^v)

  This equation is implemented in the code below:
*/

class Liquid {
  // Set the position, width, and height of the liquid, as well as it's coefficient of drag
  constructor(xStart, yStart, width, height, coefficientOfDrag) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.coefficientOfDrag = coefficientOfDrag;
  }

  // Is the Mover in the Liquid?
  contains(m) {
    let l = m.position; // Get the current position of the mover
    // Return true if:
    return l.x > this.xStart && // The x position is greater than the liquid x start,
           l.x < this.xStart + this.width && // the x position is less than the liquid x start + the liquid width (i.e. inside the liquid in the x dimension),
           l.y > this.yStart && // the y position is greater than the liquid y start
           l.y < this.yStart + this.height; // and the y position is greater than the liquid y start + the liquid height (i.e. inside the liquid in the y dimension)
  }

  // Calculate simplified drag force (i.e. v^2 * Cd * -1*^v)
  calculateDrag(m) {

    // Drag magnitude is v^2 * Cd (i.e. speed squared * coefficient of drag)
    let speedSquared = Math.pow(m.velocity.mag(),2);
    let dragMagnitude = this.coefficientOfDrag * speedSquared

    // Direction is inverse of velocity (i.e. -1*^v)
    let dragForce = m.velocity.copy();
    dragForce.mult(-1);
    dragForce.normalize();

    // Scale according to magnitude (i.e. finalise the force, with magnitude and direction together)
    dragForce.mult(dragMagnitude);

    // Return drag
    return dragForce;
  }

  // Display liquid
  display() {
    noStroke();
    fill("#006699");
    rect(this.xStart, this.yStart, this.width, this.height);
  }
}