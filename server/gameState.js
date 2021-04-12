module.exports = {
	gameState,
	gameLoop,
	initGame
}

function initGame() {
	const state = gameState()
	//Changes to state here


	return state;
}

function gameState() {
	return {
		players: [
		{
			pos: {
				x: 410,
				y: 309
			},
			vel: {
				x: 0,
				y: 0
			},
		},
		{
			pos: {
				x: 610,
				y: 309
			},
			vel: {
				x: 0,
				y: 0
			},
		}
		],
	};
}

function gameLoop(state) {
	if (!state){
		return;
	}

	const playerOne = state.players[0];
	const playerTwo = state.players[1];

	playerOne.pos.x += playerOne.vel.x;
	playerOne.pos.y += playerOne.vel.y;
}

