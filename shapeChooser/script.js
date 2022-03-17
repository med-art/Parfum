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

let sV = [];

let w;

let c;

let vertexQty;

let shapeOpacity = [255, 255, 255, 255];

let storedDistance = 1000;

function setup(){


   canvas = createCanvas(windowWidth, windowHeight-150);
    canvas.parent('sketch-holder');

    var lang = localStorage.lang;
    console.log(lang);
    if (lang == "fr"){
    document.getElementById("header").innerHTML="Choisissez une forme qui correspond à l'odeur que vous sentez.";
    } else {
    document.getElementById("header").innerHTML="Please choose a shape that you think corresponds to the odour";
    }

    noStroke();
    retrieveCol();

    let margin = 200;
    calcDimensions();


    //declare window
    w = vMin*40;

    // make 4 vectors
    sV[0] = createVector(width*0.1, height*0.5, 20);
    sV[1] = createVector(width*0.366, height*0.5, 4);
    sV[2] = createVector(width*0.633, height*0.5, 3);
    sV[3] = createVector(width*0.9, height*0.5, 6);

    makeShapes();
}

function makeShapes(){
    background(0);
      c.setAlpha(shapeOpacity[0]);
      fill(c);
      //draw an circle top left
      ellipse(sV[0].x, sV[0].y, w, w);

      //draw a rectangle top right
      c.setAlpha(shapeOpacity[1]);
      fill(c);
      // fill(c); // todo inherit
      rectMode(RADIUS);
      rect(sV[1].x, sV[1].y, w/2, w/2);

      //draw a triangle bottom left
      c.setAlpha(shapeOpacity[2]);
            fill(c);
      let curveQty = 3;
      beginShape()
      for (let i = 0; i < curveQty; i++) {
      let angle = (((2 * PI) / curveQty) * i)+(1.5*PI);
      let v = createVector((sV[2].x) + (w/2) * cos(angle), (sV[2].y) + (w/2) * sin(angle));
      vertex(v.x, v.y)
      }
      endShape();

      //draw a hexagon, bottom left
      c.setAlpha(shapeOpacity[3]);
            fill(c);
      curveQty = 6;
      beginShape()
      for (let i = 0; i < curveQty; i++) {
        let angle = (((2 * PI) / curveQty) * i)+(1.5*PI);
      let v = createVector((sV[3].x) + (w/2) * cos(angle), (sV[3].y) + (w/2) * sin(angle));
        vertex(v.x, v.y)
      }
      endShape();

}

function retrieveCol(){
  let importColour = localStorage.chosenColour;
  let chosenColour = importColour.split(",");
  var cccc = chosenColour.map(String);
  c = color(parseInt(chosenColour[0]), parseInt(chosenColour[1]), parseInt(chosenColour[2]), 255);
}

function touchStarted(){
  check();
}

function touchMoved(){
  check();
}

function check(){
  for (let i = 0; i < sV.length; i++){
    if (dist(mouseX, mouseY, sV[i].x, sV[i].y) < w){
      vertexQty = sV[i].z;
        localStorage.chosenVertice = vertexQty;
        shapeOpacity = [100, 100, 100, 100];
        shapeOpacity[i] = 255;
        makeShapes();

  document.getElementById('next').classList.remove('hidden');
    }
  }
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

function goBack(){
console.log("Going Backwards");
window.location.href = "../ColourSelector/index.html";
}

function next(){
console.log("Going Forwards");
let userId = localStorage.getItem("id");
let sessionId = localStorage.getItem("sessionId");
logShape(sessionId, userId, vertexQty);
// window.location.href = "../Blob-slider/index.html"; // moved to firebaseConfig, to avoid async issues
}
