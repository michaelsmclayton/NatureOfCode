//////////////////////////////////////////////////////////////////////////////////////////////
//                     OSCILLATION: ANGULAR VELOCITY (OSCILLATOR CLASS)
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    In the previous example, we controlled the phase of the oscillation by
  referring to the current percentage through the oscillation period. We used
  screen frames to refer to oscillation speed, and this is useful if we care
  about precise oscillation times (e.g. in milliseconds). However, (with perhaps
  less temporal precision) we can also vary the speed of an oscillation by
  defining its ANGULAR VELOCITY. Remember, in comparison to varying an objects
  location on the screen:

    • Angle = Position
    • Velocity = Angular Velocity
    • Acceleration = Angular Acceleration

    For example, in the code below, an Oscillator has a current angle, angular
  velocity, and angular acceleration. This means that, on every call of the
  oscillate() function:

  • The current angular velocity is added to the current angle

  • The current acceleration is added to the current velocity.

  • When an Oscillator is draw, the position of the circle is calculated by combining
    the current sine(angle) [i.e. direction of vector] and the overall amplitude
    of the oscillation [i.e. the magnitude of the vector].

  • This means that updating the angle of an object using its angular velocity
    changes the position of the circle.
    
  • Also, updating the angular velocity of an object using its angular acceleration
    changes the velocity, and therefore the frequency/period of the oscillation.
*/

class Oscillator {
  constructor() {
    this.angle = createVector();
    this.amplitude = createVector(random(20, width/4), random(20, height*.4));
    this.AccelerationRange = 0.0001;
    this.angularVelocity = createVector(this.getVector(), this.getVector());
    this.angularAcceleration = createVector(this.getVector(), this.getVector());
  }

  getVector() {
    return random(-this.AccelerationRange, this.AccelerationRange)
  }

  oscillate() {
    this.angle.add(this.angularVelocity); // The angle is increased by the angular velocity
    this.angularVelocity.add(this.angularAcceleration); // The anglular velocity is increased by the angular acceleration
    console.log(this.angularVelocity)
  }

  display() {
    let x = sin(this.angle.x) * this.amplitude.x; // Get the X coordinate of the wave at the current angle (scaled by amplitude)
    let y = sin(this.angle.y) * this.amplitude.y; // Get the Y coordinate of the wave " " ""

    push();
    translate(width / 2, height / 2);
    stroke(255);
    strokeWeight(2);
    fill(127, 127);
    line(0, 0, x, y);
    ellipse(x, y, 32, 32);
    pop();
  }
}
