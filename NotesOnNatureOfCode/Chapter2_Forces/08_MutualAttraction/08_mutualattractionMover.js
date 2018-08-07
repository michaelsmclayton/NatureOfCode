//////////////////////////////////////////////////////////////////////////////////////////////
//                                  FORCES: MUTUAL ATTRACTION (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

class Mover {
  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.colour = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    noStroke();
    fill(this.colour.r, this.colour.g, this.colour.b, 255); 
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  // This equation to calculate the graviational force is now calculated inside Mover, so that forces between Movers can be calculated
  calculateAttraction(m) {
    // Calculate direction of force
    let force = p5.Vector.sub(this.position, m.position);
    // Distance between objects
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5.0, 25.0);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction
    force.normalize();
    // Calculate gravitional force magnitude
    let strength = (G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }
}