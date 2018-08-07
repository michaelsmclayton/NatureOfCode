//////////////////////////////////////////////////////////////////////////////////////////////
//                  PARTICLE SYSTEMS: AN ARRAY OF PARTICLES (PARTICLE CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    Since the early 1980s, PARTICLE SYSTEMS have been used in countless video games,
  and digital art pieces to model various irregular types of natural phenomena (e.g. fire,
  smoke, waterfalls, fog, grass, bubbles, etc.). William T. Reeves, a researcher on Star
   Treck, defined a particle system as:

    “...a collection of many many minute particles that together represent a fuzzy object.
    Over a period of time, particles are generated into a system, move and change from
    within the system, and die from the system.”
  
    For our purposes, we can define a particle system as a collection of independent objects,
  stored in an array. As suggested above, such collections are useful to model interesting
  phenomena (e.g. explosions). However, the techniques of particle systems can also be applied
  whenever you simply want to keep track of many different components inside a single scene.
  In just about every chapter after this one, we will have to work with a list of objects.

    The data structure in which we store a particle system must allow flexibility in size:
  we may want a particle system that starts off empty, but then grows into a big and more
  complicated system. Secondly, we should take advance of object-oriented programming and
  define a ParticleSystem class. However, before we build such a class, let's first look
  at a defining a single Particle class.

    Thankfully, our Particle class is very similar to the Mover class we defined previously
  in this course: A Particle is an independent body that moves about the screen. It has:
  • a location, velocity, and acceleration, • a constructor to initialize those variables,
  • functions to display() itself and update() its location. We could also add previous
  features like applyForce(). However, the first thing we are going to focus on here in the
  feature of LIFESPAN.

    Typical particle systems involve something called an EMITTER. The emitter is the source
  of the particles and controls their initial settings (location, velocity, etc). An emitter
  might emit a single burst of particles, or a continuous stream of particles, or both.
  However, each particle cannot live forever. If it couldn't die, our P5 sketch would eventually
  grind to a halt as the number of particles increases to an unwieldy number. Consequently,
  as new particles are born, we need old particles to die. This creates the illusion of an
  infinite stream of particles, but where the performance of our program does not suffer.

    There are many different ways to decide when a particle dies (e.g. when it comes into contact
  with another object, leaves the screen, etc). However, for this first Particle class, we’re
  simply going to add a lifespan variable. The lifespan will start at 255 and count down to 0,
  at which point the particle will be considered “dead”. The reason we chose 255-0 is so that
  we can assign lifespan as the alpha transparency for the Particles as well. When the particle
  is “dead” it will also have faded away.

    

    
    





*/

class Particle {

  constructor(position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-2, 2), random(-1, 1));
    this.position = position.copy();
    this.colour = {r: 255, g: 255, b: 255}
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  // Method to display
  display() {
    noStroke()
    fill(this.colour.r, this.colour.g, this.colour.b, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

  // Custom function to change particle colour
  updateColour(colourTransitionArray) {
    this.colour.r = colourTransitionArray.r[Math.floor(this.lifespan)];
    this.colour.g = colourTransitionArray.g[Math.floor(this.lifespan)];
    this.colour.b = colourTransitionArray.b[Math.floor(this.lifespan)];
  }
}