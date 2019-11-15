# Basics-of-Computer-Graphics
This repository includes various projects that will help you understand the basic concepts of computer graphics such as transformations, animations, texturing, model-view matrix and more.

## Pre-requisites
We will be using WebGL graphics pipeline to create these programs. An overview of the pipeline is shown below:

![WebGL Pipelinegit](https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/webgl-pipeline.png)

The lib folder must be included in the root folder as it contains the necessary libraries needed for all programs to work. Include that in the parent directory where all the individual programs are placed.

## Projects

### Dots on screen using mouse Event
This program tell us the basics of the WebGL pipeline such as passing values to the vertex and fragment shaders and handling mouse events.

|Single Dot|Multiple Dots|
|---|---|
|![](https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Single%2CMultiple%20dots%20with%20mouse%20event/SingleDot.PNG)|![](https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Single%2CMultiple%20dots%20with%20mouse%20event/MultipleDots.PNG)|

### Draw Quad/Triangle with colors
This program tells us the basics of passing colors to fragments that make up a particular shape.

<p align="center">
  <img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Triangle%2CSquare%20with%20colors/Triangle_Quad.gif"
       width = "600"\>
</p>

### Rotating objects
This program covers the basics of using the model-view matrix and basic transformations (such as translation, rotation)

<p align="center">
  <img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Rotating%20an%20Object/RotatingShapes.gif" \>
</p>

### Rotating Multiple Objects Together
This program tells us how to use the model-view matrix stack in order to perform multiple transformation operations at once.

<p align="center">
  <img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Rotating%20Multiple%20Objects/RotatingMultipleObjects.gif" \>
</p>

### Getting Started with Animations - Projections
This program tell us how to move the direction of the camera and view moving objects from different angles.

<table>
  <tr>
    <td align="center"><b>Standard View Point (Viewing Out of Screeen)</b></td>
    <td align="center"><b>Moving Out of Screen</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections/StandardRotation.gif" width="400" \></td>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections/ShiftInZ.gif" width="400"\></td>
  </tr>
  <tr>
    <td align="center"><b>Moving Along X-axis</b></td>
    <td align="center"><b>Moving Along Y-axis</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections/ShiftInX.gif" width="400"\></td>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections/ShiftInY.gif" width="400"\></td> 
  </tr>
</table>

### Viewing Objects at Different Distances from Camera - Projections_Advanced
This program tells us how to implement parallel projection for two objects that are at different distances from the camera. The concept of perceiving depth is explained here.

<table>
  <tr>
    <td align="center"><b>Standard View Point</b></td>
    <td align="center"><b>Shift in X and Y</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections_Advanced/StandardView.gif" width="400" \></td>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections_Advanced/ShiftInX%26Y.gif" width="400"\></td>
  </tr>
  <tr>
    <td align="center"><b>Shift in X and Z</b></td>
    <td align="center"><b>Shift in Y and Z</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections_Advanced/ShiftInX%26Z.gif" width="400"\></td>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/Projections_Advanced/ShiftInY%26Z.gif" width="400"\></td> 
  </tr>
</table>

### How to work with Lights in a Scene - 3DScene_With_CameraControl
This program tells us how to introduce lights in our 3D scene and how to manipulate them with changing environments. You can control the camera in this program using the arrow keys.

<table>
  <tr>
    <td align="center"><b>Default View</b></td>
    <td align="center"><b>Effect of Changing Light Conditions on all 3 cubes</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/3DScene_with_CameraControl/DefaultView.gif"           width="400" \></td>
    <td><img src="https://github.com/jawad3838/Basics-of-Computer-Graphics/blob/master/3DScene_with_CameraControl/ChangingLightConditions.gif" width="400" \></td>
  </tr>
</table>
