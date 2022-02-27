let shape = [];
let qty = 35;

let storedDistance = 1000;

function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(80, 0, 255);

  for (let i = 0; i < qty; i++){
    let angle = ((2*PI)/qty)*i;
    let arr = [];


    arr[0] = (width/2)+(width/4)*cos(angle);
    arr[1] = (height/2)+(width/4)*sin(angle);
    shape.push(arr)
  }

  render();
}

function mouseDragged(){
storedDistance = 10000;
let chosen;
  console.log("dragging");

for (let i = 0; i < shape.length; i++){
let d = dist(mouseX, mouseY, shape[i][0], shape[i][1]);
if (d < storedDistance){
storedDistance = d;
  chosen = i;
}
}

if (storedDistance < 60){
  shape[chosen][0] = mouseX;
  shape[chosen][1] = mouseY;
}
render();
}



function render(){
  background(0);
  fill(80, 0, 255);

beginShape();
vertex(shape[shape.length-1][0], shape[shape.length-1][1]);
for (i = 0; i < shape.length; i++){
curveVertex(shape[i][0], shape[i][1]);
}


endShape();
fill(255);
for (i = 0; i < shape.length; i++){
ellipse(shape[i][0], shape[i][1], 4, 4);
}
}
