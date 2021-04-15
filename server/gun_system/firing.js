

module.exports = {
	firingBullet
}

function firingBullet(bullet, client, state){
	try{
		const roomName = clientRooms[client.id];
		var damage = state[roomName].players[client.id].gunState.damage;

		if (+new Date() - state[roomName].players[client.id].lastFire < state[roomName].players[client.id].gunState.fire_rate * 1000){

		}else{
			if (!state[roomName].players[client.id].dead){	
				var x = state[roomName].players[client.id].pos.x
				var y = state[roomName].players[client.id].pos.y
				
				const a = Math.atan2(bullet.mouseY - y, bullet.mouseX - x);
				const id = state[roomName].bullets.numBullets

				newBullet = {
								id: id,
								client: client.id,
								angle: a * 180/Math.PI, 
								posX: x + Math.cos(a) * 30,
								posY: y + Math.sin(a) * 50,
								speedX: Math.cos(a) * state[roomName].players[client.id].gunState.bullet_speed,
								speedY: Math.sin(a) * state[roomName].players[client.id].gunState.bullet_speed,
								damage: damage
							}

				state[roomName].bullets.newBullets[state[roomName].bullets.numBullets] = newBullet
				state[roomName].bullets.bullets[state[roomName].bullets.numBullets] = newBullet
				state[roomName].bullets.numBullets = state[roomName].bullets.numBullets + 1	

				state[roomName].players[client.id].lastFire = +new Date();
			}
		}

	}catch(e){console.error(e)}
}

