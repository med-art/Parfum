let shape = [];
let curveQty = 10;
// let slider;
let sliderQty = 0;
let chosen;
let sculptActive;
let smooth;
let sliderImg;
let hMax, vMax, vMin, vW;
let sliderIcon;

let storedDistance = 1000;

function setup(){
  createCanvas(windowWidth, windowHeight);

  background(0);
  noStroke();
  fill(215, 140, 255);
  let margin = 200;

  ellipse(margin, margin, margin, margin);
  rect(width-(margin/2), margin, width-margin, margin*2);



//  setupDrawing();
}

function setupDrawing() {

  sliderImg = createGraphics(windowWidth, windowHeight);
  sliderIcon = loadImage('assets/slider.png');
  noStroke();
  // stroke(255);
  fill(80, 0, 255);

  for (let i = 0; i < curveQty; i++) {
    let angle = ((2 * PI) / curveQty) * i;
    let v = createVector((width / 2) + (width / 5) * cos(angle), (height / 2) + (width / 5) * sin(angle));
    shape.push(v)
  }

  // slider = createSlider(3, 30, curveQty);
  // slider.position(10, 10);
  // slider.style('width', '260px');
  calcDimensions();
  makeSlider(height/2);

  render();
}

function calcDimensions() {
  vW = width / 100;
  hMax = height / 100;

  if (width > height) {
    vMax = width / 100;
    vMin = height / 100;
  } else {
    vMax = height / 100;
    vMin = width / 100;
  }
}

function makeSlider(mY) {

  // make an explicit constraint

  mY = constrain(mY, 8 * hMax, height - (8 * hMax));
  sliderQty = int(map(mY, 8 * hMax, height - (8 * hMax), 3, 20)); // tether with below constraint?

  sliderImg.clear();
  sliderImg.stroke(125);
  sliderImg.strokeWeight(7 * hMax);
  sliderImg.line(8 * hMax, 8 * hMax, 8 * hMax, height - (8 * hMax));
  sliderImg.stroke(255);
  sliderImg.strokeWeight(7 * hMax);
  sliderImg.line(8 * hMax, 8 * hMax, 8 * hMax, mY);
  sliderImg.imageMode(CENTER);
  sliderImg.image(sliderIcon, 8 * hMax, mY, 8.5 * hMax, 8.5 * hMax);
  sliderImg.fill(244);
  sliderImg.noStroke();
  sliderImg.text(sliderQty, 12*hMax, mY, 100, 100);
}


function interpolate() {

  // IF CURVE NEEDS TO INCREASE
  if (sliderQty > shape.length) {
    let maxDist = 1; // 1 is abitrary
    let chosenPoint; // set to nothign to avoid false call
    for (let i = 0; i < shape.length; i++) { // note the -1
      let dist = shape[i].dist(shape[(i + 1) % (shape.length)]);
      if (dist > maxDist) {
        maxDist = dist;
        chosenPoint = i;
      }
    }



    let lerpedPoint = p5.Vector.lerp(shape[chosenPoint], shape[(chosenPoint + 1) % (shape.length)], 0.5);
    console.log(lerpedPoint);
    shape.splice(chosenPoint + 1, 0, lerpedPoint);




    // IF CURVE NEEDS TO DECREASE
    // Run again, but between point 0 and 2, find longest distance, then delete point 1 between them..

  } else if (sliderQty < shape.length) {


    let minDist = 10000; // 10000 is abitrary
    let chosenPoint; // set to nothign to avoid false call
    for (let i = 0; i < shape.length - 2; i++) { // note the -1
      let dist = shape[i].dist(shape[i + 2]);
      if (dist < minDist) {
        minDist = dist;
        chosenPoint = i;
      }
    }
    shape.splice(chosenPoint + 1, 1);

  }
  render();
}

function touchStarted() {
  if (mouseX > (20 * hMax)) { // or, if the slider not touched
    storedDistance = 10000;

    for (let i = 0; i < shape.length; i++) {
      let d = dist(mouseX, mouseY, shape[i].x, shape[i].y);
      if (d < storedDistance) {
        storedDistance = d;
        chosen = i;
      }
    }


    if (storedDistance < 60) {
      sculptActive = 1;
    } else if (storedDistance > 100) {
      smooth = !smooth;
    }

    render();
  }
}

function mouseDragged() {

  if (mouseX > (20 * hMax)) {

    // sliderQty = slider.value();
    // IF THE POINTS DON'T MATCH



    if (sculptActive) {
      shape[chosen].x = mouseX;
      shape[chosen].y = mouseY;
    }

  } else {
    makeSlider(mouseY);


  }
  if (!(sliderQty == shape.length)) {
    interpolate();
  }
  render();

}

function touchEnded() {
  sculptActive = 0;
}


function render() {
  background(0);
  fill(215, 140, 255);

  //combine via separate layers?
  beginShape();
  if (smooth) {
    curveVertex(shape[shape.length - 2].x, shape[shape.length - 2].y);
    curveVertex(shape[shape.length - 1].x, shape[shape.length - 1].y);
  }
  for (i = 0; i < shape.length; i++) {
    if (smooth) {
      curveVertex(shape[i].x, shape[i].y);
    } else {
      vertex(shape[i].x, shape[i].y);
    }
  }
  if (smooth) {
    curveVertex(shape[0].x, shape[0].y);
    curveVertex(shape[1].x, shape[1].y);
  }
  endShape(CLOSE);
  fill(255);
  for (i = 0; i < shape.length; i++) {
    ellipse(shape[i].x, shape[i].y, 6, 6);
    // DEBUGGING TOOL:
    // text(i, shape[i].x, shape[i].y, 100, 100);
  }
  image(sliderImg, 0, 0, width, height);
}