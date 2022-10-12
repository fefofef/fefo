var x, y, c, acc1, acc2;

let balls = [];

let scale1 = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];
let scale2 = [61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83];
let noteIndex = 0;

let midiVal, freq, note, scaleChoice, ball;
let WIDTH = 100;
let HEIGHT = 100;


function windowResized() {
	resizeCanvas()	
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	frameRate(24);
	

	osc = new p5.TriOsc();
	env = new p5.Envelope();
	scaleChoice = random([scale1, scale2]);
	startSound(note, scaleChoice);
	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(32);

	for (let ball of balls) {
		ball.move();
		ball.show();
	}
	
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
		balls[i].show();
	}
}

function mousePressed () {
	let ball = new Ball(mouseX, mouseY);
	balls.push(ball);
};

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.acc1 = random(-10, 10);
		this.acc2 = random(-10, 10);
		this.c = color(255, random(184), random(77));
	}

	move() {
		if (this.x > windowWidth) {
			this.acc1 = random(10)*-1;
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		else if (this.x < 0) {
			this.acc1 = 10;		
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		if (this.y > windowHeight) {
			this.acc2 = random(10)*-1;
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		else if (this.y < 0) {
			this.acc2 = random(10);		
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		this.x = this.x + this.acc1;
		this.y = this.y + this.acc2;
	}
	
	
	show() {
		stroke(this.c);
		strokeWeight(2);
		fill(32);
		ellipse(this.x, this.y, WIDTH, HEIGHT);
	}
}

function startSound(note, scaleChoice) {
	osc.start(); 
	noteIndex = note;
	scale = scaleChoice; 

	midiVal = scale[noteIndex % scale.length];
	freq = midiToFreq(midiVal);
	osc.freq(freq);
	env.ramp(osc, 0, 0.5, 0);
}
