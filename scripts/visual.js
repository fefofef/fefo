let ballSize = 50;
let ballX = Math.random()*800;
let ballY = Math.random()*800;
let width = 800;
let height = 800;
let ballxSpeed = 1;
let ballySpeed = 1;
var ballColors = [Math.random()*255,Math.random()*255,Math.random()*255];

function setup() {
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");
}

class Ball {
	constructor() {
	}
}

function drawEllipse(x, y) {
	stroke(255);
	strokeWeight(1);
	fill(ballColors);
	ellipse(x, y, 50);
}


function draw() {
	background(100, 100, 100);
	ballX += ballxSpeed;
	ballY += ballySpeed;
	ballColors[0] = ((ballY/800)*255);
	drawEllipse(ballX, ballY);
	if (ballX > width-ballSize/2 || ballX < ballSize/2) {
		print("BallX: " + ballX);
		ballxSpeed = (ballxSpeed + random(15)*0.2)*-1;
		print("ballxSpeed: " + ballxSpeed);
	}
	if (ballY > height-ballSize/2 || ballY < ballSize/2) {
		print("BallY: " + ballY);
		ballySpeed = (ballySpeed + random(15)*0.2)*-1;
		print("ballySpeed: " + ballySpeed);
	}
	if (ballY < -1 || ballX < -1) {
		ballX = ballX + ballSize;
		ballY = ballY + ballSize; 
	}
}
