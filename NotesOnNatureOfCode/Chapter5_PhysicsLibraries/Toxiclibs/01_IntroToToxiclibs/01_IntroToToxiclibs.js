//////////////////////////////////////////////////////////////////////////////////////////////
//                           TOXICLIBS: INTRODUCTION TO TOXICLIBS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

///////////////////////////////////////////
/* WHAT IS TOXICLIBS?
///////////////////////////////////////////

    Toxiclibs is another powerful physics engine. In the following sections, we are going focus
  on a few examples related to Verlet physics. However, Toxiclibs includes a suite of other
  wonderful packages that help with audio, color, geometry, and more.

    One great feature of Toxiclibs is that it was designed specifically for use with Processing (
  and therefore P5). The trouble we had with making Box2D work in P5  is not an issue here. The
  COORDINATE SYSTEM that we’ll use for the physics engine is the same as the coordinate system of
  P5, which means that we don't have to constantly translate back and forth. In addition, Toxiclibs
  is not limited to a 2D world; all of the physics simulations and functions work in both two and
  THREE DIMENSIONS.

      So how do you decide which library you should use? Box2D or Toxiclibs?

  • Imagine that your project involves lots of collisions. You have circles, squares, and other
  strangely shaped objects that knock each other around and bounce off each other. In this case,
  you are going to need BOX2D, as Toxiclibs does not handle collisions.

  • However, imagine that your project involves lots of particles flying around the screen. Sometimes
  they attract each other. Sometimes they repel each other. And sometimes they are connected with
  springs. In this case, TOXICLIBS is likely your best choice, as it is simpler to use than Box2D and
  particularly well suited to connected systems of particles. Toxiclibs is also very high performance,
  due to the speed of the Verlet integration algorithm (see 'NotesOnIntegrationMethods.js'; not to
  mention the fact that the program gets to ignore all of the collision geometry).

  The table below covers some of the features of Toxiclibs, in comparison to Box2D:

   ---------------------------- ------------- --------------
  |           FEATURE          |    BOX2D    |   TOXICLIBS  |
   ---------------------------- ------------- --------------
        Collision Geometry           YES            NO

            3D physics               NO             YES

        Particle attraction/         NO             YES
          repulsion forces

        Spring connections          YES             YES

   Other connections: revolute,     YES             NO
    pulley, gear, prismatic

              Motors                YES             NO

             Friction               YES             NO
*/

let physics; // Reference to physics world
let p1;
let p2;

function setup() {
  createCanvas(640, 360);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0, 0, width, height));

  // Make two particles
  p1 = new Particle(new Vec2D(width / 2, 20));
  p2 = new Particle(new Vec2D(width / 2 + 160, 20));
  // Lock one in place
  p1.lock();

  // Make a spring connecting both Particles
  let spring = new VerletSpring2D(p1, p2, 160, 0.01);

  // Anything we make, we have to add into the physics world
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);
}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Draw a line between the particles
  stroke(200);
  strokeWeight(2);
  line(p1.x, p1.y, p2.x, p2.y);

  // Display the particles
  p1.display();
  p2.display();

  // Move the second one according to the mouse
  if (mouseIsPressed) {
    p2.lock();
    p2.x = mouseX;
    p2.y = mouseY;
    p2.unlock();
  }
}