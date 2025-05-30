let posX, posY;
let velX, velY;

let paddleLeftY, paddleRightY;
const paddleWidth = 10;
const paddleHeight = 80;

let scoreLeft = 0;
let scoreRight = 0;

let leftError = 0;
let errorTimer = 0;

function setup() {
  createCanvas(500, 400);

  posX = width / 2;
  posY = height / 2;

  velX = 6;
  velY = 3.5;

  paddleLeftY = height / 2 - paddleHeight / 2;
  paddleRightY = height / 2 - paddleHeight / 2;
}

function draw() {
  background(190);

  drawCenterLine();
  moveBall();
  checkCollisions();
  drawBallAndPaddles();
  movePaddles();
  showScores();
}

function drawCenterLine() {
  stroke(255);
  strokeWeight(6);
  for (let y = 0; y < height; y += 30) {
    line(width / 2, y, width / 2, y + 15);
  }
  noStroke();
}

function moveBall() {
  posX += velX;
  posY += velY;

  // Rimbalzo sopra/sotto
  if (posY > height || posY < 0) {
    velY = -velY;
  }
}

function checkCollisions() {
  // Paddle sinistro (automatico)
  if (posX - 12.5 <= paddleWidth) {
    if (posY > paddleLeftY && posY < paddleLeftY + paddleHeight) {
      velX = -velX;

      // Effetto "spin": varia velocità verticale in base a dove colpisce
      let offset = posY - (paddleLeftY + paddleHeight / 2);
      velY = offset * 0.2 + random(-0.5, 0.5);
      velY = constrain(velY, -7, 7);

      posX = paddleWidth + 12.5;
    } else if (posX < 0) {
      scoreRight++;
      resetBall();
    }
  }

  // Paddle destro (giocatore)
  if (posX + 12.5 >= width - paddleWidth) {
    if (posY > paddleRightY && posY < paddleRightY + paddleHeight) {
      velX = -velX;

      let offset = posY - (paddleRightY + paddleHeight / 2);
      velY = offset * 0.2 + random(-0.5, 0.5);
      velY = constrain(velY, -7, 7);

      posX = width - paddleWidth - 12.5;
    } else if (posX > width) {
      scoreLeft++;
      resetBall();
    }
  }
}

function drawBallAndPaddles() {
  // Pallina
  fill(255, 0, 0);
  ellipse(posX, posY, 25);

  // Paddle sinistro
  fill(0);
  rect(0, paddleLeftY, paddleWidth, paddleHeight);

  // Paddle destro
  rect(width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
}

function movePaddles() {
  // Paddle destro col mouse
  paddleRightY = constrain(mouseY - paddleHeight / 2, 0, height - paddleHeight);

  // Paddle sinistro automatico con errore modulato
  if (errorTimer <= 0) {
    // Errore diminuisce se la pallina va più veloce
    let errorFactor = map(abs(velX), 0, 10, 40, 10);
    leftError = random(-errorFactor, errorFactor);
    errorTimer = 30;
  } else {
    errorTimer--;
  }

  let targetY = posY - paddleHeight / 2 + leftError;

  let dy = targetY - paddleLeftY;
  paddleLeftY += constrain(dy, -3, 3);
  paddleLeftY = constrain(paddleLeftY, 0, height - paddleHeight);
}

function showScores() {
  fill(0);
  textSize(32);
  textAlign(CENTER, TOP);
  text(scoreLeft, width / 4, 10);
  text(scoreRight, 3 * width / 4, 10);
}

function resetBall() {
  posX = width / 2;
  posY = height / 2;

  velX = random([-6, 6]);
  velY = random([-3.5, 3.5]);
}