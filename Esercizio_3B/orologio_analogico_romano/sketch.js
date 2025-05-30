function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(26); // dimensione numeri romani via di mezzo
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  fill(0);

  const baseRadius = 160 * 1.3; // raggio base ingrandito
  const puntiniSize = 1.5 * 1.3; // dimensione puntini ingrandita

  // Pallini per i secondi (escludendo i numeri romani)
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      push();
      rotate(i / 60 * TWO_PI);
      translate(0, -baseRadius);
      ellipse(0, 0, puntiniSize, puntiniSize);
      pop();
    }
  }

  // Numeri romani con dimensione 26
  const romani = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
  for (let i = 0; i < 12; i++) {
    push();
    rotate(i / 12 * TWO_PI);
    translate(0, -baseRadius);
    fill(0);
    text(romani[i], 0, 0);
    pop();
  }

  // Lancetta ore - 50%
  push();
  stroke(0);
  strokeWeight(4);
  let angoloOre = (hour() % 12 + minute() / 60) / 12 * TWO_PI;
  rotate(angoloOre);
  line(0, 0, 0, -baseRadius * 0.5);
  pop();

  // Lancetta minuti - 75%
  push();
  stroke(0);
  strokeWeight(3);
  let angoloMinuti = minute() / 60 * TWO_PI;
  rotate(angoloMinuti);
  line(0, 0, 0, -baseRadius * 0.75);
  pop();

  // Lancetta secondi - 87.5%
  push();
  stroke(255, 0, 0);
  strokeWeight(2);
  let angoloSecondi = second() / 60 * TWO_PI;
  rotate(angoloSecondi);
  line(0, 0, 0, -baseRadius * 0.875);
  pop();
}