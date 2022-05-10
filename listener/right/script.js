//Next
// change the translate to relative
//add margins between shapes to ensure nice gappage
// make the zooming much nicerer.


var vertexData; // may want to remove this as a global
let lastKey; // remove from global?
let colour;
let smooth = 0;

let margin = 0;

let shapesOfOdour = [];

let widthCount;
let heightCount;


//calculate globalScalar
let globalScalar = 1.0;

let randomised = [];
let randomisedScale = [];

let len;

let alphaCounter = 0;

let colData;

let gridActive = 0;

let noiseOffset = 0;
let noiseWidth = 50;

let _side = "right";

let timeoutCounter = 0;

// Colour info
var colourRef = firebase.database().ref('colourLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
colourRef.on('child_changed', (snapshot) => {
  let tempColData = snapshot.val();
  alphaCounter = 0;
  if (tempColData[4] == "right") {
    colData = tempColData;
    timeoutCounter = 0;
    gridActive = 0;
    makeBackgroundRight();
  }
});

// shape vertex info
var vertexRef = firebase.database().ref('drawingLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
vertexRef.on('child_changed', (snapshot) => {
  vertexData = snapshot.val();
  // console.log(vertexData);
  // overlayShapes();

  len = Object.keys(vertexData).length;
  let key = Object.keys(vertexData)[len - 1];
  _side = vertexData[key].tabletSide;

  if (_side == "right") {
    bootRight();
  }
});

function makeBackgroundRight() {
  if (!gridActive) {
    alphaCounter++;
    if (alphaCounter < 255) {
      let ccF = color(colData[0], colData[1], colData[2]);
      let ccT = color(0, 0, 0);
      let l = lerpColor(ccT, ccF, alphaCounter/100);
            background(l);
    } else if (alphaCounter > 500) {
      let ccF = color(colData[0], colData[1], colData[2]);
      let ccT = color(0, 0, 0);
      let l = lerpColor(ccF, ccT, (alphaCounter-500)/100);
      background(l);
    }
    if (alphaCounter < 800){
      setTimeout(makeBackgroundRight, 40);
    }
  }
}

function bootRight() {
  gridActive = 1;
  globalScalar = 1;
  // stroke(125);
  // strokeWeight(1);
  //start with dice roll, to ensure even recall over the loops
  len = Object.keys(vertexData).length;
  for (let i = 0; i < 100; i++) {
    randomised[i] = Math.floor(random(0, len));
    randomisedScale[i] = random(0.4, 1);
  }
  timeoutCounter = 0;
  gridShapesRight();
}


function gridShapesRight() {
if (gridActive){
  background(0);


  // retrieve the qty of keys in the data
  widthCount = 7;
  heightCount = 13;

  margin = width / 20;

  let qty = widthCount * heightCount;

  let middle = Math.floor(qty / 2); // this is wrong you dumbass
  console.log(middle);

  // break down into 2x3 grid
  let pixelsW = width / widthCount;
  let pixelsH = height / heightCount;


  // determine which value is smaller, to be used to set margins for square
  let wMargin = 0;
  let hMargin = 0;
  let smaller;
  if (pixelsW >= pixelsH) {
    wMargin = pixelsW - pixelsH;
  } else {
    hMargin = pixelsH - pixelsW;
  }



  for (let i = 0; i < qty; i++) {

    let selection = 0;

    // console.log("middle = "+middle)

    // if it is the middle unit, then fill it with the latest
    if (i == middle) {
      selection = len - 1;
      randomisedScale[i] = 1;
    } else {
      // otherwise, randomly select one
      selection = randomised[i];
    }

    // get the key itself
    let key = Object.keys(vertexData)[selection];
    // get the colour
    colour = vertexData[key].colour;
    drawingContext.shadowColor = 'rgba(' + colour.levels[0] + "," + colour.levels[1] + "," + colour.levels[2] + ", 0.18)";
    //get the relative smoothing
    smooth = vertexData[key].smoothVal;
    // now, fill with that colour
    fill(colour.levels[0], colour.levels[1], colour.levels[2]);
    //point to where the vertices are stored
    let vertexObject = vertexData[key].drawingVertices;



    let qtyX = i % widthCount;
    let qtyY = Math.floor(i / widthCount);


    // console.log(globalScalar);

    let offsetW = (wMargin);
    let offsetH = (hMargin);



    push();


    translate((-width / 2 + offsetW) * (globalScalar * 10), (-height / 2 + offsetH) * (globalScalar * 10));
    scale(1 + (globalScalar * 10));

    translate((qtyX * pixelsW) + wMargin / 2, (qtyY * pixelsH) + hMargin / 2);

    //calc noise then move
    noiseOffset += 0.00005;
    let xoff = (noise(noiseOffset + (i * 120202)) - 0.5) * noiseWidth;
    let yoff = (noise(noiseOffset + (i * 13220202)) - 0.5) * noiseWidth;
    translate(xoff * (1 - globalScalar), yoff * (1 - globalScalar));

    beginShape();

    let localScalar = 0.04 * randomisedScale[i];

    if (smooth) {
      curveVertex(vertexObject[0][0] * localScalar, vertexObject[0][1] * localScalar);
    }
    for (j = 0; j < vertexObject.length; j++) {
      if (smooth) {
        curveVertex(vertexObject[j][0] * localScalar, vertexObject[j][1] * localScalar);
      } else {
        vertex(vertexObject[j][0] * localScalar, vertexObject[j][1] * localScalar);
      }
    }
    if (smooth) {
      curveVertex(vertexObject[0][0] * localScalar, vertexObject[0][1] * localScalar);
      curveVertex(vertexObject[1][0] * localScalar, vertexObject[1][1] * localScalar);
    }
    endShape();

    pop();

  }


  // TIMEOUT COUNTER - needs to include gridActive
  timeoutCounter++;
  if (timeoutCounter > 2000) {
    gridActive = 0;
    background(0);
    timeoutCounter = 0;
  }

  //
  globalScalar -= globalScalar * (0.005); // multiplying by itself to slow the transition down (as the number effectively gets smaller)
  if (globalScalar > 0 && gridActive) {
    setTimeout(gridShapesRight, 30);
  }
}


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 20;
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = 'white';
  noStroke();

}
