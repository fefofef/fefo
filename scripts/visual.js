let width = 800;
let height = 800;

var x, y, acc1, acc2; //ball propierties

let balls = [];

function setup(){
	let renderer = createCanvas(width, height);
	renderer.parent("canvas-container");
	
	background(100);

	frameRate(24);

}

function draw() {
	background(100);
	for (let ball of balls) {
		ball.move();
		ball.show();
	}
	
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		balls[i].show();
		if (balls[i].n > 10) {
			balls.splice(i, 1);	
		}
	}
}

function mousePressed () {
	let ball = new Ball(mouseX, mouseY);
	balls.push(ball);
};

class Ball {
	constructor(x, y) {
		this.x = x; //position X
		this.y = y; //position Y

		this.acc1 = random(-10, 10); //accX
		this.acc2 = random(-10, 10); //accY

		this.c = color(255, random(184), random(77)); //color
		this.s = random(10, 100); //size
		this.n = 0; //number of collisions
	}

	move() {
		if (this.x > width) {
			this.acc1 = random(10)*-1;
			this.n += 1;
		}
		else if (this.x < 0) {
			this.acc1 = 10;		
			this.n += 1;
		}
		if (this.y > height) {
			this.acc2 = random(10)*-1;
			this.n += 1;
		}
		else if (this.y < 0) {
			this.acc2 = random(10);		
			this.n += 1;
		}
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
