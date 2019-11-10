var parameter = { Speed: 2.0, Near:-1.0, Far:1, ShiftX:0.04, ShiftY:-0.05 };
var timePrev = Date.now();


function main() {
	var gui = new dat.GUI();
	gui.domElement.id = 'gui';

	gui.add(parameter, 'Speed', 1, 10).listen().onChange(function(value) {
        parameter.Size = value;
    });


	gui.add(parameter, 'Near', -1, 1).listen().onChange(function(value) {
        parameter.Near = value;
    });

    gui.add(parameter, 'Far', -1, 1).listen().onChange(function(value) {
        parameter.Far = value;
    });

    gui.add(parameter, 'ShiftX', -1, 1).listen().onChange(function(value) {
        parameter.ShiftX = value;
    });

    gui.add(parameter, 'ShiftY', -1, 1).listen().onChange(function(value) {
        parameter.ShiftY = value;
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
        
        mat4.rotateX(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))
        mat4.translate(mMatrix, mMatrix, [0.0, 0.5, 0.0]);

        initTransformations(gl, mMatrix);

        mat4.identity(vMatrix);
        mat4.lookAt(vMatrix, [parameter.ShiftX, parameter.ShiftY, 0.0], [0.0, 0.0, -1.0], [0.0, 1.0, 0.0]);

        initViewing(gl, vMatrix);

        mat4.ortho(pMatrix, -1.0, 1.0, -1.0, 1.0, parameter.Near, parameter.Far);
    	initProjection(gl, pMatrix)

        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        gl.drawArrays(gl.LINE_LOOP, 4, 4);
        gl.drawArrays(gl.LINE_LOOP, 8, 4);
        gl.drawArrays(gl.LINE_LOOP, 12, 4);

        mat4.identity(mMatrix);
        mat4.rotateY(mMatrix, mMatrix,(Math.PI / 180) *(currentangle))
       	mat4.translate(mMatrix, mMatrix, [0.5, 0.0, 0.0]);
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
    var size = 0.2;
 
    var vertices = [-size, -size, size, 0.0, 1.0, 1.0, 1.0,
        			size, -size, size, 0.0, 1.0, 1.0, 1.0, 
        			size, size, size, 0.0, 1.0, 1.0, 1.0,
        			-size, size, size, 0.0, 1.0, 1.0, 1.0,

        			-size, -size, -size, 0, 1.0, 1.0, 1.0,
        			size, -size, -size, 0, 1.0, 1.0, 1.0, 
        			size, size, -size, 0, 1.0, 1.0, 1.0,
        			-size, size, -size, 0, 1.0, 1.0, 1.0,

        			-size, -size, size, 0, 1.0, 1.0, 1.0,
        			size, -size, size, 0, 1.0, 1.0, 1.0, 
        			size, -size, -size, 0, 1.0, 1.0, 1.0,
        			-size, -size, -size, 0, 1.0, 1.0, 1.0,

        			-size, size, size, 0, 1.0, 1.0, 1.0,
        			size, size, size, 0, 1.0, 1.0, 1.0, 
        			size, size, -size, 0, 1.0, 1.0, 1.0,
        			-size, size, -size, 0, 1.0, 1.0, 1.0
    				];

    vertices = flatten(vertices);
    var noOfDim = 3;
    var colorItemSize = 4;
    var numberOfVertices = vertices.length / (noOfDim + colorItemSize);
    var ELEMENT_SIZE = vertices.BYTES_PER_ELEMENT; 

    // Setting up vertices and colors in inteleaved buffer
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