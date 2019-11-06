function main()
{

	var traingle_active = 0;
	var quad_active = 0;

	var button = document.createElement("button");
	button.innerHTML = "Draw Trianlge"; 

	// 2. Append somewhere
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(button);

	var button2 = document.createElement("button");
	button2.innerHTML = "Draw Quad"; 

	body.appendChild(button2);

	var button3 = document.createElement("button");
	button3.innerHTML = "Change Color";

	body.appendChild(button3);

  	var canvas = document.getElementById('webgl');
  	gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram(program);
	gl.program = program;

	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
	// 3. Add event handler
	button.addEventListener ("click", function() {

		traingle_active = 1;
		quad_active = 0;
	  	drawTriangle(program,gl,u_FragColor);
	});

	// 3. Add event handler
	button2.addEventListener ("click", function() {
		traingle_active = 0;
		quad_active = 1;
	  	drawQuad(program,gl,u_FragColor);
	});

	// 3. Add event handler
	button3.addEventListener ("click", function() {
	
	  ChangeColor(program,gl,u_FragColor,traingle_active,quad_active);
	});

}

function drawTriangle(program,gl,u_FragColor){

	var draw_id = 1;
	var numberOfVertices = initVertices(program,gl,draw_id);
	render(gl,numberOfVertices,u_FragColor,draw_id);

}

function drawQuad(program,gl,u_FragColor){

	var draw_id = 2;
	var numberOfVertices = initVertices(program,gl,draw_id);
	render(gl,numberOfVertices,u_FragColor,draw_id);

}

function ChangeColor(program,gl,u_FragColor,traingle_active,quad_active)
{
	if(traingle_active)
	{
		var numberOfVertices = initVertices(program,gl,1);
		render(gl,numberOfVertices,u_FragColor,3);
	}

	else if (quad_active)
	{
		var numberOfVertices = initVertices(program,gl,2);
		render(gl,numberOfVertices,u_FragColor,3);		
	}
}

function render(gl,numberOfVertices,u_FragColor,draw_id)
{

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	if(draw_id == 1 || draw_id == 2)
	{
		gl.uniform4f(u_FragColor, 1.0, 1.0, 0.0, 1.0);
	}

	else
	{
		gl.uniform4f(u_FragColor,Math.random(), Math.random(), Math.random(), 1.0)
	}

	gl.drawArrays(gl.TRIANGLES,0,numberOfVertices);

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

