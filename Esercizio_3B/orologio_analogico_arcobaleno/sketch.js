let colori = [
  [255, 255, 153],  // Giallo chiaro
  [204, 255, 204],  // Verde chiaro
  [204, 229, 255],  // Blu chiaro
  [229, 204, 255],  // Viola chiaro
  [255, 204, 204],  // Rosso chiaro
  [255, 229, 204]   // Arancione chiaro
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();

  translate(width / 2, height / 2);

  let r = 180;
  let s = second();

  // Calcolo secondo per spicchio colorato
  let s_colore = s;

  // Colori dietro la lancetta dei secondi
  push();
  rotate(-HALF_PI);  // parte da mezzogiorno
  for (let i = 0; i < 60; i++) {
    let angoloPerSpicchio = TWO_PI / 60;
    let startAng = i * angoloPerSpicchio;
    let endAng = startAng + angoloPerSpicchio;

    if (i <= s_colore) {
      let blocco = Math.floor(i / 10);
      let col1 = color(...colori[blocco % colori.length]);
      let col2 = color(...colori[(blocco + 1) % colori.length]);
      let t = (i % 10) / 10;
      let colInterpolato = lerpColor(col1, col2, t);
      fill(colInterpolato);
    } else {
      fill(255);
    }
    arc(0, 0, r * 2, r * 2, startAng, endAng, PIE);
  }
  pop();

  // puntini
  fill(0);
  for (let i = 0; i < 60; i++) {
    push();
    rotate(i / 60 * TWO_PI);
    if (i % 5 == 0) {
      ellipse(0, -r, 15);
    } else {
      ellipse(0, -r, 5);
    }
    pop();
  }

  // ore
  push();
  const angoloOre = (hour() / 12 + minute() / 60 / 12) * TWO_PI;
  rotate(angoloOre);
  fill(0);
  rect(-10, 20, 20, -130);
  pop();

  // minuti
  push();
  const angoloMinuti = minute() / 60 * TWO_PI;
  rotate(angoloMinuti);
  fill(0);
  rect(-8, 20, 16, -180);
  pop();

  // centrino (commentato)
  // fill(255);
  // ellipse(0, 0, 5);
}