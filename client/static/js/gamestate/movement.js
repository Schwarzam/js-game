function keysDown(e) {
	keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

function walk(data){
	try{
		for (i in data.players){
			try{
				document.getElementById(i).innerHTML = data.players[i].health
			}catch{}
			

			if (data.players[i].gunState === ''){

			}else if (allGunStates[i] !== data.players[i].gunState){
				try{
					app.stage.removeChild(player[i].gun);
				}catch(e){}

				allGunStates[i] = data.players[i].gunState;
				createGun(i, get_weapon(data.players[i].gunState).url)
			}

			//Player position from server
			player[i].x = sizingObjects(data.players[i].pos.x)
			player[i].y = sizingObjects(data.players[i].pos.y)

			//Gun position from server
			player[i].gun.x = player[i].x + sizingObjects(5)
			player[i].gun.y = player[i].y


			player[i].gun.angle = Math.atan2(data.players[i].mousePos.y - player[i].y, data.players[i].mousePos.x - player[i].x) * 180/Math.PI
			//Name position
			player[i].nameTop.position.set(player[i].x - sizingObjects(10), player[i].y - sizingObjects(40))
		}
	}catch{
		
	}
}

function myMove(){
	try{
		if (keys["87"]) {
			vel.y = -10;
		}
		if (keys["65"]) {
			vel.x = -10;
		}
		if (keys["68"]) {
			vel.x = 10;
		}
		if (keys["83"]) {
			vel.y = 10;
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