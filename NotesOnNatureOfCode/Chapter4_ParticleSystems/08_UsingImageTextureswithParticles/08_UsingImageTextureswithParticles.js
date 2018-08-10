//////////////////////////////////////////////////////////////////////////////////////////////
//                  PARTICLE SYSTEMS: USING IMAGE TEXTURES WITH PARTICLES
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

// A basic smoke effect using a particle system
// Each particle is rendered as an alpha masked image

/*
    Although we have previously drawn particle simply as single shapes (e.g. circles and squares),
  it is also possible to alter the display of particle using images. For example, one can load a
  PNG file with (for example) a white center that fades to tranparency the further you move from
  the center. If you use this PNG to display each particle, it will produce a smoke like effect,
  with each particle having a bright center that fades towards the outside.

    To create this effect, you need to load an image texture in this main program and then add that
  image into the Particle System object. This is important as it would cause to great a strain on the
  computer's memory of each Particle object has to load the PNG file independently. Once the image is
  added to the Particle System, it can be passed on to each Particle object, where it is used to display
  each of those particles.

    It is worth noting that there are many different algorithms for blending colors in computer graphics.
  These are often referred to as “blend modes.” By default, when we draw something on top of something else
  in P5, we only see the top layer—this is commonly referred to as a “normal” blend mode. When the pixels
  have alpha transparency (as they do in the smoke example), P5 uses an alpha compositing algorithm that
  combines a percentage of the background pixels with the new foreground pixels based on the alpha values.
  However, it’s possible to draw using other blend modes, and a much loved blend mode for particle systems
  is “additive.” Additive blending in Processing was pioneered by Robert Hodgin (http://roberthodgin.com/)
  in his famous particle system and forces exploration, 'Magnetosphere', which later became the iTunes
  visualizer. For more see: Magnetosphere (http://roberthodgin.com/magnetosphere-part-2/).

    Note that this process can be made faster by using WebGL. An example of how this is used can be
  found in the subfolder '09_UsingTexturesWithWEBGL'.
*/

let ps;
let img;

// Function loads a PNG image from Github (note that loading the image locally seems to cause CORS issues)
function preload() {
  img = loadImage("https://raw.githubusercontent.com/shiffman/The-Nature-of-Code-Examples/master/chp04_systems/NOC_4_08_ParticleSystemSmoke/data/texture.png");
}

function setup() {
  createCanvas(640, 360);

  // Add the previously loaded image to the Particle System, so it can be used for every created particle (this is better than reloading the image for every particle)
  ps = new ParticleSystem(0, createVector(width / 2, height - 75), img);
}

function draw() {

  // Try additive blending!
  // You also need clear or else the colors will accumulate between frames
  // blendMode(ADD);
  // clear();

  background(0);

  // Additive blending!
  // Calculate a "wind" force based on mouse horizontal position
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  ps.applyForce(wind);
  ps.run();
  for (let i = 0; i < 2; i++) {
    ps.addParticle();
  }

  // Draw an arrow representing the wind force
  drawVector(wind, createVector(width / 2, 50, 0), 500);

}

// Renders a vector object 'v' as an arrow and a position 'loc'
function drawVector(v, pos, scayl) {
  push();
  let arrowsize = 4;
  // Translate to position to render vector
  translate(pos.x, pos.y);
  stroke(255);
  // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  let len = v.mag() * scayl;
  // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
  line(0, 0, len, 0);
  line(len, 0, len - arrowsize, +arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);
  pop();
}
