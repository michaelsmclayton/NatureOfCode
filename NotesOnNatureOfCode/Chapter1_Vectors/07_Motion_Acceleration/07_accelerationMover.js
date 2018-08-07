//////////////////////////////////////////////////////////////////////////////////////////////
//                              VECTORS - ACCELERATION (MOVER CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com
/*
  Previously in this course, we looked at how a bouncing ball can be represented
  by two vectors: position and velocity. At each point in the animation, the
  position of the ball was updated by adding the velocity to the current location.
  In this bouncing ball example, all of this code happened in Processing’s main tab,
  within setup() and draw(). What we want to do now is move towards encapsulating all
  of the logic for motion inside of a class. This way, we can create a foundation for
  programming moving objects in Processing. In this case, we’re going to create a
  generic Mover class that will describe a thing moving around the screen.

  However, in addition to creating a Mover class, we also want to add the concept of
  acceleration into the mix. Previously, the bouncing ball was pretty boring to see.
  It didn't speed up or slow down. For more naturalistic motion, we can add acceleration.
  The strict definition of 'acceleration' here is: "the rate of change of velocity".
  Given that velocity is defined as "the rate of change of location", in essence, we
  are developing a “trickle-down” effect where acceleration changes velocity, which
  changes location. In fact, as an exercise, from this point forward, let’s try to
  write every other example in this book without ever touching the value of velocity
  and location (except to initialize them). In other words, our goal now for programming
  motion is: Come up with an algorithm for how we calculate acceleration and let the
  trickle-down effect work its magic!

*/
// Define Mover class
class Mover{
  // Define the data that a Mover has
  constructor(accelerationType, ballColour, ballRadius, ballOpacityValue){
    this.position = createVector(random(width),random(height));
    this.velocity = createVector();
    this.topspeed = 10;
    this.centralX = 0;
    this.centralY = 0;
    this.accelerationFunction = null;
    //////////////////////////////////////////////////////////////
    // Constant acceleration
    //////////////////////////////////////////////////////////////
    if (accelerationType=='constant'){
      this.acceleration = createVector(-0.003, 0.01);
    }
  }

  // Define the functionality that a Mover has
  update() { // A Mover must be able to update its location
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed); // This keeps the magnitude of velocity to 10 or less
    this.position.add(this.velocity);

    //////////////////////////////////////////////////////////////
    // Random acceleration
    //////////////////////////////////////////////////////////////
    if (accelerationType=='random'){
      // this.acceleration = p5.Vector.random2D(); random2D() not implemented? doing raw math for now instead
      var angle = random(TWO_PI);
      this.acceleration = createVector(cos(angle), sin(angle));
      this.acceleration.mult(random(2)); /* The random acceleration vector is normalised. We can give
                                            this a random magnitude by multiplying it by a random scaler */
    
    //////////////////////////////////////////////////////////////
    // Acceleration toward mouse
    //////////////////////////////////////////////////////////////
    /*
      Anytime we want to calculate a vector based on a rule or a
      formula, we need to compute two things: magnitude and direction.
      Let’s start with direction.

      We know the acceleration vector should point from the object’s
      location towards the mouse location. Let’s say the object is
      located at the point (objectX,objectY) and the mouse at (mouseX,
      mouseY). The figure below shows that we can get a vector (Ax, Ay)
      by subtracting the object’s location from the mouse’s location:

                               .(mouseX, mouseY)
                              /|
                             / | Ay = mouseY - objectY
                            /  |
                           /   |
                          /    |
                         /     |
     (objectX, objectY)./______| 
                      Ax = mouseX - objectX
      
      We now have a vector (A) that points from the object’s location all
      the way to the mouse. If the object were to actually accelerate using
      that vector, it would appear instantaneously at the mouse location.
      Instead, we want to make the object accelerate towards the mouse, and
      we want to decide how quickly that object should accelerate. In order
      to set the magnitude of our acceleration vector, we must first normalise
      that direction vector, then multiply it by a scalar to give it a certain
      magnitude.

      You may be wondering why the circle doesn’t stop when it reaches the target.
      It’s important to note that the object moving has no knowledge about trying
      to stop at a destination; it only knows where the destination is and tries
      to go there as quickly as possible. Going as quickly as possible means it will
      inevitably overshoot the location and have to turn around, again going as quickly
      as possible towards the destination, overshooting it again, and so on and so forth.
      Stay tuned; in later chapters we’ll learn how to program an object to arrive at a
      location (slow down on approach).

    */
    // Compute a vector (acceleration) that points from position to mouse
  
  } else if (accelerationType=='towardMouse' || accelerationType=='centralBurst') {
      if (accelerationType=='towardMouse'){
        this.centralX = mouseX; this.centralY = mouseY;
        this.accelerationFunction = () => this.acceleration.mag()/1000;
      } else {
        this.centralX = width/2; this.centralY = height/2;
        this.accelerationFunction = () => (this.acceleration.mag()^2)/1000;
      }
      var mouse = createVector(this.centralX, this.centralY); // Get the current location vector of the mouse
      this.acceleration = p5.Vector.sub(mouse,this.position); // Set acceleration as the mouse vector minus the object vector
      let currentMagnitude = this.accelerationFunction();
      this.acceleration.setMag(currentMagnitude); // Set magnitude of acceleration
    }
  }

  display() { // A Mover must be able to be displayed
    noStroke(); //stroke(0); strokeWeight(2);
    fill(ballColour, ballOpacityValue);
    ellipse(this.position.x, this.position.y, ballRadius);
  }

  checkEdges() { /* A Mover must also be able to update its location
                    when it passes the edge of the screen */
    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  burst() {
    // let maxBurst = 1000;
    //let randomVector = createVector(random(-maxBurst,maxBurst), random(-maxBurst,maxBurst));
    this.position = createVector(random(width),random(height));
    this.velocity = createVector();
    //console.log(this.velocity)
  }
}
