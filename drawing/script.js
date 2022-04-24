let shape = [];
let archivedShape = [];
let curveQty = 10;
// let slider;
let desiredQty = 0;
let chosen;
let sculptActive;
let smooth;
let hMax, vMax, vMin, vW;
let sliderIcon;
let undoButton;
let undoActive = 0;

let sV = [];
let c;
let vt;
let cV;

let storedDistance = 1000;

let shapeLayer, tintLayer;


let centerX, centerY;

let started = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');

  var lang = localStorage.lang;
  console.log(lang);
  if (lang == "fr") {
    document.getElementById("header").innerHTML = "Modifier la forme";
    document.getElementById("subtitle").innerHTML = "Déplacer les points blancs pour modifier la forme <br> Utiliser le + ou - pour ajouter ou enlever des points <br> Toucher l'écran en dehors de la forme pour basculer entre lisse et pointu";
  } else {

    document.getElementById("header").innerHTML = "Refine your shape";
    document.getElementById("subtitle").innerHTML = "Move the white dots to change the shape <br> Use the + or - to add or remove points <br> Touch outside the shape to switch between smooth and sharp";
  }

  shapeLayer = createGraphics(width, height);
  shapeLayer.strokeWeight(1);

  tintLayer = createGraphics(width, height);
  tintLayer.noStroke();

  noStroke();
  let margin = 200;
  calcDimensions();
  retrieveDataFromLocal();
  setupDrawing();
}


function setupDrawing() {

  noStroke();
  // stroke(255);
  retrieveDataFromLocal();
  fill(c);
  let opaque = color(c.levels);
  opaque.setAlpha(6);
  tintLayer.fill(opaque);

// create the shape based on the VT
  for (let i = 0; i < vt; i++) {
    let angle = ((2 * PI) / vt) * i;
    let v = createVector((width / 2) + (width / 5) * cos(angle), (height / 2) + (width / 5) * sin(angle));
    shape.push(v)
  }

  render();
}

function retrieveDataFromLocal() {
  let importColour = localStorage.chosenColour;
  let chosenColour = importColour.split(",");
  var cccc = chosenColour.map(String);
  c = color(parseInt(chosenColour[0]), parseInt(chosenColour[1]), parseInt(chosenColour[2]), 255);
  vt = localStorage.chosenVertice;
  desiredQty = vt;
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



function interpolate() {

  if (!undoActive) {
    buttonMaker();
  }

  // IF CURVE NEEDS TO INCREASE
  if (desiredQty > shape.length) {
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

  } else if (desiredQty < shape.length) {


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

  if (desiredQty != shape.length) {
    interpolate(); // run again if it does not match
  }
}

function touchStarted() {
  if (started == 0) {
    document.getElementById("header").classList.add('fadeOut');
  document.getElementById("subtitle").classList.add('fadeOut');
    document.getElementById("infoBox").classList.add('fadeOut');
    started = 1;
  }
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
    }
    render();
  }
}

function mouseDragged() {
  if (mouseX > (20 * hMax)) {
    // desiredQty = slider.value();
    // IF THE POINTS DON'T MATCH
    if (sculptActive) {
      shape[chosen].x = mouseX;
      shape[chosen].y = mouseY;
      // TODO: Run a check
      if (undoActive) {
        removeButton();
      }
    }
  } else {


    // if the button is not there, then create it. note use of explicit undoActive.
    // tried checking buttonMaker after deleted, but Boolean still came back positive.
    if (!undoActive) {
      // buttonMaker();
    }
    // makeSlider(mouseY);
  }

  if (!(desiredQty == shape.length)) {
   interpolate();
  }
  render();

return false;
}

function moreVertices(){
desiredQty++;
if (desiredQty >= 20){
    document.getElementById('add').classList.add('disabled');
}
if (desiredQty > 3){
    document.getElementById('minus').classList.remove('disabled');
}
// TODO: force the minus button back
interpolate();


}

function lessVertices(){
desiredQty--;
if (desiredQty <= 3){
  document.getElementById('minus').classList.add('disabled');
  desiredQty = 3;
  // TODO: remove the minus button
}
if (desiredQty < 20){
    document.getElementById('add').classList.remove('disabled');
}
// // TODO: force the add button back
interpolate();
}

function touchEnded() {
  sculptActive = 0;

  if (storedDistance > 100) {
    smooth = !smooth;
    render();

  }
}

function buttonMaker() {
  // first make an archive of the current curve
  undoActive = 1;
  archivedShape = shape.slice();
  document.getElementById("undo").classList.remove("disabled");

}

function undo() {
  removeButton();
  shape = archivedShape.slice();
  desiredQty = archivedShape.length;
  console.log("archive retrieved")
  render();
}

function removeButton() {
  undoActive = 0;
  document.getElementById("undo").classList.add("disabled");
}

function findCenter() {

  let accumX = 0;
  let accumY = 0;

  for (let i = 0; i < shape.length; i++) {
    accumX += shape[i].x;
    accumY += shape[i].y;
  }

  centerX = accumX / shape.length;
  centerY = accumY / shape.length;
  cV = createVector(centerX, centerY);




}

function render() {


  findCenter();

  shapeLayer.clear();
  tintLayer.clear();
  shapeLayer.stroke(200);
  shapeLayer.fill(c); //todo - move
  //combine via separate layers?

  // draw first layer
  shapeLayer.beginShape();
  if (smooth) {

    shapeLayer.curveVertex(shape[0].x, shape[0].y);
  }
  for (i = 0; i < shape.length; i++) {
    if (smooth) {
      shapeLayer.curveVertex(shape[i].x, shape[i].y);
    } else {
      shapeLayer.vertex(shape[i].x, shape[i].y);
    }
  }
  if (smooth) {
    shapeLayer.curveVertex(shape[0].x, shape[0].y);
    shapeLayer.curveVertex(shape[1].x, shape[1].y);
  } else {
    shapeLayer.vertex(shape[0].x, shape[0].y);
  }
  shapeLayer.endShape();

  //draw all other layers

  // draw first layer
  let _v;
  let _d = 0.04;
  for (let k = 1; k < 10; k++) {
    tintLayer.beginShape();
    if (smooth) {
      _v = p5.Vector.lerp(cV, shape[0], 1 + (k * _d));
      tintLayer.curveVertex(_v.x, _v.y);
    }
    for (i = 0; i < shape.length; i++) {
      if (smooth) {
        _v = p5.Vector.lerp(cV, shape[i], 1 + (k * _d));
        tintLayer.curveVertex(_v.x, _v.y);
      } else {
        _v = p5.Vector.lerp(cV, shape[i], 1 + (k * _d));
        tintLayer.vertex(_v.x, _v.y);
      }
    }
    if (smooth) {
      _v = p5.Vector.lerp(cV, shape[0], 1 + (k * _d));
      tintLayer.curveVertex(_v.x, _v.y);
      _v = p5.Vector.lerp(cV, shape[1], 1 + (k * _d));
      tintLayer.curveVertex(_v.x, _v.y);
    } else {
      _v = p5.Vector.lerp(cV, shape[0], 1 + (k * _d));
      tintLayer.vertex(_v.x, _v.y);
    }
    tintLayer.endShape();
  }




  background(20);
  image(tintLayer, 0, 0, width, height);
  image(shapeLayer, 0, 0, width, height);




  fill(255);
  for (i = 0; i < shape.length; i++) {

    ellipse(shape[i].x, shape[i].y, 12, 12);

    //DEBUGGING TOOL:
    // text(i, shape[i].x, shape[i].y, 100, 100);
  }




}

function goBack() {
  window.location.href = "../shapeChooser/index.html";
}

function next() {



  // make the array simpler for storage in firebasedatabase

  let vertices = [];

  // search through the shape to find the longest X and Y extents, as well as the shortest X and Y extentds
  let maxX = 0;
  let maxY = 0;
  let minX = 10000000;
  let minY = 10000000;
  for (let i = 0; i < shape.length; i++) {
    if (shape[i].x > maxX) {
      maxX = shape[i].x
    }
    if (shape[i].y > maxY) {
      maxY = shape[i].y
    }
    if (shape[i].x < minX) {
      minX = shape[i].x
    }
    if (shape[i].y < minY) {
      minY = shape[i].y
    }
  }

  // find the relative lengths
  let xLength = maxX - minX;
  let yLength = maxY - minY;

  // find the longest lenght, then use that to create a margin each side of the shortest length, in order to later (during save)
  // (cont) force the whole canvas to be square
  let marginX = 0;
  let marginY = 0;
  if (xLength >= yLength) {
    marginY = (xLength - yLength) / 2;
  } else {
    marginX = (yLength - xLength) / 2;
  }

  //rebuild lengths to include margins (x2)
  xLength += (marginX * 2);
  yLength += (marginY * 2);

  // now process the items to save, but making square using the following algorithm
  // take the original data, subtract the min value (x or y, to bring the origin back to 0), and then add a the margin (in X or Y)
  // TODO, do we want to homogenise these to a 1000x1000 grid??

  for (let i = 0; i < shape.length; i++) {

    let _x = Math.round(((shape[i].x - minX + marginX) / xLength) * 1000);
    let _y = Math.round(((shape[i].y - minY + marginY) / yLength) * 1000);

    // now store those in a clean array;
    vertices[i] = [];
    vertices[i][0] = _x;
    vertices[i][1] = _y;

  }

  let userId = localStorage.getItem("id");
  let sessionId = localStorage.getItem("sessionId");
  let odour = localStorage.getItem("selectedOdour")
  logDrawing(sessionId, userId, vertices, 1000, 1000, c, odour);

}
