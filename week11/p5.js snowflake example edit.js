//edited example: https://p5js.org/examples/classes-and-objects-snowflakes/
//web editor link: https://editor.p5js.org/CharleyMcLean96/sketches/VSmb2TJtO

// array to hold snowflakes
let snowflakes = [];

function setup() {
  createCanvas(400, 600);
  angleMode(DEGREES);

  // create snowflake objects
  for (let i = 0; i < 250; i++) {
    snowflakes.push(new Snowflake());
  }
}
function draw() {
  background(10, 30, 50, 20);

  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    // updating, displaying snowflakes
    flake.update(currentTime);
    flake.display();
  }
}

// defining snowflake characteristics
class Snowflake {
  constructor() {
    this.posX = random(width);
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(3, 7);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(180, 240), random(200, 256), random(220, 256));
    this.twinkle = random(0.98, 1.02); // brightness
  }

  update(time) {
    let angularSpeed = 25;

    // gently drift sideways
    let angle = this.initialAngle + angularSpeed * time;
    this.posX = width / 2 + this.radius * sin(angle) + random(-1, 1);

    // different size snowflakes fall at different y speeds
    let ySpeed = (6 + random(0.2, 0.8)) / this.size;
    this.posY += ySpeed;

    // resize slightly for twinkling effect
    this.size *= this.twinkle;

    // reset size within bounds
    if (this.size > 8 || this.size < 3) {
      this.size = random(3, 7);
    }

    // when snowflake reaches the bottom, move it back to the top
    if (this.posY > height) {
      this.posY = random(-50, 0);
      this.posX = random(width);
      this.radius = sqrt(random(pow(width / 2, 2)));
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  }
}
