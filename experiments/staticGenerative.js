//fractal N-Gon by https://editor.p5js.org/MaximSchoemaker/sketches/-bcPIqdon

let widthsquare = 25;
let heightsquare = 25;
let x = innerWidth/2;
let y = innerHeight/2;
let weirdThing = y + 7;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 0);

}

function draw() {
noFill();
stroke(255, 255, 0);

  for (let i = 1; i <= 1; i++) {
    ellipse(x, y, widthsquare, heightsquare);
    widthsquare = widthsquare + 20;
    heightsquare = y; 
    y = y + 7;
  }

  for (let i = 1; i <= 1; i++) {
    ellipse(20, y, widthsquare, heightsquare);
    widthsquare = widthsquare + 20;
    heightsquare = y; 
    y = y + 7;
  }

  
  
}
 