module.exports = {
	gameState,
	gameLoop
}

function gameState() {
	return {
		player: {
			pos: {
				x: 100,
				y: 100
			},
			vel: {
				x: 5,
				y: 5
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

