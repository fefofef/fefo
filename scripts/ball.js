var x = 100;
var y = 100;
var acc1 = 10;
var acc2 = 10;
var c;
let scale1 = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];
let scale2 = [61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83];
let noteIndex = 0;
let midiVal, freq, note, scaleChoice;

function windowResized() {
	resizeCanvas()	
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	frameRate(24);
	
	c = color(255, 184, 77);
	x = random(0, windowWidth);
	y = random(0, windowHeight);
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
	ellipse(x, y, random(0, 100), random(0, 100));
	stroke(c);
	strokeWeight(1);
	fill(32);
	
	if (x > windowWidth) {
		acc1 = -10;
		note = int(random(0, 11));
		startSound(note, scaleChoice);
	}
	else if (x < 0) {
		acc1 = 10;		
		note = int(random(0, 11));
		startSound(note, scaleChoice);
	}

	if (y > windowHeight) {
		acc2 = -10;
		note = int(random(0, 11));
		startSound(note, scaleChoice);
	}
	else if (y < 0) {
		acc2 = 10;		
		note = int(random(0, 11));
		startSound(note, scaleChoice);
	}

	x = x + acc1;
	y = y + acc2;
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
