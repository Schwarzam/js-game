gameScreen.addEventListener('pointerdown', fireFunction)

let bullets = []

function fireFunction(e) {
	let bullet = createBullet(e);
	bullets.push(bullet)
}

function createBullet(e) {
	let bullet = new PIXI.Sprite.from('imgs/progetil.png')
	let a = Math.atan2(e.pageY - player[name].y, e.pageX - player[name].x);

	// var deltaX = input.mouseX - (this.localX + this.width/2);
	// var deltaY = input.pageY - (this.localY + this.height/2);

	bullet.player = name;

	bullet.anchor.set(0.5);
	bullet.x = player[name].x;
	bullet.y = player[name].y;

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