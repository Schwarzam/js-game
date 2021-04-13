gameScreen.addEventListener('pointerdown', fireFunction)
gameScreen.addEventListener('pointerup', deFireFunction)

let bullets = []
let fireInterval;

function fireFunction(e) {
	bullet = createBullet(e)
	// socket.emit('fireBullet', bullet)

	bullets.push(bullet)
}


function deFireFunction(e) {
	console.log('defire')
}


function createBullet(e) {
	let bullet = new PIXI.Sprite.from('imgs/progetil.png')
	let a = Math.atan2(e.pageY - 25 - player[name].y, e.pageX - player[name].x);

	bullet.width = 12
	bullet.height = 12
	// var deltaX = input.mouseX - (this.localX + this.width/2);
	// var deltaY = input.pageY - (this.localY + this.height/2);

	bullet.player = name;

	bullet.angle = a * 180/Math.PI 

	bullet.anchor.set(0.5);
	bullet.x = player[name].x;
	bullet.y = player[name].y;

	console.log(a * 180/Math.PI)

	bullet.speedX =  Math.cos(a) * 5;
	bullet.speedY = Math.sin(a) * 5;

	app.stage.addChild(bullet);
	return bullet
}

function updateBullets(){
	for (i in bullets){
		bullets[i].position.x += bullets[i].speedX;
		bullets[i].position.y += bullets[i].speedY;
	}
}