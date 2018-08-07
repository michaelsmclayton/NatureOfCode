//////////////////////////////////////////////////////////////////////////////////////////////
//          PARTICLE SYSTEMS: INHERITANCE AND POLYMORPHISM (SQUARE PARTICLE SUBCLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
   INHERITANCE AND POLYMORPHISM are two of the three, fundamental concepts in object-oriented
  programming (the other being encapsulation). These concepts allow one to generate many different
  types of objects, all of which share data and functionality, but which are able to differ in
  specific, custom ways.

    For example, imagine you want to create a particle system where not all the particles are circles
  (as was true in previous examples), but rather the particles randomly vary in their shape (e.g. looking
  like confetti). To do this, you could just write two different Particle classes (e.g. CircleParticle,
  and SquareParticle) and randomly select between these classes when generating a system of particles.
  However, these independent classes will inevitably share data (e.g. point of origin, acceleration)
  and functionality (e.g. isDead()). Therefore, if you write these as seperate classes,
  you will inevitably copy a large amount of code between them, which will make your code less concise
  and harder to maintain.

    We can use the principle of INHERITANCE to get around this issue. Rather than writing two seperate
  classes, we can make a PARENT CLASS called 'Particle' with all the fundamental data and functionality of
  a particle. We can then use this parent class to generate two CHILD CLASSES: one called SquareParticle
  (described in the code below), where the display function states that the particle should be displayed as
  a rectangle, and another called CircleParticle, where the display function states that the particle should
  be displayed as a circle. In this sense, the Particle class is POLYMORPHIC, as it can appear in many
  different forms.

    A child class can be created from a parent class by using the keyword EXTENDS. If a child class 'extends'
  a parent class, then the child class will inherit all the data and functions of the parent class. If new data
  or functionality are added to the child class, these will be added a new features for the child (if they are
  totally original), or will overwrite the data and functions of the parent class (if they conflict with the
  data and/or functionality of the parent class). To reference data or functionality of the parent class within
  the child class, you can use the keyword SUPER. This is an object that contains the data and functions of the
  parent class. For example, in the current example, super.isDead() refers to the isDead function of the parent,
  ParticleClass. SUPER() can also be used as a function to run the constructor method from the parent class.
*/

// Child class constructor
class SquareParticle extends Particle {

  // // Apparently this is optional in P5 (although it isn't in Processing)
  // constructor(position) {
  //   super(position) // Call the constructor function from the parent class
  // }

  // Add a display method, which prints each particle as a square
  display() {
    rectMode(CENTER); // Square
    fill(255, this.lifespan);
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    var theta = map(this.position.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    rect(0, 0, 12, 12);
    pop();
    // super.isDead() // Refers to the function in the parent class
  }
}