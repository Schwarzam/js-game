module.exports = {
	gameState,
	gameLoop
}

function gameState() {
	return {
		player: {
			pos: {
				x: 410,
				y: 309
			},
			vel: {
				x: 0,
				y: 0
			},
		},
	};
}

function gameLoop(state) {
	if (!state){
		return;
	}

	const playerOne = state.player;

	playerOne.pos.x += playerOne.vel.x;
	playerOne.pos.y += playerOne.vel.y;
}

