 module.exports = {
	gameState,
	initGame,
	addPlayer,
}

function initGame(playerIdentifier) {
	const state = gameState()
	state.players[playerIdentifier] = playerDefault()
	state.host = playerIdentifier;
	
	return state;
}

function addPlayer(state, playerIdentifier) {
	state.players[playerIdentifier] = playerDefault()
	return state
}

function gameState() {
	return {
		gameMode: '',
		players: {},
		bullets: {
			numBullets: 0,
			newBullets: {},
			bullets: {},
		},
		alive: {},
		gameOver: false
	};
}

function playerDefault(){
	return{
			pos: {
				x: 610,
				y: 309,
			},
			vel: {
				x: 0,
				y: 0
			},
			health: 100,
			gunState: '',
			inventory: ['scout', 'glock'],
		}
}