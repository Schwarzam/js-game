socket.on('newBullets', handleNewBullets)
socket.on('bulletsState', updateBullets)

gameScreen.addEventListener('pointerdown', fireFunction)
gameScreen.addEventListener('pointerup', deFireFunction)

let bullets = {}
let fireInterval;

function fireFunction(e) {
	let a = Math.atan2(e.pageY - 25 - player[myId].y, e.pageX - player[myId].x);
	const info = {mouseY: e.pageY - 25, mouseX: e.pageX}
	socket.emit('fireBullet', info)
}

function deFireFunction(e) {
	console.log('defire')
}

function handleNewBullets(newBullets){
	console.log(newBullets)
	for (i in newBullets){
		bullets[newBullets[i].id] = createBullet(newBullets[i])
	}
}

function createBullet(newBullet) {
	let bullet = new PIXI.Sprite.from('imgs/progetil.png')
	
	bullet.width = 12
	bullet.height = 12

	bullet.anchor.set(0.5);
	bullet.angle = newBullet.angle;
	bullet.x = newBullet.x;
	bullet.y = newBullet.y;

	app.stage.addChild(bullet);
	return bullet
}

function updateBullets(bulletsState){
	for (i in bulletsState){
		if (bulletsState[i].posX < -99 || bulletsState[i].posX > 1500 || bulletsState[i].posY < -99 || bulletsState[i].posY > 1500){
			app.stage.removeChild(bullets[bulletsState[i].id])
			delete bullets[bulletsState[i].id]
		}else{
			bullets[bulletsState[i].id].x = bulletsState[i].posX
			bullets[bulletsState[i].id].y = bulletsState[i].posY
		}
	}
}