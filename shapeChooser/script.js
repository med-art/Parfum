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

let storedDistance = 1000;

function setup(){


   canvas = createCanvas(windowWidth, windowHeight-55);
    canvas.parent('sketch-holder');
    background(0);
    noStroke();
    retrieveCol();
    fill(c); // todo inherit
    let margin = 200;
    calcDimensions();


    //declare window
    w = vMin*33.33;

    // make 4 vectors
    sV[0] = createVector(width*0.25, height*0.25, 20);
    sV[1] = createVector(width*0.75, height*0.25, 4);
    sV[2] = createVector(width*0.25, height*0.75, 3);
    sV[3] = createVector(width*0.75, height*0.75, 6);

    //draw an circle top left
    ellipse(sV[0].x, sV[0].y, w, w);
    //draw a rectangle top right
    rectMode(RADIUS);
    rect(sV[1].x, sV[1].y, w/2, w/2);

    //draw a triangle bottom left
    let curveQty = 3;
    beginShape()
    for (let i = 0; i < curveQty; i++) {
    let angle = (((2 * PI) / curveQty) * i)+(1.5*PI);
    let v = createVector((sV[2].x) + (w/2) * cos(angle), (sV[2].y) + (w/2) * sin(angle));
    vertex(v.x, v.y)
    }
    endShape();

    //draw a hexagon, bottom left
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
  c = color(parseInt(chosenColour[0]), parseInt(chosenColour[1]), parseInt(chosenColour[2]));
}

function touchStarted(){
  check();
}

function touchMoved(){
  check();
}

function check(){

  console.log("checking");
  for (let i = 0; i < sV.length; i++){
    if (dist(mouseX, mouseY, sV[i].x, sV[i].y) < w){
      console.log("thats a hit");
        localStorage.chosenVertice = sV[i].z;
        window.location.href = "../Blob-slider/index.html";
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
