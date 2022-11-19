// CANVAS
const width = 800;
const height = 800;
var secondCanvas;
var pixelCanvas;

// VISUAL ELEMENTS
var balls = [];
var lines = [];
var pollocks = [];
var impacts = [];
var dots = [];
var parametrics = [];

// GENERATION
var generator = 0;
var lineGrowing = 0;
var pollockAlive = 0;
var dotAlive = 0;
var xoff = 0;
var inc = 0.03;
var t = 0; //parametric

// DESTRUCTION
var maxBalls = 11;
var maxNoisy = 11;

// COLORS
var pr, pg, pb; //pollock pallete

// module operation for negative numbers
function mod(n, m) {
  return ((n % m) + m) % m;
}

function setup(){
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");
	
	secondCanvas = createGraphics(width, height);
	secondCanvas.parent("canvas-container");
	secondCanvas.clear();

	background(255, 236, 223);
	frameRate(30);


	pr = random(255);
	pg = random(255);
	pb = random(255);
}

function draw() {
	generator = random();
	
	background(255, 236, 223);
	image(secondCanvas, 0, 0);


	//generate elements
	makeBall(generator);

	if (lineGrowing == 0) {
		makeLine(generator);
	}
	
	if (pollockAlive == 0) {
		makePollock(generator);
	}

	for (let i = 0; i < pollocks.length; i++) {
		pollocks[i].paint(generator);
		if (pollocks[i].isAlive == 1) {
			pollockAlive = 1;
			pr = mod(pollocks[i].r, 255);
			pg = mod(pollocks[i].g, 255);
			pb = mod(pollocks[i].b, 255);
		}
		else {
			pollockAlive = 0;
		}
	}
	
	//generate lines
	for (let i = 0; i < lines.length; i++) {
		lines[i].grow();
		lines[i].show();
		if (lines[i].growing == 1) {
			lineGrowing = 1;	
		} else {
			lineGrowing = 0;
		}
	}
	
	//generate dots
	if (dotAlive == 0) {
		makeDots(generator);
	}
	if (generator > 0.1 && generator < 0.2) {
		for (let i = 0; i < dots.length; i++) {
			dots[i].move();
			dots[i].show();
			if (dots[i].isAlive == 1) {
				dotAlive = 1;
			} else {
				dotAlive = 0;
			}
		}
	}
	

	//generate balls
	maxBalls = 11 - balls.length;
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		if (balls[i].col) {
			impacts[i].move(balls[i].x, balls[i].y);
			impacts[i].show(balls[i].s);
		}
		balls[i].show();
		if (balls[i].n > maxBalls ) {
			balls.splice(i, 1);
			impacts.splice(i, 1);
		}
	}
	
	curved();

	//parametric();
	//t++;
}

//CREATION FUNCTIONS
function makeBall(generator) {
	if (generator > 0.999) {
		let ball = new Ball;
		balls.push(ball);
		let impact = new Impact(ball.x, ball.y, ball.s);
		impacts.push(impact);
	}
}

function makePollock(generator) {
	if (generator < 0.001) {
		//print("NEW POLLOCK");
		let pollock = new Pollock(mod(pr, 255), mod(pg, 255), mod(pb, 255));
		pollocks.push(pollock);
	}
}

function makeLine(generator) {    
	if (generator > 0.49 && generator < 0.5) {    
                let line = new Line();    
                lines.push(line);      
        }    
}

function makeDots(generator) {    
        if (generator > 0.199 && generator < 0.2) {    
                let dot = new Dot();
                dots.push(dot);
        }    
}

class Ball {
	constructor() {
		this.s = random(70, 100); //size
		this.x = random(width - this.s); //position X
		this.y = random(height - this.s); //position Y

		this.vx = random(-5, 5); //accX
		this.vy = random(-5, 5); //accY

		this.c = color(random(255), random(255), random(255), random(50,200)); //color
		this.sc = color(0); //stroke color
		this.n = 0; //number of collisions
		this.col = false; //state of collision
	}

	move() {
		this.col = false;
		if (this.x + (this.s/2) > width) {
			this.col = true;
			this.vx = random(5)*-1;
			this.n++;
		}
		else if (this.x - (this.s/2) < 0) {
			this.col = true;
			this.vx = random(5);		
			this.n++;
		}
		if (this.y + (this.s/2) > height) {
			this.col = true;
			this.vy = random(5)*-1;
			this.n++;
		}
		else if (this.y - (this.s/2) < 0) {
			this.col = true;
			this.vy = random(5);		
			this.n++;
		}
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
	}

	show() {
		stroke(this.sc);
		strokeWeight(2);
		fill(this.c);
		ellipse(this.x, this.y, this.s);
	}
}

class Impact {
	constructor(x, y, s) {
		this.x = x;
		this.y = y;
		this.s = s;
		this.c = color(random(255), random(255), random(255), random(150,200)); //color
	}

	move(x, y) {
		this.x = x;
		this.y = y;
	}

	show() {
		noStroke();
		fill(this.c);
		ellipse(this.x, this.y, this.s*2);
	}
}

class Line {
	constructor() { 
		this.x1 = random(width*0.2, width*0.8);
                this.y1 = random(height*0.2, height*0.8);
		this.x2 = this.x1;
		this.y2 = this.y1;

		this.xg = random(-2, 2); // X growth speed
		this.yg = random(-2, 2); // Y growth speed
		this.sW = random(20,100)/50; // Stroke Weight

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
	constructor(r, g, b) {
		//position
		this.x = random(width);
		this.y = random(height);
		this.n = 0;
		this.pos = createVector(this.x, this.y);
		this.prev = this.pos.copy();
		//color
		this.r = r;
		this.g = g; 
		this.b = b;
		//status
		this.isAlive = 1;
	}
	paint(generator) {
		secondCanvas.stroke(//colors
			this.r = this.r + map(random(), 0, 1, -2, 2),
			this.g = this.g + map(random(), 0, 1, -2, 2), 
			this.b = this.b + map(random(), 0, 1, -2, 2), 
			map(generator, 0 , 1, 0, 100));

		secondCanvas.noFill(100);
		secondCanvas.strokeWeight(generator*random(5));
		if (this.n < 10) {
			if (generator > 0.9) {
				secondCanvas.point(this.pos.x, this.pos.y);
				secondCanvas.bezier(this.pos.x,
					this.pos.y,
					random(width/2), 
					random(width/2), 
					random(width/2), 
					random(width/2), 
					random(width/2)-this.prev.x, 
					random(height/2)-this.prev.y)    
				this.prev.set(this.pos);    
				
				this.step = p5.Vector.random2D();    
	                	this.step.mult(random(width/5) + 1);    
       				this.pos.add(this.step);      
				this.n++;
			} else {	    
				secondCanvas.point(this.pos.x, this.pos.y);                
				secondCanvas.bezier(
					this.pos.x, 
					this.pos.y, 
					this.pos.x + random(width*random(-1,1), height*random(-1,1)), 
					this.pos.y + random(width*random(-1,1), height*random(-1,1)), 
					random(width)*-1,
					random(height)*-1,
					//this.prev.x + random(width*random(-1,1), height*random(-1,1)), //comment to wavy lines
					//this.prev.y + random(width*random(-1,1), height*random(-1,1)), //comment to wavy lines 
					this.prev.x, 
					this.prev.y)    
	                	this.prev.set(this.pos);    
	
				this.step = p5.Vector.random2D();
				this.step.mult(random(5, 10) + 1);
				this.pos.add(this.step);
				this.n++;
			}
			this.n++;
		} else	{
			this.isAlive = 0;			
		}
		}
}

class Dot {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.xoff = 0;
		this.yoff = 100;

		this.sw = random(10); //strokeWeight
		this.c = random(255); //color
		this.n = 0;
		this.isAlive = 1;
	}

	move() {
		if (this.n < 100) {
			this.x = (this.x + random(-10,10)); 
			this.y = (this.y + random(-10,10));
			this.n++;
		} else {
			this.isAlive = 0;
		}
	}

	show() {
		this.sw = random(1,10);
		this.c = random(100);
		secondCanvas.stroke(this.c);
		secondCanvas.strokeWeight(this.sw);
		secondCanvas.point(this.x, this.y);
		
		this.xoff += 0.01;
		this.yoff += 0.01;
	}
}

//parametric equation
function x1(t) {
	return sin(t/10)*100 + sin(t/5)*20;	
}

function y1(t) {
	return cos(t/10)*100;	
}

function x2(t) {
	return sin(t/10)*200 + sin(t)*2;	
}

function y2(t) {
	return sin(t/10)*200 + cos(t/12)*20;	
}

function parametric() {
	stroke(0);
	strokeWeight(5);
	translate(width/2, height/2);
	for (let i = 0; i < 3; i++) {
		line(x1(t+i*10),y1(t+i*10),x2(t+i*10),y2(t+i*10));
	}
}


function smokeBackground() {
	let inc = 0.005;
	let xoff = 0; 
	loadPixels();
	stroke(0);
	for (let x = 0; x < width; x++) {
		let yoff = 1000;
		for (let y = 0; y < height; y++) {
			let i = (x + y * width) * 4;
			r = noise(xoff, yoff);
			pixels[i+0] = r*random(100);
			pixels[i+1] = r*random(200);
			pixels[i+2] = r*random(10);
			pixels[i+4] = r*random(255);
			yoff += inc;
		}
	xoff += inc;
	}
	updatePixels();
}

function curved() {
	secondCanvas.strokeWeight(map(noise(xoff), 0, 1, 1, 30));
	if (mouseIsPressed === true) {
		secondCanvas.line(mouseX, mouseY, pmouseX, pmouseY);
		xoff = xoff + inc;
	}
}
