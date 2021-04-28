var x = 100;
var y = 100;
var acc1 = 10;
var acc2 = 10;
var c;
let monoSynth;
let midiNotes = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];
let noteIndex = 0;
let midiVal, freq;

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
		startSound();
	}
	else if (x < 0) {
		acc1 = 10;		
		startSound();
	}

	if (y > windowHeight) {
		acc2 = -10;
		startSound();
	}
	else if (y < 0) {
		acc2 = 10;		
		startSound();
	}

	x = x + acc1;
	y = y + acc2;
}

function startSound() {
	osc.start();  
	noteIndex = random(0, 11);
	midiVal = midiNotes[noteIndex % midiNotes.length];
	freq = midiToFreq(midiVal);
	osc.freq(freq);
	env.ramp(osc, 0, 1.0, 0);
}
