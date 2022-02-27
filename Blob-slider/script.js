let shape = [];
let archivedShape = [];
let curveQty = 10;
// let slider;
let sliderQty = 0;
let archivedSlider = 0;
let chosen;
let sculptActive;
let smooth;
let sliderImg;
let hMax, vMax, vMin, vW;
let sliderIcon;
let undoButton;
let undoActive = 0;

let sV = [];
let c;
let vt;

let storedDistance = 1000;

function setup(){
  createCanvas(windowWidth, windowHeight);

  background(0);
  noStroke();
  fill(215, 140, 255); // todo inherit
  let margin = 200;
  calcDimensions();

retrieveCol();
 setupDrawing();
}

function setupDrawing() {

  sliderImg = createGraphics(windowWidth, windowHeight);
  sliderIcon = loadImage('assets/slider.png');
  noStroke();
  // stroke(255);
retrieveCol();
  fill(c);


  for (let i = 0; i < vt; i++) {
    let angle = ((2 * PI) / vt) * i;
    let v = createVector((width / 2) + (width / 5) * cos(angle), (height / 2) + (width / 5) * sin(angle));
    shape.push(v)
  }

  // slider = createSlider(3, 30, curveQty);
  // slider.position(10, 10);
  // slider.style('width', '260px');


  //change imported Vertex into slider position
  let s = int(map(vt, 3, 30,  8 * hMax, height - (8 * hMax))); // tether with below constraint?
  makeSlider(s);

  render();
}

function retrieveCol(){
  let importColour = localStorage.chosenColour;
  let chosenColour = importColour.split(",");
  var cccc = chosenColour.map(String);
  c = color(parseInt(chosenColour[0]), parseInt(chosenColour[1]), parseInt(chosenColour[2]));

  vt = localStorage.chosenVertice;


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
  sliderQty = 1+int(map(mY, 8 * hMax, height - (8 * hMax), 2, 30)); // tether with below constraint?
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
      // TODO: Run a check
      removeButton();
    }
  } else {


    // if the button is not there, then create it. note use of explicit undoActive.
    // tried checking buttonMaker after deleted, but Boolean still came back positive.
    if(!undoActive){
    buttonMaker();
  }
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

function buttonMaker(){
  // first make an archive of the current curve
  archivedShape = shape.slice();
  archivedSlider = sliderQty;
  console.log("archive Created")
  // TODO: move to separate function for clarity?
  undoActive = 1;
  undoButton = createButton('undo');
  undoButton.position(100,mouseY);
  undoButton.mousePressed(undo);
}

function undo(){
  removeButton();
  shape = archivedShape.slice();

  // // TODO: Search for identical syntax (replaced archivedSlider with vt) This is present above, needs to be refined
  let s = int(map(archivedSlider, 3, 30,  8 * hMax, height - (8 * hMax))); // tether with below constraint?
  makeSlider(s);

  console.log("archive retrieved")
  render();
}

function removeButton(){
undoActive  = 0;
undoButton.remove();
}

function render() {
  background(0);
  fill(c);
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
