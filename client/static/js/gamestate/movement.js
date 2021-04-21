function keysDown(e) {
	keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

function walk(data){
	try{
		for (i in data.players){
			document.getElementById(i).innerHTML = data.players[i].health

			//Player position from server
			player[i].x = sizingObjects(data.players[i].pos.x)
			player[i].y = sizingObjects(data.players[i].pos.y)

			//Gun position from server
			player[i].gun.x = player[i].x + 5
			player[i].gun.y = player[i].y + 4
			player[i].gun.angle = Math.atan2(data.players[i].mousePos.y - player[i].y, data.players[i].mousePos.x - player[i].x) * 180/Math.PI

			//Name position
			player[i].nameTop.position.set(player[i].x - sizingObjects(10), player[i].y - sizingObjects(40))
		}
	}catch(e){
		console.log(e)
	}
}

function myMove(){
	try{
		if (keys["87"]) {
			vel.y = -5;
		}
		if (keys["65"]) {
			vel.x = -5;
		}
		if (keys["68"]) {
			vel.x = 5;
		}
		if (keys["83"]) {
			vel.y = 5;
		}

		if (vel.y !== 0 && vel.x !== 0){
			vel.y = vel.y/1.41
			vel.x = vel.x/1.41
		}
	}catch(e) {
		console.log(e)
	}

	return;
}