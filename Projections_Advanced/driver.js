var rotation = 0.2;
var parameter = { Speed: 1.0, Near:-1.0, Far:1,look_x:0.2,look_y:0.2,look_z:0
                ,test_x:0.0,test_y:0.0,test_z:-1.0, height:1,width:1
                };
var timePrev = Date.now();


function main() {
    var gui = new dat.GUI();
    gui.add(parameter, 'Speed', 1, 10).listen().onChange(function(value) {
        parameter.Speed = value;
    });


    gui.add(parameter, 'Near', -1, 1).listen().onChange(function(value) {
        parameter.Near = value;
    });

    gui.add(parameter, 'Far', -1, 1).listen().onChange(function(value) {
        parameter.Far = value;
    });

    gui.add(parameter, 'look_x', -1, 1).listen().onChange(function(value) {
        parameter.look_x = value;
    });

    gui.add(parameter, 'look_y', -1, 1).listen().onChange(function(value) {
        parameter.look_y = value;
    });

    gui.add(parameter, 'look_z', -1, 3).listen().onChange(function(value) {
        parameter.look_z = value;
    });


    gui.add(parameter, 'width', 0, 1).listen().onChange(function(value) {
        parameter.width = value;
    });


    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to find context');
    }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.program = program;

    var numberOfVertices = initVertices(program, gl);

    gl.enable(gl.DEPTH_TEST);
    var mMatrix = mat4.create();
    var vMatrix = mat4.create();
    var pMatrix = mat4.create();

    

    render(gl, numberOfVertices, mMatrix, vMatrix, pMatrix);
}

function initProjection(gl, pMatrix) {
    var u_projectionMatrix = gl.getUniformLocation(gl.program, 'u_projectionMatrix');
    if (!u_projectionMatrix) {
        console.log('Failed to get the storage locations of proj');
        return;
    }
    gl.uniformMatrix4fv(u_projectionMatrix, false, flatten(pMatrix));
}

function initTransformations(gl, mMatrix) {
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    if (!u_modelMatrix) {
        console.log('Failed to get the storage locations of modal');
        return;
    }
    gl.uniformMatrix4fv(u_modelMatrix, false, flatten(mMatrix));
}

function initViewing(gl, vMatrix) {
    var u_viewingMatrix = gl.getUniformLocation(gl.program, 'u_viewingMatrix');
    if (!u_viewingMatrix) {
        console.log('Failed to get the storage locations of viewing');
        return;
    }
    gl.uniformMatrix4fv(u_viewingMatrix, false, flatten(vMatrix));
}

function render(gl, numberOfVertices, mMatrix, vMatrix, pMatrix) {

    var currentangle = 0.0;
    var time, elapsed;
    var tick = function() {
        currentangle = animate(currentangle, time, elapsed);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.DEPTH_BUFFER_BIT);

        mat4.identity(mMatrix);
        mat4.translate(mMatrix, mMatrix, [0, 0.0, -5]);
        
        mat4.rotateX(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))
        mat4.rotateZ(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))

        initTransformations(gl, mMatrix);

        mat4.identity(vMatrix);
        mat4.lookAt(vMatrix, [parameter.look_x, parameter.look_y, parameter.look_z], [parameter.test_x, parameter.test_y, parameter.test_z], [0.0, 1.0, 0.0]);

        initViewing(gl, vMatrix);

        mat4.perspective(pMatrix, -1, parameter.width, -1.0, 1.0, parameter.Near, parameter.Far);
        initProjection(gl, pMatrix)



        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        gl.drawArrays(gl.LINE_LOOP, 4, 4);
        gl.drawArrays(gl.LINE_LOOP, 8, 4);
        gl.drawArrays(gl.LINE_LOOP, 12, 4);

        mat4.identity(mMatrix);
        mat4.translate(mMatrix, mMatrix, [-1, 0.0, -2]);

        mat4.rotateX(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))
        mat4.rotateZ(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))
        
        initTransformations(gl, mMatrix);

        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        gl.drawArrays(gl.LINE_LOOP, 4, 4);
        gl.drawArrays(gl.LINE_LOOP, 8, 4);
        gl.drawArrays(gl.LINE_LOOP, 12, 4);

        requestAnimationFrame(tick)
    }
    tick();
}

function initVertices(program, gl) {
    var size = 0.1;

    var vertices = [-size, -size, size, 1.0, 0, 0, 1.0,
                    size, -size, size, 1.0, 0, 0, 1.0, 
                    size, size, size, 1.0, 0, 0, 1.0,
                    -size, size, size, 1.0, 0, 0, 1.0,

                    -size, -size, -size, 1.0, 0, 0, 1.0,
                    size, -size, -size, 1.0, 0, 0, 1.0, 
                    size, size, -size, 1.0, 0, 0, 1.0,
                    -size, size, -size, 1.0, 0, 0, 1.0,

                    -size, -size, size, 1.0, 0, 0, 1.0,
                    size, -size, size, 1.0, 0, 0, 1.0, 
                    size, -size, -size, 1.0, 0, 0, 1.0,
                    -size, -size, -size, 1.0, 0, 0, 1.0,

                    -size, +size, size, 1.0, 0, 0, 1.0,
                    size, size, size, 1.0, 0, 0, 1.0, 
                    size, size, -size, 1.0, 0, 0, 1.0,
                    -size, size, -size, 1.0, 0, 0, 1.0
                    ];

    vertices = flatten(vertices);
    var noOfDim = 3;
    var colorItemSize = 4;
    var numberOfVertices = vertices.length / (noOfDim + colorItemSize);
    var ELEMENT_SIZE = vertices.BYTES_PER_ELEMENT; // array ( vertices) must be flatten or should be "FLOAT32ARAAY before call."
    console.log(ELEMENT_SIZE);

    // Setting up vertices and colors in interleaved buffer
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) { console.log('Failed to create the buffer object '); return -1; }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, "a_Position");
    if (a_Position < 0) { console.log("Failed to Get Position"); return; }
    gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, ELEMENT_SIZE * 7, 0);
    gl.enableVertexAttribArray(a_Position);

    // setting up color
    var a_Color = gl.getAttribLocation(program, "a_Color");
    if (a_Color < 0) { console.log("Failed to Get Color"); return; }

    gl.vertexAttribPointer(a_Color, colorItemSize, gl.FLOAT, false, ELEMENT_SIZE * 7, ELEMENT_SIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    return numberOfVertices;
}



function animate(currentangle, time, elapsed) {
    time = Date.now();
    elapsed = time - timePrev;
    timePrev = time;

    return (currentangle + (elapsed / (50 / parameter.Speed)));
}