var rotation = 0.1;
var parameter = {Size: 1.0};
var timePrev = Date.now();


function main() {

	var gui = new dat.GUI();
	gui.domElement.id = 'gui';

    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to find context');
    }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.program = program;

    gui.add(parameter, 'Size', 1, 10).listen().onChange(function(value) {
        parameter.Size = value;
    });


    var currentangle = 0.0;
    var time, elapsed;
    var tick = function() {
        currentangle = animate(currentangle, time, elapsed);
        console.log(currentangle)

        var numberOfVertices = initVertices(program, gl);
        initTransformations(gl, mvMatrix);
        render(gl, 0, 6);

        mvPushMatrix(); 
        mat4.rotateZ(mvMatrix, mvMatrix, (Math.PI / 180) *(currentangle));
        initTransformations(gl, mvMatrix);

        render(gl, 6, 6); 

        mvPopMatrix();
        mat4.rotateZ(mvMatrix, mvMatrix, (Math.PI / 180) *(90+currentangle));
        
        initTransformations(gl, mvMatrix);
        render(gl, 6, 6)


        for (var i = 0; i < 4; i++) {

            mat4.identity(mvMatrix);
            mvPushMatrix();
            mat4.rotateZ(mvMatrix, mvMatrix, (Math.PI / 180) *(( i * 90)+currentangle));

            mat4.translate(mvMatrix, mvMatrix, [0.5, 0, 0])
            mat4.rotateZ(mvMatrix, mvMatrix, Math.PI / 2);
            initTransformations(gl, mvMatrix);
            render(gl, 12, 3)

            if(i%2 == 0){
            	mvPushMatrix();
            	mat4.translate(mvMatrix, mvMatrix, [0.14, 0, 0])
            	initTransformations(gl, mvMatrix);
            	render(gl, 12, 3)
            	mvPopMatrix();

            	mvPushMatrix();
            	mat4.translate(mvMatrix, mvMatrix, [-0.14, 0, 0])
            	initTransformations(gl, mvMatrix);
            	render(gl, 12, 3)
            	mvPopMatrix();
        	}
            mvPopMatrix();

        }

        var x  = 1;
        for (var i = 0; i < 2; i++) {
            mat4.identity(mvMatrix);
            mvPushMatrix();
            mat4.translate(mvMatrix, mvMatrix, [(((currentangle%440)/100)*x/2)-(1*x),(0.8)*x,0]);
            initTransformations(gl, mvMatrix);
            render(gl, 15, 6);
            mvPopMatrix();
            x*= -1;
        }

        requestAnimationFrame(tick)
    }
    tick();


}

function initTransformations(gl, modelMatrix) {
    var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');
    gl.uniformMatrix4fv(transformationMatrix, false, flatten(modelMatrix));

}

function render(gl, start, numberOfVertices) {
    gl.drawArrays(gl.TRIANGLES, start, numberOfVertices);
}

function initVertices(program, gl) {
    var vertices = [-0.2, -0.2, 0.0, 1.0, 1.0, 1.0,
        0.2, -0.2, 0.0, 1.0, 1.0, 1.0, 
        -0.2, 0.2, 0.0, 1.0, 1.0, 1.0,
        0.2, -0.2, 0.0, 1.0, 1.0, 1.0,
        0.2, 0.2, 0.0, 1.0, 1.0, 1.0, 
        -0.2, 0.2, 0.0, 1.0, 1.0, 1.0,

        -0.001, -0.5, 0.0, 1.0, 0.0, 1.0,
        0.001, -0.5, 0.0, 1.0, 0.0, 1.0,
         -0.001, 0.5, 0.0, 1.0, 0.0, 1.0,
        0.001, -0.5, 0.0, 1.0, 0.0, 1.0,
        0.001, 0.5, 0.0, 1.0, 0.0, 1.0, 
        -0.001, 0.5, 0.0, 1.0, 0.0, 1.0,

        -0.05, -0.05, 1.0, 0.0, 0.0, 1.0,
        0.05, -0.05, 1.0, 0.0, 0.0, 1.0,
        0, 0.02, 1.0, 0.0, 0.0, 1.0,

        -0.1, -0.1, 1.0, 1.0, .0, 1.0,
        0.1, -0.1, 1.0, 1.0, 0.0, 1.0, 
        -0.1, 0.1, 1.0, 1.0, 0.0, 1.0,
        0.1, -0.1, 1.0, 1.0, 0.0, 1.0,
        0.1, 0.1, 1.0, 1.0, 0.0, 1.0, 
        -0.1, 0.1, 1.0, 1.0, 0.0, 1.0
    ];

    vertices = flatten(vertices);
    var noOfDim = 2;
    var colorItemSize = 4;
    var numberOfVertices = vertices.length / (noOfDim + colorItemSize);
    var ELEMENT_SIZE = vertices.BYTES_PER_ELEMENT; 

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) { console.log('Failed to create the buffer object '); return -1; }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, "a_Position");
    if (a_Position < 0) { console.log("Failed to Get Position"); return; }
    gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, ELEMENT_SIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(program, "a_Color");
    if (a_Color < 0) { console.log("Failed to Get Color"); return; }

    gl.vertexAttribPointer(a_Color, colorItemSize, gl.FLOAT, false, ELEMENT_SIZE * 6, ELEMENT_SIZE * 2);
    gl.enableVertexAttribArray(a_Color);

    return numberOfVertices;
}

function animate(currentangle, time, elapsed){
	time = Date.now();
	elapsed = time - timePrev;
	timePrev = time;

	return (currentangle + (elapsed / (50 / parameter.Size)));
}