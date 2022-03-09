let squareSwatch, chosenSwatch;
let buttonBool = 1;
let disablePicking = 0;


var array1 = [
  ["#f7b7c8", "#f1bbd5", "#e2bbd8", "#cdbada", "#bfbbde", "#bdd7f0", "#c1e7f4", "#c2e5df", "#c7e3b3", "#e2ecb7", "#f8f8bc", "#ffe2ba", "#fbc2bb", "#ffffff"],
  ["#f394aa", "#e799c1", "#cf9ac6", "#ad95c7", "#9494ca", "#9abde3", "#a4ddee", "#a5dad0", "#abd58b", "#d1e391", "#f6f297", "#fed295", "#f7a194", "#d2d2d2"],
  ["#f06989", "#da75af", "#bc78b3", "#8b6eb1", "#666db3", "#78a3d6", "#86d4e8", "#8bd0be", "#95cb5b", "#c1da65", "#f2ee70", "#fdc16b", "#f57d6d", "#b4b4b4"],
  ["#f04168", "#d557a0", "#ac5ca5", "#7459a6", "#4f5caa", "#5a88c6", "#70cfe5", "#7ccab2", "#7fc241", "#b3d236", "#eeeb46", "#fbad41", "#f15b43", "#969696"],
  ["#ee2148", "#d64799", "#a3509e", "#6253a4", "#3e55a5", "#4571b8", "#61cbe3", "#71c6a5", "#70c045", "#a2cc3a", "#edea2b", "#f99b1d", "#ee3823", "#787878"],
  ["#e41f31", "#cd3695", "#994a9d", "#5a4ca1", "#374da2", "#3765b0", "#34c2d8", "#59bf98", "#56ba48", "#89c541", "#d7db22", "#e28526", "#e22426", "#5a5a5a"],
  ["#b3202a", "#b3208b", "#8e3996", "#503b98", "#2e3b97", "#1f52a5", "#16a3b4", "#19b585", "#2bb34d", "#66b647", "#acb037", "#b36928", "#b32026", "#3c3c3c"],
  ["#891721", "#872369", "#742b85", "#3e2c82", "#2a2b7b", "#234285", "#087c89", "#088a64", "#178b44", "#508a40", "#838635", "#875122", "#861819", "#1e1e1e"],
  ["#5f0618", "#5f154a", "#511e60", "#2c1d5e", "#221d5d", "#1d2d5e", "#135760", "#106047", "#1c6132", "#3b612e", "#5c5f2a", "#5f3914", "#60130d", "#000000"]
];

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);




  var lang = localStorage.lang;
  console.log(lang);
  if (lang = "fr") {
    document.getElementById("header").innerHTML = "Choisissez une couleur qui correspond à l'odeur que vous percevez.";
  } else {
    document.getElementById("header").innerHTML = "Please choose a colour that you think corresponds to the odour";
  }

  canvas.parent('sketch-holder');
  squareSwatch = createGraphics(width, height);
  chosenSwatch = createGraphics(width, height);
  background(0);
  squareSwatch.colorMode(RGB);
  chosenSwatch.colorMode(RGB);
  squareSwatch.noStroke();
  chosenSwatch.noStroke();
  makeSquares();
  render();
}

function makeSquares() {

  let adjustHeight = height * 0.85;
  var rowCount = 9;
  var colCount = 14;
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      var x = ((width / colCount) * j);
      var y = ((adjustHeight / rowCount) * i) + (height * 0.15);
      var w = (width / colCount);
      var h = (adjustHeight / rowCount);
      var colourtemp = array1[i][j];
      squareSwatch.fill(colourtemp);
      squareSwatch.rect(x, y, w + 1, h + 1);
    }
  }

  render();
}

function touchMoved() {
  if (disablePicking == 0) {
    selectColour();
  }

}

function mousePressed() {
  if (disablePicking == 0) {
    selectColour();
  }

}

function selectColour() {
  if (mouseIsPressed && (mouseY > 0) && (mouseY < windowHeight) && (mouseX > 0) && (mouseX < windowWidth)) {
    var c = squareSwatch.get(mouseX, mouseY);
    chosenSwatch.fill(c);
    localStorage.chosenColour = c;
    chosenSwatch.rect(0, 0, width, height);
    renderBig();
  }
}

function mouseReleased() {
  disablePicking = 1;
  document.getElementById('promptBox').classList.remove('hidden');
  document.getElementById('promptBox').classList.add('visible');
  document.getElementById('titleBox').classList.add('hidden');
  document.getElementById('titleBox').classList.remove('visible');
}

function render() {

  background(0);
  image(squareSwatch, 0, 0, width, height);
}

function renderBig() {
  image(chosenSwatch, 0, 0, width, height);
}

function goBack() {

  disablePicking = 0;
  document.getElementById('promptBox').classList.add('hidden');
  document.getElementById('promptBox').classList.remove('visible');
  document.getElementById('titleBox').classList.remove('hidden');
  document.getElementById('titleBox').classList.add('visible');
  render();
}

function proceed() {
  disablePicking = 1;
  window.location.href = "../shapeChooser/index.html";

}
