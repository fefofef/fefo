// CANVAS
let width = 800;
let height = 800;
let superimposedCanvas;

// VISUAL ELEMENTS
var balls = [];
var lines = [];
var pollocks = [];
var shadows = [];

// SOUND ELEMENTS
var mic;

// GENERATION
var generator = 0;
var lineGrowing = 0;
var pollockAlive = 0;

// DESTRUCTION
var maxBalls = 11;
var pr, pg, pb;

function setup(){
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");

	//renderer.mousePressed(userStartAudio);
		
	superimposedCanvas = createGraphics(width, height);
	superimposedCanvas.parent("canvas-container");
	superimposedCanvas.clear();

	background(100);
	frameRate(25);

	pr = random(255);
	pg = random(255);
	pb = random(255);

	//mic = new p5.AudioIn();
	//mic.start();
}

function draw() {
	generator = random();
	background(map(generator, 0, 1, 150, 160));

	image(superimposedCanvas, 0, 0);

	makeBall(generator);
	if (lineGrowing == 0) {
		makeLine(generator);
	}

	if (pollockAlive == 0) {
		//print("pollockAlive: " + pollockAlive);
		makePollock(generator);
	}
	
	for (let i = 0; i < pollocks.length; i++) {
		pollocks[i].paint(generator);
		pr = pollocks[i].r;
		pg = pollocks[i].g;
		pb = pollocks[i].b;
		if (pollocks[i].isAlive == 1) {
			pollockAlive = 1;
		}
		else {
			pollockAlive = 0;
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

	maxBalls = 11 - balls.length;
	//var micLevel = mic.getLevel();
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		if (balls[i].col) {
			shadows[i].move(balls[i].x, balls[i].y);
			shadows[i].show(balls[i].s);
			//shadows[i].show(micLevel);//with sound
		}
		balls[i].show();
		if (balls[i].n > maxBalls ) {
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


function makePollock (randomNumber) {
	if (generator < 0.01) {
		//print("NEW POLLOCK");
		let pollock = new Pollock(pr,pg,pb);
		pollocks.push(pollock);
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

// function makeLine(randomNumber) {
// 	if (lines.lenght < 5) {
// 		if (generator < 0.1) {
// 			let randomLineX = random(width*0.2, width*0.8);
// 			let randomLineY = random(height*0.2, height*0.8);
// 			let line = new Line(randomLineX, randomLineY);
// 			print(line);
// 			lines.push(line);
// 		}
// 	} 
// }

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
		this.b = g;
		//status
		this.isAlive = 1;
	}

	paint (generator) {
		superimposedCanvas.stroke(
			//colors
			this.r = this.r + map(generator, 0, 1, -20, 20),
			this.g = this.g + map(generator, 0, 1, -20, 20), 
			this.b = this.b + map(generator, 0, 1, -20, 20), 
			map(generator, 0 , 1, 0, 255));
		superimposedCanvas.noFill(100);
		superimposedCanvas.strokeWeight(generator*random(5));
		if (this.n < 100) {
			if (generator > 0.9) {
				superimposedCanvas.point(this.pos.x, this.pos.y);
				superimposedCanvas.bezier(this.pos.x,
					this.pos.y,
					random(width), 
					random(width), 
					random(width), 
					random(width), 
					random(width)-this.prev.x, 
					random(height)-this.prev.y)    
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
			this.n++;
		} else	{
			this.isAlive = 0;			
		}
		}
}

// function mousePressed() {
// 	let line = new Line(random(width), random(height));
// 	lines.push(line);
// 	print("mousePressed!");
// }
