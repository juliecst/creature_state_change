let nB = [];
let c;
let snack = []; 
let s 
let xc
let yc
let xsp = 5
let ysp = 4
let button; 
let canvas; 
let slider;
let state = 0; 

function setup() {
  noiseDetail(2, 0.6);
  createCanvas(400, 400);
  feed();
  howMuchFood();
  c = new Creature (200, 200);
  nB.push(c);
}

function feed(){
  button = createButton("feed");
  button.addClass("button");
  button.parent("gui-container");
  button.mousePressed (addFood);
}

function howMuchFood(){
  slider = createSlider(10,20,15,1)
  slider.addClass("slider");
  slider.parent("gui-container");
}

function addFood(){
  s = new Food (random(width), random(height))
  snack.push(s)
}

function edges () {
    if (s.x < 0 || s.x > windowWidth){
      xsp = -xsp; 
    }
    if (s.y < 0|| s.y > windowHeight){
      ysp = -ysp 
    }
}

function draw() {
  background(20);
  stroke(255);
  noFill();
  frameRate(10);
  face();
  
  for(let i = 0; i < snack.length; i++){
    let arg = floor(map(noise(random(10)), -1, 1, 0, 10))
    edges();
	s.show();
    s.x += xsp * cos(arg);
    s.y += ysp * sin (arg) 
  }
  
  let value = slider.value();
  
  c.show();
  c.x += 2
  c.y += 2;

}

function face(){
   //creature styling
  push();
  noStroke();
  blendMode(DODGE);
  fill(234,3,23);
  circle (180, 190,10);
  circle (220, 190, 10);
  
  push()//legs
  stroke(255)
  line(180,230, 180,250);
  line(180, 250, 160,250);
  line(220, 230, 220, 250);
  line(220, 250,240, 250)
  pop();
  pop();
}

class Creature {
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.a = 0;
    this.xoff = 200;
    this.yoff = 200;
    this.r = 0;
    this.vel = createVector(2,2);

  }
  
  show() {
    push();
    noFill()
    translate(width/3, height/3)
    beginShape();
    for (this.a = 0; this.a < TWO_PI; this.a += 0.08) {
      this.pos.x = this.r * cos(this.a);
      this.pos.y = this.r * sin(this.a);
      curveVertex(this.pos.x + random(120), this.pos.y + random(100));
    }
    endShape(CLOSE);
    pop();
  }
}

class Food {
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.diam = random(20);
    this.vel = createVector(random(20),random(20))
    this.direction = createVector(random(-2,2));
  }
  
  move(){
    this.x +=this.vel;
    this.y +=this.vel;
  }
  
  show(){
    fill(234,32,134);
    circle(this.x, this.y, this.diam);
  }
}
