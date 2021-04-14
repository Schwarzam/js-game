socket.on('newBullets', handleNewBullets)
socket.on('bulletsState', updateBullets)
// socket.on('playerHit', playerHit)

gameScreen.addEventListener('pointerdown', fireFunction)
gameScreen.addEventListener('pointerup', deFireFunction)

let bullets = {}
let fireInterval;

function fireFunction(e) {
	
	var rect = e.target.getBoundingClientRect();
	var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;

    console.log(x, y, reverseSizingObjects(x), reverseSizingObjects(y))

	const info = {mouseX: reverseSizingObjects(x), mouseY: reverseSizingObjects(y)}

	socket.emit('fireBullet', info)
}

function deFireFunction(e) {
	
}

function handleNewBullets(newBullets){
	for (i in newBullets){
		bullets[newBullets[i].id] = createBullet(newBullets[i])
	}
}

function createBullet(newBullet) {
	let bullet = new PIXI.Sprite.from('imgs/progetil.png')
	
	bullet.width = sizingObjects(12)
	bullet.height = sizingObjects(12)

	bullet.anchor.set(0.5);
	bullet.angle = newBullet.angle;
	bullet.x = sizingObjects(newBullet.x);
	bullet.y = sizingObjects(newBullet.x);

	app.stage.addChild(bullet);
	return bullet
}

let lastBulletsState

function updateBullets(bulletsState){
	for (i in bulletsState){
		if (bulletsState[i].dead){
			app.stage.removeChild(bullets[bulletsState[i].id])
			delete bullets[bulletsState[i].id]
		}else{
			bullets[bulletsState[i].id].x = sizingObjects(bulletsState[i].posX)
			bullets[bulletsState[i].id].y = sizingObjects(bulletsState[i].posY)
		}
	}
}