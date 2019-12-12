import turtle
import numpy as np

# Define number of iterations
iterations = 8

# Setup screen
screen = turtle.Screen()
screenSize = screen.screensize()
turtle.tracer(0) # have system draw instantly (pen.speed(0))

# Define function to make new pen
def makeNewPen(xOffset, yOffset, penSize):
    pen = turtle.Turtle()
    pen.hideturtle() # don't show the turtle
    pen.left(90) # point pen up instead of right
    pen.penup()
    pen.setpos(xOffset*screenSize[0], yOffset*screenSize[1])
    pen.pendown()
    pen.pensize(penSize)
    return pen

# State production rules
productionRules = {
    "F": "FF",
    "X": "F[+X][-X]FX"
}


# Define function to produce full axiom
def processAxiom(axiom='X'):
    global iterations

    # Define function to apply production rules
    def applyProductionRules(axiom):
        global productionRules
        result = ""
        for i in axiom:
            # Repeat constant symbols
            if i in {'+', '-', '[', ']'}:
                result += i
                continue
            # Get production rule
            currentRule = productionRules.get(i)
            # Apply rule if present
            if currentRule != None:
                result += currentRule
            # Or return letter if no rule is specified
            else:
                result += i
        return result

    # Define function to add stochasticity
    def applyStochasticity(axiom):
        result = ""
        for letter in axiom:
            if letter in {'+','-'}:
                if np.random.rand()>.5:
                    result += letter
            result += letter
            # # Randomly kill tree at branch
            # if letter == ']':
            #     if np.random.rand()<10**-5:
            #         break
        return result

    # Perform iterations
    for i in range(iterations):
        axiom = applyProductionRules(axiom)

    # Apply stochasticity
    return applyStochasticity(axiom)

# Define function to draw
def drawAxiom(xOffset, yOffset, axiom, length, angle, penSize, penColour):
    initialPenSize = penSize
    pen = makeNewPen(xOffset, yOffset, penSize)
    pen.pencolor(penColour, penColour, penColour)
    stack  = []
    for letter in axiom:
        if letter == 'F':
            pen.forward(length)
        elif letter == '+':
            pen.left(angle)
        elif letter == '-':
            pen.right(angle)
        elif letter == '[':
            stack.append((pen.heading(), pen.pos(), penSize))
            penSize *= .6
        elif letter == ']':
            heading, position, penSize = stack.pop()
            pen.penup()
            pen.goto(position)
            pen.setheading(heading)
            pen.pendown()
        # Update pen size
        penSize *= 1 - (10**-3 * initialPenSize/3)
        pen.pensize(penSize)
        

# Define function to draw single tree
def drawExample(xOffset, yOffset, lengthMean):
    # Get length
    lengthRange = lengthMean/10
    length = np.random.normal(lengthMean, lengthRange)
    # Get rest
    angleMean = 15; angleRange = 1
    penMean = 15*lengthMean; penRange = .1
    drawAxiom(xOffset=xOffset, yOffset=yOffset,
        axiom=processAxiom(), length=length, angle=np.random.normal(angleMean, angleRange),
        penSize=np.random.normal(penMean, penRange), penColour=np.asscalar(np.float64((1.0-np.abs(yOffset)))))
    turtle.update()
    print('Tree drawn...')


drawExample(xOffset=0, yOffset=-.8, lengthMean=1)

# # Draw scene
# def drawRow(yOffSet):
#     xOffset = -.8
#     while xOffset < .5:
#         yOffset = np.random.normal(yOffSet, .075)
#         xOffset += np.abs(yOffSet)/5 + np.random.rand()/4
#         if xOffset < .5:
#             drawExample(xOffset=xOffset, yOffset=yOffset, lengthMean=1*np.abs(yOffset))
#     print('Row drawn')
# drawRow(yOffSet=-.2) # Draw far trees
# drawRow(yOffSet=-.5) # Draw far trees
# drawRow(yOffSet=-.85) # Draw close trees

# Save image
# turtle.getscreen().getcanvas().postscript(file='trees.ps')

# # Define function to sample x and y coordinates
# def getXYCoords():
#     x = (np.random.rand()*2)-1
#     y = .8 * x
#     return x, y
# for i in range(3):
#     x, y = getXYCoords()
#     drawExample(xOffset=x, yOffset=y)

