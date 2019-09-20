var robo
var mous
let count = 0;

function setup() {
  ca = createCanvas(windowWidth, windowHeight)
  ca.position(0, 0)
  robo = new robot()
  frameRate(35)
  mous = createVector(0, 0);
}

function draw() {
  background(0)
  mouse();
  fill(255)
  textSize(16);
  textAlign(RIGHT);
  text("Use 'w' and 'a' keys for left wheel\n \nUse 'p' and 'l' keys for right wheel", windowWidth - 40, 40)
  robo.update()
  robo.display()
}

class robot {
  constructor() {
    this.pos = createVector(40, 40);
    this.theta = 0;
    this.r = 10;
    this.l = 80;
    this.w = createVector(0, 0);
    this.w1acc = 0;
    this.w2acc = 0;
    this.maxacc = 2;
  }
  update() {
    this.keyboard_input()
    if (this.theta >= PI) {
      this.theta = this.theta - 2 * PI
    }
    if (this.theta < -PI) {
      this.theta = this.theta + 2 * PI
    }
    this.w.x += this.w1acc;
    this.w.y += this.w2acc;
    constrain(this.w.x, -0.1, 0.1)
    constrain(this.w.y, -0.1, 0.1)
    this.pos.x += this.r * (this.w.x + this.w.y) * cos(this.theta);
    this.pos.y += this.r * (this.w.x + this.w.y) * sin(this.theta);
    this.theta += (this.r / this.l) * (this.w.x - this.w.y);
    this.w.x *= 0.9;
    this.w.y *= 0.9;
  }
  keyboard_input() {
    if (keyIsDown(81)) {
      robo.w1acc = 0.05;
    } else if (keyIsDown(65)) {
      robo.w1acc = -0.05;
    } else {
      robo.w1acc = 0;
    }
    if (keyIsDown(80)) {
      robo.w2acc = 0.05;
    } else if (keyIsDown(76)) {
      robo.w2acc = -0.05;
    } else {
      robo.w2acc = 0;
    }
  }
  display() {
    translate(this.pos.x + this.l / 2, this.pos.y + this.l / 2);
    rotate(this.theta)
    strokeWeight(5);
    stroke(255);
    fill(230, 60, 30)
    ellipseMode(CENTER)
    ellipse(0, 0, this.l, this.l)
    fill(90, 230, 30)
    rectMode(CENTER)
    rect(0, -(this.l / 2) - 10, this.l, 20)
    rect(0, (this.l / 2) + 10, this.l, 20)
    stroke(0);
    strokeWeight(18);
    line(0, 0, 50, 0)
    if (count < 8) {
      line(0, 0, 50, 20)
      line(0, 0, 50, -20)
    }
    if (count > 15) {
      count = 0;
    }
    count++;
  }

}

function mouse() {
  mous.x = mouseX;
  mous.y = mouseY;
}