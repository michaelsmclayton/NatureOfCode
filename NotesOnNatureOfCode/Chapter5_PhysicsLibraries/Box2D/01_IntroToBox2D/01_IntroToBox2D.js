//////////////////////////////////////////////////////////////////////////////////////////////
//                              BOX2D: INTRODUCTION TO BOX2D
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

//////////////////////////////////////////////////////////
/*  WHAT IS BOX2D? WHY AND HOW SHOULD I USE IT?
//////////////////////////////////////////////////////////

    BOX2D began as a set of physics tutorials written in C++ by Erin Catto for the Game
  Developer’s Conference in 2006. Over the last decade or so it has evolved into an rich
  and elaborate open-source physics engine.

    One key thing to realize about Box2D is that it knows nothing about computer graphics
  and the world of pixels; it is simply a library that takes in numbers and spits out more
  numbers. Importantly, these numbers are in meters, kilograms, seconds, etc (i.e. in real
  world units). While this provides for an amazing and realistic physics engine, it also
  necessitates lots of complicated code in order to translate back and forth between the
  physics “world” (a key term in Box2D) and the world we want to draw on —the “pixel” world
  of P5.

    So when it is worth the effort to using physics engines like Box2D? If you just want to
  display a circle moving across the screen, then P5 is all you would need. However, if you
  want hundreds of irregular polygons to be moving around the screen and changing their
  directions whenever they collide, it will be very much worth the effort to use a physics
  engine. Erin Catto spent years developing solutions to these kinds of problems so you don’t
  need to engineer them yourself.

    Thankfully, even though Box2D was written in C++, it has been ported to most programming
  languages, including Javascript. The source code for Box2D can be found in the 'Box2D_Library'
  folder in the parent directory (which contains 'box2d-html5.js' and 'box2d-helper.js'). These
  can be included in html <script> tags in the same way as P5.
*/


//////////////////////////////////////////////////////////
/*  BOX2D BASICS
//////////////////////////////////////////////////////////

    In the main programs of our P5 sketches, we always had setup() and draw() functions. In the
  setup() function, we would create all of the objects in our world. In the draw() function, we
  continuously update this world by calculating forces, applying those forces to the objects,
  changing the location of objects based on their acceleration, and redrawing all of our objects.

    In Box2D sketches, the process is essentially the same (with SETUP() and DRAW() functions),
  except that in our draw() function, we simply have to ask for all of our objects to be redrawn.
  This is the magic of Box2D. Box2D eliminiates the need to figure the forces and acceleration.
  It does the job for us instead! However, using Box2D still requires some work. For example,
  in addition to us learing the names and operations of the custom functions in Box2D, we also
  need to convert our pixel units to the REAL-WORLD UNITS OF BOX2D. The same is also true when
  it comes to drawing our objects, as we will need to convert the real-world units of Box2D back
  into pixel units.
*/


//////////////////////////////////////////////////////////
/*  CORE ELEMENTS OF BOX2D
//////////////////////////////////////////////////////////

    Below is an overview of the elements that make up a sketch in Box2D:

    1) WORLD: Manages the physics simulation. It knows everything about the overall coordinate space
        and also stores lists of every element in the world (see 2-4 below).

    2) BODY: Serves as the primary element in the Box2D world. It has a location. It has a velocity.
        It is essentially the class we’ve been writing on our own in our vectors and forces examples.
        However, it is essentially an empty point in space.
      
    3) SHAPE: In contrast to a body (which is an empty point in space, a shape gives a object geometry.
        It keeps track of all the necessary collision geometry attached to a body.

    4) FIXTURE: Shapes and bodies are attached to each other using a fixtures. This fixtures have
        properties such as density, friction, and restitution.

    5) JOINT: Acts as a connection between two bodies (or between one body and the world itself).

    6) VEC2: Describes a vector in the Box2D world.
*/


//////////////////////////////////////////////////////////
/*  VECTORS IN BOX2D
//////////////////////////////////////////////////////////

    You'll notice that the last item in the above list in Vec2. Anytime you use a physics library you will
  probably need to use the vector implementation of that library. However, given that we have so far been
  using the vector class in P5, we will need to learn the subtle differencs between these vector classes.

      VECTOR ADDITION in P5                     VECTOR ADDITION IN BOX2d
  "
    a = createVector(1,-1);                    a = new box2d.b2Vec2(1,-1)
    b = createVector(3,4);                     b = new box2d.b2Vec2(3,4)
    a.add(b);                                       a.addLocal(b);
  "

  etc....
  (check that these differences are the same for P5 [i.e. as they were taken from Processing])
*/


//////////////////////////////////////////////////////////
/*  LIVING IN A BOX2D WORLD
//////////////////////////////////////////////////////////

    The Box2D World object is in charge of everything. It manages:
      • the coordinate space of the world
      • all of the stuff that lives in the world
      • decides when time moves forward in the world

    In order to have Box2D as part of our P5 sketches, the World is the very first thing that needs to
  be set up. This is done using the createWorld() function, which creates a world with default physics.
  However, the physics of that world can be changed (e.g, by changing the 'm_gravity' property of the
  created object to another b2Vec2. However, what are the units of this vector?

  DIFFERENCES IN THE COORDINATE SYSTEMS OF P5 AND BOX2D

  In Box2D:

    • (0, 0) represents the very center of the screen (Contrastingly, (0, 0) in P5 represents the very
    top left-hand corner of the screen)

    • Positive y values represent the top of the screen, while negative y values represent the bottom
    of the screen (in P5, y values are all positive and reflect distance away from the top of the screen)
    
  The remaining notes for this section can be found in '01_introtobox2dBox.js'
*/


//////////////////////////////////////////////////////////
//  THE CODE
//////////////////////////////////////////////////////////

let world; // A reference to our box2d world
let boxes = []; // A list for all of our boxes

function setup() {
  createCanvas(800, 500);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Change the gravity of that world
  let newGravity = new box2d.b2Vec2(20, -20);
  world.m_gravity = newGravity;

}

function draw() {
  background(51);

  /* STEP(): Without this function, nothing would ever happen! step() advances the Box2D world a step further
  in time. Internally, Box2D sweeps through and looks at all of the Bodies and figures out what to do with
  them. Just calling step() on its own moves the Box2D world forward with default settings; however, it is
  customizable) */
  let timeStep = 1.0 / 30; // We must always step through time!
  world.Step(timeStep, 10, 10); // 2nd and 3rd arguments are velocity and position iterations

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    let b = new Box(mouseX, mouseY); // Create a new box at mouseX and mouseY
    boxes.push(b);
  }

  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}


/*
    Outside of Box2D, you might write the main program with the
  following code:
  "
  // A list for all of our boxes
  let boxes = [];

  function setup() {
    createCanvas(640, 360);
  }

  function draw() {
    background(51);

    // Boxes fall from the top every so often
    if (mouseIsPressed) {
      let b = new Box(mouseX, mouseY);
      boxes.push(b);
    }
    // Display all the boxes
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].display();
    }
  }
  "
*/
