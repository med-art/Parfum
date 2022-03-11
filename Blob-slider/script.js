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

let shapeLayer, tintLayer;
let texture;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight-70);
      canvas.parent('sketch-holder');


      var lang = localStorage.lang;
      console.log(lang);
      if (lang == "fr"){
      document.getElementById("header").innerHTML="Si vous le souhaitez, adaptez la forme qui correspond le plus à la couleur. Pour cela, vous pouvez toucher les points et utiliser le curseur sur la gauche pour ajouter ou enlever des détails.";
      } else {
      document.getElementById("header").innerHTML="If you want to adapt the shape to correspond more to the odour move the white points around. <br> Use the slider on the left to add or remove points";
      }


  texture = loadImage('assets/texture.jpg');
  shapeLayer = createGraphics(width, height);
  tintLayer = createGraphics(width, height);
  tintLayer.tint(255, 255, 255,10);
  shapeLayer.noStroke();
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

  if (sliderQty != shape.length) {
    interpolate(); // run again if it does not match
  }
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
      if (undoActive){
      removeButton();
    }
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
  //shapeLayer.background(0);
  shapeLayer.clear();
  tintLayer.clear();
  shapeLayer.fill(c); //todo - move
    //combine via separate layers?
  shapeLayer.beginShape();
  if (smooth) {
    shapeLayer.curveVertex(shape[0].x, shape[0].y);
    // shapeLayer.curveVertex(shape[1].x, shape[1].y);
  }
  for (i = 0; i < shape.length; i++) {
    if (smooth) {
        shapeLayer.curveVertex(shape[i].x, shape[i].y);
    } else {
        shapeLayer.vertex(shape[i].x, shape[i].y);
    }
  }
  if (smooth) {
    // shapeLayer.curveVertex(shape[shape.length - 2].x, shape[shape.length - 2].y);
    // shapeLayer.curveVertex(shape[shape.length - 1].x, shape[shape.length - 1].y);
    shapeLayer.curveVertex(shape[0].x, shape[0].y);
      shapeLayer.curveVertex(shape[1].x, shape[1].y);
  // shapeLayer.curveVertex(shape[2].x, shape[2].y);
  }
    shapeLayer.endShape();

    background(0);
    // image(texture, 0, 0, width, height);
    tintLayer.image(shapeLayer, 0, 0, width, height);
    image(tintLayer, -20, 20, width*1.04, height*1.04);
    image(tintLayer, -15, 15, width*1.03, height*1.03);
    image(tintLayer, -10, 10, width*1.02, height*1.02);
    image(tintLayer, -5, 5, width*1.01, height*1.01);
    noTint();
    image(shapeLayer, 0, 0, width, height);



  fill(255);
  for (i = 0; i < shape.length; i++) {
    ellipse(shape[i].x, shape[i].y, 6, 6);
    // DEBUGGING TOOL:
    // text(i, shape[i].x, shape[i].y, 100, 100);
  }
  image(sliderImg, 0, 0, width, height);
}

function goBack(){
window.location.href = "../shapeChooser/index.html";
}

function next(){

// make the array simpler for storage in firebasedatabase

let vertices = [];

for (let i = 0; i < shape.length; i++){
  vertices[i] = [];
  vertices[i][0] = shape[i].x;
  vertices[i][1] = shape[i].y;
}

let userId = localStorage.getItem("id");
let sessionId = localStorage.getItem("sessionId");
logDrawing(sessionId, userId, vertices, width, height);
window.location.href = "../endGame/index.html";
}
