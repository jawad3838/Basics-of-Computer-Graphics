function main()
{

	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);


	var tapCoordinates = [];
	canvas.onmousedown = function(ev) {

		click(ev,gl,canvas,a_Position,tapCoordinates);
	};

	var program = initShaders(gl,"vertex-shader","fragment-shader");
	gl.useProgram(program);
	gl.program = program;

	var a_Position = gl.getAttribLocation(program, 'a_Position');
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}

function click(ev,gl,canvas,a_Position,tapCoordinates)
{

	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();

	x = ((x-rect.left) - canvas.height/2) / (canvas.height/2);
	y = (canvas.width/2 - (y - rect.top)) / (canvas.width/2);


	console.log(x,y);
	tapCoordinates.push(x);
	tapCoordinates.push(y);

	render(gl,a_Position,tapCoordinates);

}

function render(gl,a_Position,tapCoordinates)
{

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = tapCoordinates.length;

	for(var i = 0; i < len; i+=2)
	{
		gl.vertexAttrib3f(a_Position,tapCoordinates[i],tapCoordinates[i+1],1.0);
		gl.drawArrays(gl.Points,0,1);
	}
	
}

function initVertices(program,gl,draw_id)
{

	if(draw_id == 1)
	{
		var vertices = [-0.5,-0.5,0.5,-0.5,0,0.5];
	}
	else if (draw_id == 2)
	{
		var vertices = [-0.5,-0.5,0.5,-0.5,0.5,0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5];
	}

	var dim = 2;
	var numberOfVertices = vertices.length / dim;

	var vertexBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(program, 'a_Position');

	gl.vertexAttribPointer(a_Position,dim,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);

	return numberOfVertices;

}
