var x = 100;
var y = 100;
var acc1 = 20;
var acc2 = 20;
var c;

function windowResized() {
	resizeCanvas()	
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	frameRate(24);
	
	b = 0;
	c = color(255, 184, 77);

	x = random(0, windowWidth);
	y = random(0, windowHeight);


	//pos = createVector(random(windowWidth), random(windowHeight));
	//prev = pos.copy();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(32);
	ellipse(x, y, 100,100);
	stroke(c);

	size = random(0, 3);
	strokeWeight(1);
	fill(color(255 - random(0, 10), 184, 77));
	
	r1 = random(0, 500);

	if (x > windowWidth) {
		acc1 = -10;
	}
	else if (x < 0) {
		acc1 = 10;		
	}

	if (y > windowHeight) {
		acc2 = -10;
	}
	else if (y < 0) {
		acc2 = 10;		
	}

	x = x + acc1;
	y = y + acc2;
}

function mouseDragged(){
  paintBuffer.ellipse(mouseX, mouseY, brushSize);
}
