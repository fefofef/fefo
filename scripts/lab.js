// CANVAS
let width = 800;
let height = 800;
let superimposedCanvas;

// VISUAL ELEMENTS
let balls = [];
let lines = [];
let pollocks = [];
let shadows = [];

// SOUND ELEMENTS
let mic;

var generator = 0;
var lineGrowing = 0;
var pollockAlive = 0;
var destroyB = 11;

function setup(){
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");

	//renderer.mousePressed(userStartAudio);
		
	superimposedCanvas = createGraphics(width, height);
	superimposedCanvas.parent("canvas-container");
	superimposedCanvas.clear();

	background(100);
	frameRate(25);

	mic = new p5.AudioIn();
	mic.start();
}

function draw() {
	background(100);

	image(superimposedCanvas, 0, 0);
	
	generator = random();
	makeBall();
	if (lineGrowing == 0) {makeLine();}
	if (pollockAlive == 0) {makePollock();}

	for (let i = 0; i < pollocks.length; i++) {
		pollocks[i].paint(generator);
		if (pollocks[i].isAlive == 1) {
			pollockAlive = 1;
		}
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
	var micLevel = mic.getLevel();
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		if (balls[i].col) {
			shadows[i].move(balls[i].x, balls[i].y);
			shadows[i].show(balls[i].s);
			//shadows[i].show(micLevel);//with sound
		}
		balls[i].show();
		if (balls[i].n > destroyB) {
			balls.splice(i, 1);
			shadows.splice(i, 1);
		}
	}
	
}

function makeBall(randomNumber) {
	if (balls.lenght < 1) {
		if (generator > 0.90) {
			let ball = new Ball();
			balls.push(ball);
			let shadow = new Shadow(ball.x, ball.y, ball.s);
			shadows.push(shadow);
		}
	}
	else if (balls.length < 2) {
		if (generator > 0.99) {
			let ball = new Ball();
			balls.push(ball);
			let shadow = new Shadow(ball.x, ball.y, ball.s);
			shadows.push(shadow);
		}
	}
	else if (balls.length < 5) {
		if (generator > 0.995) {
			let ball = new Ball();
			balls.push(ball);
			let shadow = new Shadow(ball.x, ball.y, ball.s);
			shadows.push(shadow);
		}
	}
	else {
		if (generator > 0.999) {
			let ball = new Ball();
			balls.push(ball);
			let shadow = new Shadow(ball.x, ball.y, ball.s);
			shadows.push(shadow);
		}
	}
}

//function mousePressed() {
//	let pollock = new Pollock();
//	pollocks.push(pollock);
//	print("mousePressed!");
//}

function makePollock (randomNumber) {
	if (pollocks.lenght < 1) {
		if (generator < 0.1) {
			let pollock = new Pollock();
			pollocks.push(pollock);
		}
	}
	else if (pollocks.lenght < 20) {
		if (generator < 0.05) {
			let pollock = new Pollock();
			pollocks.push(pollock);
		}
	}
	else {
		if (pollocks < 0.01) {
			let pollock = new Pollock();
			pollocks.push(pollock);
		}
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
	constructor() {
		this.s = random(70, 100); //size
		this.x = random(width - this.s); //position X
		this.y = random(height - this.s); //position Y

		this.vx = random(-5, 5); //accX
		this.vy = random(-5, 5); //accY

		this.c = color(255, random(184), random(77)); //color
		this.n = 0; //number of collisions
		this.col = false; //state of collision
	}

	move() {
		this.col = false;
		if (this.x + (this.s/2) > width) {
			this.col = true;
			this.vx = random(5)*-1;
			this.n += 1;
		}
		else if (this.x - (this.s/2) < 0) {
			this.col = true;
			this.vx = random(5);		
			this.n += 1;
		}
		if (this.y + (this.s/2) > height) {
			this.col = true;
			this.vy = random(5)*-1;
			this.n += 1;
		}
		else if (this.y - (this.s/2) < 0) {
			this.col = true;
			this.vy = random(5);		
			this.n += 1;
		}
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
	}

	show() {
		stroke(this.c);
		strokeWeight(2);
		fill(32);
		ellipse(this.x, this.y, this.s);
	}
}

class Shadow {
	constructor (x, y, s) {
		this.x = x;
		this.y = y;
		this.s = s;
	}

	move (x, y) {
		this.x = x;
		this.y = y;
	}

	show () {
		noStroke();
		fill(255);
		ellipse(this.x, this.y, this.s*2);
	}
	//show (micLevel) {
	//	noStroke();
	//	fill(255);
	//	ellipse(this.x, this.y, map(micLevel, 0, 1, this.s, this.s*2));
	//}//with sound
	
}

class Line {
	constructor() {
		this.x1 = random(width*0.2, width*0.8);
		this.y1 = random(height*0.2, height*0.8);
		this.x2 = this.x1;
		this.y2 = this.y1;

		this.xg = random(-2, 2); // X growth speed
		this.yg = random(-2, 2); // Y growth speed
		this.sW = random(1,10); // Stroke Weight

		this.size = random(height/2, width/2); // line lenght 
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

class Pollock {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.n = 0;
		this.isAlive = 1;
		this.pos = createVector(this.x, this.y);
		this.prev = this.pos.copy();
	}

	paint (generator) {
		superimposedCanvas.stroke(random(0, 100), random(100, 200), random(100, 200), 255);
		superimposedCanvas.noFill(100);
		superimposedCanvas.strokeWeight(generator*random(5));    
		
		if (generator > 0.98) {
			superimposedCanvas.point(this.pos.x, this.pos.y);
			superimposedCanvas.bezier(this.pos.x, this.pos.y, random(width), random(width), random(width), random(width), this.prev.x, this.prev.y)    
			this.prev.set(this.pos);    
			
			this.step = p5.Vector.random2D();    
	                this.step.mult(random(width/5) + 1);    
       			this.pos.add(this.step);      
			this.n++;
		} else {    
			superimposedCanvas.point(this.pos.x, this.pos.y);                
			superimposedCanvas.bezier(this.pos.x, this.pos.y, this.pos.x + random(width*0.1*-1, height*0.1), this.pos.y + random(width*0.1*-1, height*0.1), this.prev.x + random(width*0.1*-1, height*0.1), this.prev.y + random(width*0.1*-1, height*0.1), this.prev.x, this.prev.y)    
	                this.prev.set(this.pos);    
	
			this.step = p5.Vector.random2D();
			this.step.mult(random(5, 10) + 1);
			this.pos.add(this.step);
			this.n++;
		}
		if (this.n > 100) {
			this.isAlive = 0;			
			this.pos = this.prev;
		}
	}
}
