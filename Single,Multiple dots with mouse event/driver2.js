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

	x_left = ((x-rect.left) - canvas.height/2) / (canvas.height/2) - 0.1;
	y_left = (canvas.width/2 - (y - rect.top)) / (canvas.width/2);

	x_top = ((x-rect.left) - canvas.height/2) / (canvas.height/2);
	y_top = (canvas.width/2 - (y - rect.top)) / (canvas.width/2) - 0.1;

	x_right = ((x-rect.left) - canvas.height/2) / (canvas.height/2) + 0.1;
	y_right = (canvas.width/2 - (y - rect.top)) / (canvas.width/2);

	x_bottom = ((x-rect.left) - canvas.height/2) / (canvas.height/2);
	y_bottom = (canvas.width/2 - (y - rect.top)) / (canvas.width/2) + 0.1;

	console.log(x,y);
	tapCoordinates.push(x_top);
	tapCoordinates.push(y_top);
	tapCoordinates.push(x_left);
	tapCoordinates.push(y_left);
	tapCoordinates.push(x_bottom);
	tapCoordinates.push(y_bottom);
	tapCoordinates.push(x_right);
	tapCoordinates.push(y_right);
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
