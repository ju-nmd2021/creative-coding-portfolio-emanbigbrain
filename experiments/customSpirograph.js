//code example from Garrit Schaap
class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = random(5);
    this.mass = random(2);
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  draw() {
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }
}




class Attractor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 50;
    this.mass = Math.round(random(100, 500));
  }

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = constrain(force.mag(), random(15), 25);
    force.normalize();
    let m = (G * element.mass * this.mass) / (distance * distance);
    force.mult(m);
    return force;
  }

  draw() {
    noStroke();
    noFill();
    ellipse(this.position.x, this.position.y, this.size);
  }
}



let element;
let element2;
let element3;
let element4;

let attractor;
let G = 1;


function setup() {
  
  createCanvas(innerWidth, innerHeight);
  element = new Element(random(50, 100), random(100, 200));
  attractor = new Attractor(400, 300);
  setTimeout(() => {
      element2 = new Element(random(100, 150), random(110, 210));
  }, 1000);

  setTimeout(() => {
    element3 = new Element(random(130, 180), random(120, 220));
  }, 2000);

  setTimeout(() => {
    element4 = new Element(random(160, 210), random(130, 230));
  }, 3000);

background(0, 0, 0);
}

function draw() {

  fill(random(20), random(255), random(255));
  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();
  element.draw();
  
  if (element2) {
  fill(random(255), random(255), random(20));
  force = attractor.attract(element2);
  element2.applyForce(force);
  element2.update();
  element2.draw();
  }

  if (element3) {
    fill(random(255), random(20), random(255));
    force = attractor.attract(element3);
    element3.applyForce(force);
    element3.update();
    element3.draw();
  }

  if (element4) {
    fill(random(155), random(255), random(80));
    force = attractor.attract(element4);
    element4.applyForce(force);
    element4.update();
    element4.draw();
  }
  
  attractor.draw();
}
