var vertexData; // may want to remove this as a global
let lastKey; // remove from global?
let colour;
let smooth = 0;


let shapesOfOdour = [];
let shapeLayer;

let widthCount;
let heightCount;

// Colour info
var colourRef = firebase.database().ref('colourLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
colourRef.on('child_changed', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  background(data);
});

// shape vertex info
var vertexRef = firebase.database().ref('drawingLog'); // note, data is seperate RGBA values if ref = colourLog/RGBACol
// guestRef.on('value', (snapshot) => { // gets all data, including old
// guestRef.on('child_added', (snapshot, prevChildKey) => { // gets changed (added)
vertexRef.on('child_changed', (snapshot) => {
  vertexData = snapshot.val();
  console.log(vertexData);
  // overlayShapes();
  gridShapes();

});


function gridShapes() {
  // start fresh
  background(0);
  shapeLayer.clear();
  widthCount = 0;
  heightCount = 0;

  // retrieve the qty of keys in the data
  let len = Object.keys(vertexData).length;


  // break down into 2x3 grid
  let a = len/(2/3);
  let b = len/a;
  let pixelsW = width/a;
  let pixelsH = height/a;

  for (let i = 0; i < len; i++) {
    // get the key itself
    let key = Object.keys(vertexData)[i];
    // get the colour
    colour = vertexData[key].colour;
    // now, fill with that colour
    shapeLayer.fill(colour.levels[0], colour.levels[1], colour.levels[2]);
    //point to where the vertices are stored
    let vertexObject = vertexData[key].drawingVertices;

    // create a shape
    shapeLayer.clear();
    shapeLayer.beginShape();
    let xy = vertexObject[i];
    if (smooth) {
      shapeLayer.curveVertex(vertexObject[0][0], vertexObject[0][1]);
    }
    for (j = 0; j < vertexObject.length; j++) {
      if (smooth) {
        shapeLayer.curveVertex(vertexObject[j][0], vertexObject[j][1]);
      } else {
        shapeLayer.vertex(vertexObject[j][0], vertexObject[j][1]);
      }
    }
    if (smooth) {
      shapeLayer.curveVertex(vertexObject[0][0], vertexObject[0][1]);
      shapeLayer.curveVertex(vertexObject[1][0], vertexObject[1][1]);
    }
    shapeLayer.endShape();


    // now keep track of the placement calculated using the above ratio math:

    let qtyX = i%a;
    let qtyY = Math.floor(i/a);

    image(shapeLayer, qtyX*pixelsW, qtyY*pixelsH, pixelsW, pixelsH);



  }
}



//
// function overlayShapes() {
//   // start fresh
//   background(0);
//   shapeLayer.clear();
//   // retrieve the qty of keys in the data
//   let len = Object.keys(vertexData).length;
//
//   // find space squared
//   let s2 = width*height;
//   // divide that space
//   let dividedSp = s2/len;
//   // get the square root of that
//   let maxW = Math.sqrt(dividedSp);
//   let scalar = width/maxW;
//   console.log(maxW);
//
//   for (let i = 0; i < len; i++) {
//     // get the key itself
//     let key = Object.keys(vertexData)[i];
//     // get the colour
//     colour = vertexData[key].colour;
//     // now, fill with that colour
//     shapeLayer.fill(colour.levels[0], colour.levels[1], colour.levels[2], 255 / len);
//     //point to where the vertices are stored
//     let vertexObject = vertexData[key].drawingVertices;
//
//     // create a shape
//     shapeLayer.beginShape();
//     let xy = vertexObject[i];
//     if (smooth) {
//       shapeLayer.curveVertex(vertexObject[0][0], vertexObject[0][1]);
//     }
//     for (j = 0; j < vertexObject.length; j++) {
//       if (smooth) {
//         shapeLayer.curveVertex(vertexObject[j][0], vertexObject[j][1]);
//       } else {
//         shapeLayer.vertex(vertexObject[j][0], vertexObject[j][1]);
//       }
//     }
//     if (smooth) {
//       shapeLayer.curveVertex(vertexObject[0][0], vertexObject[0][1]);
//       shapeLayer.curveVertex(vertexObject[1][0], vertexObject[1][1]);
//     }
//     shapeLayer.endShape();
//     image(shapeLayer, 0, 0, width, height);
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  shapeLayer = createGraphics(1000, 1000); // // TODO: Get rid of the shapeLayer, it is slooow.. just do normal shapes.
  shapeLayer.noStroke();
}
