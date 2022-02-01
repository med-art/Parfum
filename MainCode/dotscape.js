// drawingPauseds are used to track each set of dots
let drawingPaused = 0;
let username;
let appStarted = 0;
let chosenColour;
//track touches
let tracker = 0;

let type = 'linear';
let typeBool = 1; // 0 is linear, 1 is polar

// dot tracking
let dots = [],
  throughDotCount = 0,
  dotSize, dotQty, ringQty;

// mouse/geometry tracking
let isMousedown, tempwinMouseX, tempwinMouseY, tempwinMouseX2, tempwinMouseY2,
  verifyX = 0,
  verifyY = 0,
  vMax, circleRad,
  rad = 50.0; // animatedRadius
let brushSelected = 1;

//FIREBASE STUFF
var database;


let drawLayer, lineLayer, aa;



function setup() {
  // create canvas and all layers
  createCanvas(windowWidth, windowHeight);
  lineLayer = createGraphics(width, height);
  drawLayer = createGraphics(width, height);


  // initialise all colour informaiton
  pixelDensity(1); // Ignores retina displays
  colorMode(RGB, 255, 255, 255, 255);
  appCol = color(205, 12, 64, 0.1);
  drawLayer.colorMode(RGB, 255, 255, 255, 255);


  //basicLayer info
  drawLayer.stroke(10);
  drawLayer.strokeWeight(20);

  // vector array used to store points, this will max out at 100
  resetVectorStore();

let importColour = localStorage.chosenColour;
chosenColour = importColour.split(",");

  console.log(chosenColour);

  sizeWindow();
  writeTextUI();
  selectAbrush(1);


  render();

  appStarted = 1;


}



// calcuate Dimensions for use in this sketch, done during initialise and resize.
function dimensionCalc() {
  if (width > height) {
    vMax = width / 100;
    vMin = height / 100;
    circleRad = height * 0.45;
  } else {
    vMax = height / 100;
    vMin = width / 100;
    circleRad = width * 0.45;
  }
}


function windowResized() {
  if (appStarted) {
    sizeWindow();
  }
}

function sizeWindow() {

  resizeCanvas(windowWidth, windowHeight);
  lineLayer.resizeCanvas(width, height);
  aa = createGraphics(width, height);
  aa.image(drawLayer, 0, 0, width, height)
  drawLayer.resizeCanvas(windowWidth, windowHeight);
  drawLayer = aa;


  dimensionCalc();
  writeTextUI();

  if (drawingPaused) {
    renderSmall();
  } else {
    render();
  }

}

function mousePressed() {
  fadeIn = 0;
}

function mouseDragged() {

  if (drawingPaused == 0) {
    //stop fadein
    fadeIn = 0;

    //  fade the UI out
    if (buttonOpacity > 0) {
      buttonOpacity = buttonOpacity - 0.01;
      let buttons = document.getElementsByClassName("box");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = buttonOpacity;
      }
    }

    calcDynamics();

    brushIt(mouseX, mouseY, pmouseX, pmouseY);
    tracker++;
    //  drawLayer.line(mouseX, mouseY, pmouseX, pmouseY);
    render();
  }
  return false;
}


function touchEnded() {
  resetVectorStore();
  fadeIn = 1;
  drawLayer.image(lineLayer, 0, 0, width, height);
  lineLayer.clear();
  lineArray = [];
}



function draw() {

  // TODO: Is the below still relevant??

  if (fadeIn) {
    if (buttonOpacity < 1.1) {
      buttonOpacity = buttonOpacity + 0.01;
      let buttons = document.getElementsByClassName("box");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = buttonOpacity;
      }
    } else {
      fadeIn = 0;
    }
  }
}

function render() {
var cccc = chosenColour.map(String);
background(parseInt(chosenColour[0]), parseInt(chosenColour[1]), parseInt(chosenColour[2]));
image(drawLayer, 0, 0, width, height);
image(lineLayer, 0, 0, width, height);
}
