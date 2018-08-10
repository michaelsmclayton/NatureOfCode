//////////////////////////////////////////////////////////////////////////////////////////////
//                              NOTES ON INTEGRATION METHODS
//////////////////////////////////////////////////////////////////////////////////////////////
// The Nature of Code (Daniel Shiffman) http://natureofcode.com

/*
    As we are dealing with physics libraries in this chapter, it is important to briefly go
over some of the maths behind what we have been doing. In essence, we have been doing calculus,
using the concepts of differentiation and integration.

    DIFFERENTIATION is the process of finding a “derivative.” The derivative of a function is a
measure of how a function changes over time. Consider location and its derivative. Location is a
point in space, while velocity is change in location over time. Therefore, velocity can be described
as the “derivative” of location. Similarly, acceleration can be considered the change in velocity
over time, and is therefore the “derivative” of velocity.

    INTEGRATION is the opposite (or inverse) of differentiation. The integral of an object’s velocity
over time tells us the object’s new location when that time period ends. Location is the integral of
velocity, and velocity is the integral of acceleration. Since our physics simulation is founded upon
the process of calculating acceleration based on forces, we need integration to figure out where the
object is after a certain period of time (like one frame of animation!)

    So far in our examples, we have been using Euler integration (pronounced “Oiler”) (i.e. velocity.
add(acceleration); location.add(velocity);). This method is essentially the simplest form of integration
and very easy to implement in our code. However, it is not necessarily the most efficient form, nor is
it close to being the most accurate.

    Why is Euler inaccurate? Let’s think about it this way. When you drive a car down the road pressing
the gas pedal with your foot and accelerating, does the car sit in one location at time equals one
second, then disappear and suddenly reappear in a new location at time equals two seconds, and do the
same thing for three seconds, and four, and five? No, of course not. The car moves continuously down the
road. But what’s happening in our P5 sketch? A circle is at one location at frame 0, another at frame 1,
another at frame 2. Sure, at thirty frames per second, we’re seeing the illusion of motion. But we only
calculate a new location every N units of time, whereas the real world is perfectly continuous. This
results in some inaccuracies: The “real world” is the curve; Euler simulation is the series of line
segments.

    One option to improve on Euler is to use smaller timesteps—instead of once per frame, we could
recalculate an object’s location twenty times per frame. Howeber, this isn’t practical as our sketch
would then run too slowly. For better accuracy, Box2D uses something called symplectic Euler or semi-
explicit Euler (http://en.wikipedia.org/wiki/Symplectic_Euler_method), a slight modification of Euler.
There is also an integration method called Runge-Kutta (named for German mathematicians C. Runge and M.
W. Kutta), which is used in some physics engines. However, another popular integration method that is
used by Toxiclibs is known as “Verlet integration.” A simple way to describe Verlet integration is to
think of our typical motion algorithm without velocity. After all, we don’t really need to store the
velocity. If we always know where an object was at one point in time and where it is now, we can
extrapolate its velocity. Verlet integration does precisely this, though instead of having a variable
for velocity, it calculates velocity while the program is running. Verlet integration is particularly
well suited for particle systems, especially particle systems with spring connections between the
particles. We don’t need to worry about the details because Toxiclibs, takes care of them for us.
However, if you are interested, here is the seminal paper on Verlet physics, from which just about
every Verlet computer graphics simulation is derived: "Advanced Character Physics"
(http://www.gamasutra.com/resource_guide/ 20030121/jacobson_pfv.htm). And of course, you can find out
more about Verlet integration from Wikipedia (http://en.wikipedia.org/wiki/Verlet_integration).

*/