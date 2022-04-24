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

let len;

let alphaCounter = 0;

let colData;

let gridActive = 0;

let noiseOffset = 0;
let noiseWidth = 100;

// Colour info
var colourRef = firebase.database().ref('colourLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
colourRef.on('child_changed', (snapshot) => {
colData = snapshot.val();
gridActive = 0;
alphaCounter = 0;
makeBackground();
});

// shape vertex info
var vertexRef = firebase.database().ref('drawingLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
vertexRef.on('child_changed', (snapshot) => {
  vertexData = snapshot.val();
  // console.log(vertexData);
  // overlayShapes();

  boot();
});

function makeBackground(){

if (!gridActive){
colData[3] = alphaCounter;
background(colData);
alphaCounter++;
if (alphaCounter < 255){
  setTimeout(makeBackground, 40);
} else {
  alphaCounter = 0;
}
}

}

function boot() {

gridActive = 1;
globalScalar = 1;

  // stroke(125);
  // strokeWeight(1);
  //start with dice roll, to ensure even recall over the loops
  len = Object.keys(vertexData).length;
  for (let i = 0; i < 100; i++) {
    randomised[i] = Math.floor(random(0, len));
  }
  gridShapes();
}


function gridShapes() {



  // start fresh
  background(0);


  // retrieve the qty of keys in the data
  widthCount = 7;
  heightCount = 5;

  margin = width / 20;

  let qty = widthCount * heightCount;
  let middle = Math.floor(qty / 2);

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
      selection = len-1;
    } else {
      // otherwise, randomly select one
      selection = randomised[i];
    }

    // get the key itself
    let key = Object.keys(vertexData)[selection];
    // get the colour
    colour = vertexData[key].colour;
    //get the relative smoothing
    smooth = vertexData[key].smoothVal;
    console.log("VertexData " + vertexData[key]);
    console.log("SmoothVal " + smooth);
    // now, fill with that colour
    fill(colour.levels[0], colour.levels[1], colour.levels[2]);
    //point to where the vertices are stored
    let vertexObject = vertexData[key].drawingVertices;



    let qtyX = i % widthCount;
    let qtyY = Math.floor(i / widthCount);


    // console.log(globalScalar);

    let offsetW = (wMargin)/2;
    let offsetH = (hMargin)/2;

    push();
    translate((-width/2+offsetW)*(globalScalar*10), (-height/2+offsetH)*(globalScalar*10));
    scale(1+(globalScalar*10));
    // translate(width/2, height/2);
    translate((qtyX * pixelsW)+wMargin/2, (qtyY * pixelsH)+hMargin/2);
    // translate(pixelsW/4, 0);

    //calc noise then move
    noiseOffset += 0.00005;
    let xoff = (noise(noiseOffset + (i*120202))-0.5) * noiseWidth;
    let yoff = (noise(noiseOffset + (i*13220202))-0.5) * noiseWidth;
    translate(xoff*(1-globalScalar), yoff*(1-globalScalar));

    beginShape();

    let localScalar = 0.1;

    if (smooth) {
      curveVertex(vertexObject[0][0]*localScalar, vertexObject[0][1]*localScalar);
    }
    for (j = 0; j < vertexObject.length; j++) {
      if (smooth) {
        curveVertex(vertexObject[j][0]*localScalar, vertexObject[j][1]*localScalar);
      } else {
        vertex(vertexObject[j][0]*localScalar, vertexObject[j][1]*localScalar);
      }
    }
    if (smooth) {
      curveVertex(vertexObject[0][0]*localScalar, vertexObject[0][1]*localScalar);
      curveVertex(vertexObject[1][0]*localScalar, vertexObject[1][1]*localScalar);
    }
    endShape();

    pop();

  }
  globalScalar -= globalScalar*(0.005); // multiplying by itself to slow the transition down (as the number effectively gets smaller)
  if (globalScalar > 0 && gridActive) {
    setTimeout(gridShapes, 30);
  }



}

function setup(){
  createCanvas(windowWidth, windowHeight);

}
