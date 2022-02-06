let metaballShader;
let smallestDistance = 1000;
let chosen;
let active = 0;

const N_balls = 60,
			metaballs = [];

function preload() {
	metaballShader = getShader(this._renderer);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	shader(metaballShader);

	for (let i = 0; i < N_balls; i ++) metaballs.push(new Metaball(i));

  mouseDragged();
}

function mouseDragged() {
  smallestDistance = 1000;
  active = 0;
	var data = [];

	for (const ball of metaballs) {
    ball.getClosest();
  }

  if (active){
    metaballs[chosen].update();
  }

  for (const ball of metaballs) {
    data.push(ball.pos.x, ball.pos.y, ball.radius);
  }


	metaballShader.setUniform("metaballs", data);


	rect(0, 0, width, height);
}

// OpenProcessing has a bug where it always creates a scrollbar on Chromium.
function mouseWheel() { // This stops the canvas from scrolling by a few pixels.
	return false;
}

class Metaball {
	constructor(i) {
		const size = Math.pow(Math.random(), 2);
    this.id = i;
    // Harvested from the original code
		//this.vel = p5.Vector.random2D().mult(5 * (1 - size) + 2);
		this.radius = 20 * size + 5;

		//this.pos = new p5.Vector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));
    this.pos = new p5.Vector(random((width/2)-200, (width/2)+200), random((height/2)-200, (height/2)+200));
	}

  getClosest(){
    let d = dist(this.pos.x, height-this.pos.y, mouseX, mouseY);

    if (d < smallestDistance){
      smallestDistance = d;
    chosen = this.id;
    }

    if (d < 60){
      active = 1;

    }
  }

	update() {
    // Harvested from the original code
		//this.pos.add(this.vel);


    this.pos.x = mouseX;
    this.pos.y = height-mouseY;





		// if (this.pos.x < this.radius || this.pos.x > width  - this.radius) this.vel.x *= -1;
		// if (this.pos.y < this.radius || this.pos.y > height - this.radius) this.vel.y *= -1;
	}

  renderDot(){
    fill(255);
    ellipse(this.x, this.y, 10, 10);
  }

}

function getShader(_renderer) {
	const vert = `
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;

		varying vec2 vTexCoord;

		void main() {
			vTexCoord = aTexCoord;

			vec4 positionVec4 = vec4(aPosition, 1.0);
			positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

			gl_Position = positionVec4;
		}
	`;

	const frag = `
		precision highp float;

		varying vec2 vTexCoord;

		uniform vec3 metaballs[${N_balls}];

		const float WIDTH = ${windowWidth}.0;
		const float HEIGHT = ${windowHeight}.0;

		void main() {
			float x = vTexCoord.x * WIDTH;
			float y = vTexCoord.y * HEIGHT;
			float v = 0.0;

			for (int i = 0; i < ${N_balls}; i++) {
				vec3 ball = metaballs[i];
				float dx = ball.x - x;
				float dy = ball.y - y;
				float r = ball.z;
				v += r * r / (dx * dx + dy * dy);
			}

			if (v > 1.0) gl_FragColor = vec4(255, 0, 255, 1.0);
			else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	`;

	return new p5.Shader(_renderer, vert, frag);
}
