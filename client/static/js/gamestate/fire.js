function updateMousePos(e){
	try{
		var rect = e.target.getBoundingClientRect();
		myGameState.mousePos = {x: e.clientX - rect.left, y: e.clientY - rect.top}

	}catch(e){

	}
}

function fireFunction(e){

	var rect = e.target.getBoundingClientRect();
	const a = Math.atan2(reverseSizingObjects(e.clientY - rect.top) - myGameState.pos.y, reverseSizingObjects(e.clientX - rect.left) - myGameState.pos.x);

	newBullet = {
					id: counter.toString() + myId,
					client: myId,
					angle: a * 180/Math.PI, 
					posX: myGameState.pos.x + Math.cos(a) * 40,
					posY: myGameState.pos.y + Math.sin(a) * 60,
					speedX: Math.cos(a) * 5,
					speedY: Math.sin(a) * 5,
					damage: 20
				}

	counter = counter += 1;
	lastFire = +new Date();

	myBullets[newBullet.id] = newBullet;
}

function updateBullets(data){
	try{
		for (i in data.players){
			const each = data.players[i]
			for (i in each.bullets){
				if (bullets[each.bullets[i].id]) {

				
				if (data.deadBullets.includes(each.bullets[i].id)){
					console.log(data.deadBullets)
					app.stage.removeChild(bullets[each.bullets[i].id])
					delete myBullets[each.bullets[i].id]
					delete bullets[each.bullets[i].id]
					deadBullets = []
				}else{

					const res = checkHit(bullets[each.bullets[i].id].x, bullets[each.bullets[i].id].y)
					if (res === 1){
						myGameState.health -= each.bullets[i].damage
						deadBullets.push(each.bullets[i].id)
					}else if(res === 2){
						deadBullets.push(each.bullets[i].id)
					}else{
						bullets[each.bullets[i].id].x = sizingObjects(each.bullets[i].posX)
						bullets[each.bullets[i].id].y = sizingObjects(each.bullets[i].posY)
					}				
				}

				}else{
					console.log('bullet')
					bullets[each.bullets[i].id] = createBullet(each.bullets[i])
				}
			}
		}
	}catch(e){
		console.log(e)
	}
}

function checkHit(bulletX, bulletY){
	if ( (bulletX < player[myId].x + sizingObjects(11) && bulletX > player[myId].x - sizingObjects(11)) && bulletY < player[myId].y + sizingObjects(31) && bulletY > player[myId].y - sizingObjects(31)){
		return 1 // Hitted me
	}else if(bulletX > sizingObjects(1350) || bulletX < -10 || bulletY > sizingObjects(814) || bulletY < -10){
		return 2 // Out of the map
	}else{
		return 0 // keep going
	}
}

function updateMyBullets(){
	try{
		for (i in myBullets){
			myBullets[i].posX += myBullets[i].speedX
			myBullets[i].posY += myBullets[i].speedY
		}
	}catch(e){
		console.log(e)
	}
}

function createBullet(newBullet) {
	let bullet = new PIXI.Sprite.from(IP + '/imgs/progetil.png')
	
	bullet.width = sizingObjects(12)
	bullet.height = sizingObjects(12)

	bullet.anchor.set(0.5);
	bullet.angle = newBullet.angle;
	bullet.x = sizingObjects(newBullet.posX);
	bullet.y = sizingObjects(newBullet.posY);

	app.stage.addChild(bullet);
	return bullet
}

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}