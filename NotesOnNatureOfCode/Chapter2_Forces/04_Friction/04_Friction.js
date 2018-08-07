//////////////////////////////////////////////////////////////////////////////////////////////
//                                      FRICTION
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
  Friction is a DISSIPATIVE FORCE. A dissipative force is one in which the total energy of a
  system decreases when an object is in motion. For example, When you press your foot down on
  the brake pedal while driving, the car’s brakes use friction to slow the motion of the tires.
  Kinetic energy (motion) is converted into thermal energy (heat). Whenever two surfaces come
  into contact, they experience friction. Although a complete model of friction would also include
  static friction (a body at rest against a surface), we are only going to look at  kinetic friction
  (a body in motion against a surface).

  (Assume this is a box moving down a hill)
                ____________
      Friction |            | Velocity (v)
      <------- | Moving box | ------>
       ________|____________|________
        ==============================
                      ∧\
     Normal force (N) | \   Force of gradvity
                      |  v
                      (earth)

  ///////////////////////////////////////////////////
  Friction = -1 * mu * N * ^v
  ///////////////////////////////////////////////////

  where mu = the COEFFICIENT OF FRICTION,
        N  = the NORMAL FORCE
        ^v = the UNIT VECTOR OF VELOCITY (i.e. normalised to one)

  The COEFFICIENT OF FRICTION establishes the strength of a friction force for a particular
  surface. The higher it is, the stronger the friction; the lower, the weaker.

  The NORMAL FORCE is the force perpendicular to the object’s motion along a surface. When an
  object is pushed down by gravity, it is also pushed back by the normal force. The greater the
  gravitational force, the greater the normal force. (As gravity is associated with mass, a
  lightweight sports car experiences less friction than a tractor)

  The UNIT VECTOR OF VELOCITY: Based on the diagram above, we can see that friction points in
  the opposite direction of velocity. That is the part of the formula that says -1 * ^v, or -1
  times the velocity unit vector. In P5, this would mean taking the velocity vector, normalizing
  it, and multiplying by -1.
*/

let movers = [];
let iceHeight = .2;

function setup() {
  createCanvas(640, 500);
  for (let i = 0; i < 15; i++) {
    movers[i] = new Mover(random(1, 3), 0, random(height));
  }
  // State the height and start/end positions of the ice patch
  iceHeight = iceHeight * height;
  iceStart = (height/2)-(iceHeight/2);
  iceEnd = (height/2)+(iceHeight/2);
}

function draw() {
  // Make green (grass) background
  background("#0a6c03");
  
  // Make patch of white (ice)
  fill(255); // Set color to white
  noStroke(); // Set stroke
  rect(0, iceStart, width, iceHeight);

  let coefficientOfFriction;
  for (let i = 0; i < movers.length; i++) {

    // State different friction coefficients for ice vs grass
    if (movers[i].position.y>iceStart && movers[i].position.y<iceEnd){
      coefficientOfFriction = 0; // Give no friction at all (coefficient of friction) (for ice)
    } else {
      coefficientOfFriction = 0.01; // Give a positive coefficient of friction (for grass)
    }
    
    ////////////////////////////////////////////////////////////////////
    // Implement friction equation
    ////////////////////////////////////////////////////////////////////
    let normalForce = 1; // Set the normal force always to 1
    let frictionMag = coefficientOfFriction * normalForce; // Calculate the friction magnitude (i.e. mu * N)
    let friction = movers[i].velocity.copy(); // Initalise friction vector as current velocity vector
    friction.normalize(); // Normalise that vector (giving ^v)
    friction.mult(-1); // Multiple that vector by -1 (as in the equation)
    friction.mult(frictionMag); // Multiply that normalised vector * -1, by mu * N

    // Apply forces and update
    movers[i].applyForce(friction); // Apply friction force
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}