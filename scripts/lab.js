// CANVAS SIZE
let width = 800;
let height = 800;

// VISUAL ELEMENTS
let balls = [];
let lines = [];
let shadows = [];

// SOUND ELEMENTS
let mic;

var lineGrowing = 0;
var destroyB = 11;
var generator = 0;

function setup(){
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");
	renderer.mousePressed(userStartAudio);

	background(100);
	frameRate(25);

	mic = new p5.AudioIn();
	mic.start();
}

function draw() {
	background(100);
	
	generator = random();
	makeBall();

	if (lineGrowing == 0) {
		makeLine();
	}

	for (let i = 0; i < lines.length; i++) {
		lines[i].grow();
		lines[i].show();
		if (lines[i].growing == 1) {
			lineGrowing = 1;	
		}
		else {
			lineGrowing = 0;
		}
	}

	destroyB = 11 - balls.length;

	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		balls[i].show();
		if (balls[i].col == true) {
			print("bang!");
		}			
		
		if (balls[i].n > destroyB) {
			balls.splice(i, 1);
		}
	}
	
	//var micLevel = mic.getLevel();
	//noStroke();
	//fill(255);
	//ellipse(width/2, height/2, 200*micLevel);
}

function makeBall(randomNumber) {
	if (balls.lenght < 1) {
		if (generator > 0.90) {
			let ball = new Ball(random(width), random(height));
			balls.push(ball);
		}
	}
	else if (balls.length < 2) {
		if (generator > 0.99) {
			let ball = new Ball(random(width), random(height));
			balls.push(ball);
		}
	}
	else if (balls.length < 5) {
		if (generator > 0.995) {
			let ball = new Ball(random(width), random(height));
			balls.push(ball);
		}
	}
	else {
		if (generator > 0.999) {
			let ball = new Ball(random(width), random(height));
			balls.push(ball);
		}
	}
}

function makeShadow (x, y) {
	for (let i = 0; i < balls.length; i++) {
		let shadow = new Shadow(balls[i].x, balls[i].y);				
	}
}

function makeLine(randomNumber) {
	if (lines.lenght < 1) {
		if (generator < 0.1) {
			let line = new Line();
			lines.push(line);
		}
	}
	else if (lines.lenght < 20) {
		if (generator < 0.05) {
			let line = new Line();
			lines.push(line);
		}
	}
	else {
		if (generator < 0.01) {
			let line = new Line();
			lines.push(line);
		}
	}
}

class Ball {
	constructor(x, y) {
		this.x = x; //position X
		this.y = y; //position Y

		this.acc1 = random(-5, 5); //accX
		this.acc2 = random(-5, 5); //accY

		this.c = color(255, random(184), random(77)); //color
		this.s = random(70, 100); //size
		this.n = 0; //number of collisions
		this.col = false; //state of collision
	}

	move() {
		if (this.x + (this.s/2) > width) {
			this.acc1 = random(5)*-1;
			this.n += 1;
			this.col = true;
		}
		else if (this.x - (this.s/2) < 0) {
			this.acc1 = random(5);		
			this.n += 1;
			this.col = true;
		}
		if (this.y + (this.s/2) > height) {
			this.acc2 = random(5)*-1;
			this.n += 1;
			this.col = true;
		}
		else if (this.y - (this.s/2) < 0) {
			this.acc2 = random(5);		
			this.n += 1;
			this.col = true;
		}
		this.col = false;
		this.x = this.x + this.acc1;
		this.y = this.y + this.acc2;
	}

	show() {
		stroke(this.c);
		strokeWeight(2);
		fill(32);
		ellipse(this.x, this.y, this.s);
	}
}

class Shadow {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.c = color(255);
		this.s = 100;
	}

	move (x, y) {
		this.x = x;
		this.y = y;
	}

	collision (col){
		return (col);
	}

	show () {
		noStroke();
		fill(255);
		ellipse(this.x, this.y, this.s);
	}
	
}

class Line {
	constructor() {
		this.x1 = random(width);
		this.y1 = random(height);
		this.x2 = this.x1;
		this.y2 = this.y1;

		this.xg = random(-1, 1); // X growth speed
		this.yg = random(-1, 1); // Y growth speed
		this.sW = random(1,10); // Stroke Weight

		this.size = random(height,width); // line lenght 
		this.growing = 0;
	}

	grow(){
		if (dist(this.x1, this.y1, this.x2, this.y2) < this.size) {
			this.growing = 1;
			this.x2 += this.xg;
			this.y2 += this.yg;
		} 
		else if (this.x2 == width || this.y2 == height || this.x2 == 0 || this.y2 == 0) {
			this.growing = 0;
			this.xg = 0;
			this.yg = 0;
		} else {
			this.growing = 0;
			this.xg = 0;
			this.yg = 0;
		}
	}

	show() {
		stroke(0);
		strokeWeight(this.sW);
		line(this.x1, this.y1, this.x2, this.y2);
	}
	
}
