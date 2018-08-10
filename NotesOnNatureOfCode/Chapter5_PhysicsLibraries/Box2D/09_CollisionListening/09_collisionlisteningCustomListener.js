//////////////////////////////////////////////////////////////////////////////////////////////
//                       BOX2D: COLLISION LISTENING (CUSTOM LISTENER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    The last thing we should cover about Box2D is detection of collisions. Box2D alerts you to moments of
  collision with something called an “interface", as well as the ContactListener class. To make sure that
  we are alerted when there are object collisions, we need to use the SetContactListener on the world object
  (passing an object of this CustomListener class).

  There are four collision event callbacks:

      1. BeginContact() — Triggered whenever two shapes first come into contact with each other.

      2. EndContact() — Triggered over and over again as long as shapes continue to be in contact.

      3. PreSolve() — Triggered before Box2D solves the outcome of the collision, i.e. before
                    beginContact(). It can be used to disable a collision if necessary.

      4. PostSolve() — Triggered after the outcome of the collision is solved. It allows you to
                    gather information about that “solution” (known as an “impulse”).
  
    It should also be noted that due to how Box2D triggers these callbacks, you cannot create or destroy
  Box2D entities inside of beginContact(), endContact(), preSolve(), or postSolve(). If you want to do this,
  you’ll need to set a variable inside an object (something like: markForDeletion = true), which you check during
  draw() and then delete objects.
*/

// ContactListener to listen for collisions!
class CustomListener {

  /////////////////////////////////////////////////
  // Collision event functions!
  /////////////////////////////////////////////////
  //  There are four collision event callbacks:

  // 1. BeginContact()
  BeginContact(contact) { // Notice that this function includes an argument of type 'contact'. A Contact object
                          //  includes all the data associated with a collision—the geometry and the forces.*/
    
    // Step 1: Which bodies collided? (Because shapes are attached to bodies with fixture, we must get both fixtures)
    let fixture1 = contact.GetFixtureA();
    let fixture2 = contact.GetFixtureB();

    // Step 2: Fixtures, could you tell me which body you are attached to?
    let body1 = fixture1.GetBody();
    let body2 = fixture2.GetBody();

    // Step 3: Bodies, could you tell me which Particles you are associated with?
    /* Box2D provides a function that allows us to attach our Processing object (a Particle) to a
      Box2D body via the setUserData() and getUserData() methods. Note that, in order for us to
      get the user data now (GetUserData()), it is necessary to set the user data (SetUserData())
      in the constructor function of the Particle class. */
    let object1 = body1.GetUserData();
    let object2 = body2.GetUserData();

    // If the identified objects are particle, apply the collision event to those objects
    if (object1 instanceof Particle && object2 instanceof Particle) {
      object1.applyCollision();
      object2.applyCollision();
    }
  }

  // 2. EndContact()
  EndContact(contact) {};

  // 3. PreSolve()
  PreSolve(contact, manifold) {};

  // 4. PostSolve()
  PostSolve(contact, manifold) {};
}