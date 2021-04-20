function updateMousePos(e){
	try{
		var rect = e.target.getBoundingClientRect();
		myGameState.mousePos = {x: e.clientX - rect.left, y: e.clientY - rect.top}

	}catch(e){

	}
}

function fireFunction(e){

	var rect = e.target.getBoundingClientRect();
	const a = Math.atan2((e.clientY - rect.top) - myGameState.pos.y, (e.clientX - rect.left) - myGameState.pos.x);

	newBullet = {
					id: counter.toString() + myId,
					client: myId,
					angle: a * 180/Math.PI, 
					posX: myGameState.pos.x + Math.cos(a) * 30,
					posY: myGameState.pos.y + Math.sin(a) * 50,
					speedX: Math.cos(a) * 5,
					speedY: Math.sin(a) * 5,
					damage: 20
				}

	counter = counter += 1;
	myGameState.lastFire = +new Date();

	myGameState.bullets[newBullet.id] = newBullet
}

function updateBullets(data){
	console.log(data.players)
	try{
		for (i in data.players){
			const each = data.players[i]
			for (i in each.bullets){
				if (bullets[each.bullets[i].id]) {
					bullets[each.bullets[i].id].x = sizingObjects(each.bullets[i].posX)
					bullets[each.bullets[i].id].y = sizingObjects(each.bullets[i].posY)
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

function updateMyBullets(){
	try{
		for (i in myGameState.bullets){
			myGameState.bullets[i].posX += myGameState.bullets[i].speedX
			myGameState.bullets[i].posY += myGameState.bullets[i].speedY
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