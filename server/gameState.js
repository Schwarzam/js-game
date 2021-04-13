module.exports = {
	gameState,
	gameLoop,
	initGame,
	addPlayer
}

function initGame() {
	const state = gameState()
	state.players.push(playerDefault())
	//Changes to state here
	return state;
}

function addPlayer(state) {
	state.players.push(playerDefault())
	playerDefault()
	return state
}

function gameState() {
	return {
		players: [],
	};
}

function playerDefault(){
	return{
			pos: {
				x: 610,
				y: 309
			},
			vel: {
				x: 0,
				y: 0
			},
	}
}

function gameLoop(state) {
	if (!state){
		return;
	}

	for (i in state.players){
		state.players[i].pos.x += state.players[i].vel.x;
		state.players[i].pos.y += state.players[i].vel.y;
	}
}

