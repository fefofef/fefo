var ball = {
	x: 800,
	y: Math.random()*,
	xspeed: -1*Math.random(0,10)
}

function setup() {
	let renderer = createCanvas(800,800);
	renderer.parent("canvas-container");
}

function drawEllipse() {
	stroke(255);
	strokeWeight(1);
	fill(0);
	ellipse(ball.x, ball.y+random(0,100), 100, 100);
	x = ball.x+ball.xspeed;
}

function draw() {
	background(233, 191, 105);
	drawEllipse();
}
