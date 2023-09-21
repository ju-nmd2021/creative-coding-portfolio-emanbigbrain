//code example from Garrit Schaap

window.addEventListener("load", () => {
  oscillator = new Tone.Oscillator(440, "sine").toDestination();
});

class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = Math.round(random(5));
    this.mass = 2;
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

    oscillatorSound() {
      oscillator.volume.value = Math.round(this.position.y * 0.05);
      
    if (this.size == 1) {
      oscillator.frequency.value = 110;
    } else if (this.size == 2) {
      oscillator.frequency.value = 130;
    } else if (this.size == 3) {
      oscillator.frequency.value = 150;
    } else if (this.size == 4) {
      oscillator.frequency.value = 160;
    } else if (this.size == 5) {
      oscillator.frequency.value = 180;
    }
  }
}




class Attractor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 50;
    this.mass = 300;
  }

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = constrain(force.mag(), 5, 25);
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
let drawThings;

let synth;
let oscillator;



function setup() {

  createCanvas(innerWidth, innerHeight);
  element = new Element(100, 200);
  attractor = new Attractor(400, 300);
  setTimeout(() => {
      element2 = new Element(150, 210);
  }, 1000);

  setTimeout(() => {
    element3 = new Element(180, 220);
  }, 2000);

  setTimeout(() => {
    element4 = new Element(210, 230);
  }, 3000);

background(0, 0, 0);

} 



function draw() {

  fill(random(20), random(255), random(255));
  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();
  element.draw();
  element.oscillatorSound();
  
  if (element2) {
  force = attractor.attract(element2);
  element2.applyForce(force);
  element2.update();
  element2.draw();
  element.oscillatorSound();
  }

  if (element3) {
    force = attractor.attract(element3);

    element3.applyForce(force);
    element3.update();
    element3.draw();
    element.oscillatorSound();
  }

  if (element4) {
    force = attractor.attract(element4);

    element4.applyForce(force);
    element4.update();
    element4.draw();
    element.oscillatorSound();
  }
  
  attractor.draw();
}
 
window.addEventListener("click", () => {
  Tone.start();
  oscillator.start();

});


