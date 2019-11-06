function main(angle) {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to find context');
    }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.program = program;


    var numberOfVertices = initVertices(program, gl, 5);

    initTransformations(gl, 0,0.5);
    render(gl, numberOfVertices);

    var numberOfVertices = initVertices(program, gl, 6);
    initTransformations(gl, 0,-0.5);
    render(gl, numberOfVertices);


    angle.onChange(function(val){
    	var numberOfVertices = initVertices(program, gl, 5);

    	initTransformations(gl, val, 0.5);
    	render(gl, numberOfVertices);

    	var numberOfVertices = initVertices(program, gl, 6);

    	initTransformations(gl, val, -0.5);
    	render(gl, numberOfVertices);

    });

}

function render(gl, numberOfVertices) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numberOfVertices);
}

function initVertices(program, gl, size) {
	if(size == 5)
	{
    	var vertices = [-0.1, -0.1, 0.1, -0.1, 0.2, 0.1, 0, 0.3, -0.2, 0.1];
	}

	else
	{
    	var vertices = [-0.1, -0.1, 0.1, -0.1, 0.2, 0.1, 0.1, 0.3, -0.1, 0.3, -0.2, 0.1];
	}

    var noOfDim = 2;
    var numberOfVertices = vertices.length / noOfDim;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) { console.log('Failed to create the buffer object '); return -1; }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    if (a_Position < 0) { console.log("Failed to Get Position"); return; }

    gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return numberOfVertices;
}

function initTransformations(gl, val, trans) {
	
	mvPushMatrix();
	mat4.translate(mvMatrix,mvMatrix, [trans,0,0])
    var transformationMatrix = gl.getUniformLocation(gl.program, 'translationMatrix');
    gl.uniformMatrix4fv(transformationMatrix, false, flatten(mvMatrix));
    mvPopMatrix();

	mvPushMatrix();
    mat4.rotateZ(mvMatrix, mvMatrix, val*Math.PI/180);
    var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');
    gl.uniformMatrix4fv(transformationMatrix, false, flatten(mvMatrix));

	mvPopMatrix();
	
}


var FizzyText = function() {
    this.message = 'dat.gui';
    this.Angle = 1;
    this.displayOutline = false;
    this.explode = function() {

    };

};

window.onload = function() {
    var text = new FizzyText();
    var gui = new dat.GUI();
	gui.domElement.id = 'gui';
    var angle = gui.add(text, 'Angle', 1, 360);
    
    main(angle);
};