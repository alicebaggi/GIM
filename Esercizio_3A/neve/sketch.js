let fiocchi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fiocchi = [];

  for (let i = 0; i < 300; i++) {
    fiocchi[i] = {
      px: random(0, width),
      py: random(-100),
      din: random(12, 28), // più variazione nella dimensione
      vel: random(0.5, 2.5),
      angolo: random(TWO_PI),  // per oscillazione
      ampiezza: random(10, 30), // quanto si muove lateralmente
      fase: random(0.01, 0.03)  // velocità oscillazione
    };
  }
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < fiocchi.length; i++) {
    let f = fiocchi[i];

    // Oscillazione orizzontale con sinusoide
    f.angolo += f.fase;
    f.px += sin(f.angolo) * 0.5; 

    f.py += f.vel;

    // Reset se esce dallo schermo
    if (f.py > height || f.px < -50 || f.px > width + 50) {
      f.px = random(0, width);
      f.py = random(-100, -10);
      f.angolo = random(TWO_PI);
    }

    textSize(f.din);
    text("❄", f.px, f.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}