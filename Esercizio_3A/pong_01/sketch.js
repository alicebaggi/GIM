let posX
let velX

let posY, velY

function setup() {
	createCanvas(500, 400)

	posX = 200
	velX = 7

	posY = 50
	velY = 5

}

//option e tasto con freccia in basso per spostare

function draw() {
	
	posX = posX + velX
	posY = posY + velY

	if(posX >= width) {
		velX = -velX
	} else if (posX < 0) {
		velX = -velX
	}

	if(posY >= height) {
		velY = -velY
	} else if (posY < 0) {
		velY = -velY
	}
	
	background(190)

	ellipse(posX, posY, 25)

}