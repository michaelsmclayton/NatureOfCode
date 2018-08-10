//////////////////////////////////////////////////////////////////////////////////////////////
//                          BOX2D: INTRODUCTION TO BOX2D (BOX CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A rectangular box creating using Box2D

// This box is created as a class that recieves a mouseX and mouseY as initialising data
class Box {
  constructor(mouseX, mouseY) {
    this.w = 16;
    this.h = 16;


//////////////////////////////////////////////////////////
/* CONVERTING BETWEEN COORDINATE SYSTEMS
//////////////////////////////////////////////////////////

    As described in '01_IntroToBox2D.js', Box2D has a different coordinate system to P5.
  Therefore, when using these two libraries together, we will need to convert between the
  two coordinate systems. This can be done with two functions:
  
    • scaleToWorld(x,y): Takes an x and y coordinate from the P5 world, and returns
        a position object that works in the Box2D world.

    • scaleToPixels(position): Takes a position object from the Box2D world, and
        returns an x and y coordinate that works in the P5 world.
*/

//////////////////////////////////////////////////////////
/* BUILDING A BOX2D BODY
//////////////////////////////////////////////////////////

    A Box2D body is the primary element in the Box2D world: thing that moves around the space
  and experiences forces. (However, a body isn't anything physical, and it does not have a
  geometry. Rather, bodies have Box2D shapes attached to them).

    You can create a body with the following steps:

    //////////////////////////////////////////////////////
    1) DEFINE A BODY, which allows us to define the properties of the body we intend to make.
    (This holds for all elements in a Box2D world: anytime you want to make a “thing,” you have
    to make a “thing definition" first). This can be done with the following code: */

    let bodyDefinition = new box2d.b2BodyDef();


    /*//////////////////////////////////////////////////////
    2) CONFIGURE THE BODY DEFINITION, which is where we can set specific properties or attributes
    of the body we intend to make:
    
      *** POSITION: Let’s say we want to POSITION the body in the current position of the mouse. (However,
      note that given our mouse location is given in pixels, we will need to convert these pixel coordinates
      to Box2D coordinates using the scaleToWorld() function.*/

      bodyDefinition.position = scaleToWorld(mouseX, mouseY); // States the starting position of the body

      /*** TYPE: There are three possibilities for this:

        • DYNAMIC. This is what we will use most often—a “fully simulated” body. A dynamic body moves
            around the world, collides with other bodies, and responds to the forces in its environment.

        • STATIC. A static body is one that cannot move (as if it had an infinite mass). We’ll use static
            bodies for fixed platforms and boundaries.

        • KINEMATIC. A kinematic body can be moved manually by setting its velocity directly. If you have
            a user-controlled object in your world, you can use a kinematic body. Note that kinematic bodies
            collide only with dynamic bodies and not with other static or kinematic ones.

      *** FIXED ROTATION?: If true, the rotation of a body with never change.

      *** DAMPING: You can set a value for linear or angular damping, so that the object continuously slows as
      if there is friction (e.g. using "bd.linearDamping = 0.8;", and "bd.angularDamping = 0.9;"
      
      *** BULLET?: Fast-moving objects in Box2D should be set as bullets. This tells the Box2D engine that the
      object may move very quickly and to check its collisions more carefully so that it doesn’t accidentally
      jump over another body.*/

      bodyDefinition.type = box2d.b2BodyType.b2_dynamicBody; // Changes the body type

    /*////////////////////////////////////////////////////
    3) CREATE A BODY. With the body definition complete, we create the Body object itself. We can do this using
    the CreateBody() function, which is a method of the world object:*/

    this.body = world.CreateBody(bodyDefinition);

    /*////////////////////////////////////////////////////
    4) SET ANY OTHER CONDITIONS FOR THE BODY'S STARTING STATE. You can also set any other initial conditions for
    the body, such as linear or angular velocity, you can do so with the newly created Body object.*/

    this.body.SetLinearVelocity(new box2d.b2Vec2(0,10));
    this.body.SetAngularVelocity(random(-5, 5));

    
//////////////////////////////////////////////////////////
/* CREATING FIXTURES AND SHAPES
//////////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////////
  FIXTURES
  //////////////////////////////////////////////////////

    A body on its own doesn’t physically exist in the world. It’s like a soul with no human form to inhabit.
  For a body to have mass, we must first define a FIXTURE (whicn we can then use to attach to a shape to an
  object). This can be done using the following code:*/

    let fixture = new box2d.b2FixtureDef();   // Define a fixture

  /* A fixture also has several important properties that affect the body’s motion. There is DENSITY, which ultimately
  determines that body’s mass. Shapes also have FRICTION and RESTITUTION (“bounciness”). Note that this step can be
  skipped if you do not need to set the physics properties. (Box2D will use default values.)*/

    fixture.density = 1.0; // Change the DENSITY of the fixture (i.e. a therefore of the shape)
    fixture.friction = 0.5; // Change the FRICTION of the fixture (i.e. a therefore of the shape)
    fixture.restitution = 0.2; // Change the RESTITUTION (“bounciness”) of the fixture (i.e. a therefore of the shape)


  /*////////////////////////////////////////////////////
  SHAPES
  //////////////////////////////////////////////////////

    The job of the Box2D Shape class is to keep track of all the necessary collision geometry attached to a body.
  One of the nice things about Box2D’s methodology, which separates the concepts of bodies and shapes into two
  separate objects, is that you can attach multiple shapes to a single body in order to create more complex forms.
  We’ll see this in a future example.
  
    To create a shape, we need to first decide what kind of shape we want to make. For most non-circular shapes,
  a PolygonShape object will work just fine (CircleShape is also an option). Note that, when defining a shape, it
  is added as a property of the Fixture object. In the current example, we will make a rectangle. */

    fixture.shape = new box2d.b2PolygonShape(); // Create a new PolygonShape

  /*  Next up, we have to define the width and height of the rectangle. However, pixel units are no good for Box2D
  shapes! Therefore, we will have to use our helper functions to convert them first (i.e. scaleToWorld()). Once we have
  these converted coordinates, we can then use to SetAsBox(), which is a method of the shape object, to define the shape
  as a rectangle */

    let widthInWorldUnits = scaleToWorld(this.w / 2);
    let heightInWorldUnits = scaleToWorld(this.h / 2);
    fixture.shape.SetAsBox(widthInWorldUnits, heightInWorldUnits);


  /*////////////////////////////////////////////////////
  ATTACHING THE SHAPE TO THE BODY WITH THE FIXTURE
  //////////////////////////////////////////////////////

    Once the fixture and shape are defined (and attached), we just have to attach the shape to the body with the
  fixture by calling the CreateFixture(fixture) function. Note that, while most of our examples will take care of
  attaching shapes only once when the body is first built, this is not a limitation of Box2D. Box2D allows for shapes
  to be created and destroyed on the fly.*/

    this.body.CreateFixture(fixture); // Attach the fixture to the body
  }


//////////////////////////////////////////////////////////
/* DISPLAYING THE RESULTS OF BOX2D USING P5
//////////////////////////////////////////////////////////

    Box2D will keep track of the locations and physics of all the objects in its world. However, it won't
  display them on a screen. For this, we will need to extract the important properties of our objects from
  Box2D and use P5 to display these objects.
  
    A list of all the bodies that exist in the world can be accessed by calling the World object’s
  GetBodyList() function. However, as we are writing this display function inside of a Box class, we
  can just extract the position and angle of this box whenever the function is called. Once we have the
  position and angle, it’s easy to display the object using translate() and rotate().

    In case we want to have objects that can be removed from the Box2D world, note that we can destroy a
  body using the box2d.destroyBody(body) function.
*/

  // Drawing the box
  display() {

    /////////////////////////////////////////////////////////
    // Get the body's position
    /////////////////////////////////////////////////////////
    let position = scaleToPixels(this.body.GetPosition());

    /////////////////////////////////////////////////////////
    // Get its angle of rotation
    /////////////////////////////////////////////////////////
    let angle = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(position.x, position.y); // Display box at the position extracted from Box2D
    rotate(angle); // Rotate the box with the angle extracted from Box2D
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}


/*
  Outside of Box2D, you might draw a box with the following code:
  "
    class Box {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 16;
      }

      // Drawing the box
      display() {
        rectMode(CENTER);
        fill(127);
        stroke(200);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h);
      }
    }
  "
*/