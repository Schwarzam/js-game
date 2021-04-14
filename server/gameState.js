module.exports = {
	gameState,
	gameLoop,
	initGame,
	addPlayer
}

function initGame(playerIdentifier) {
	const state = gameState()
	state.players[playerIdentifier] = playerDefault()
	
	return state;
}

function addPlayer(state, playerIdentifier) {
	state.players[playerIdentifier] = playerDefault()
	playerDefault()
	return state
}

function gameState() {
	return {
		players: {},
		bullets: {
			numBullets: 0,
			newBullets: {},
			bullets: {},
		},
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
			health: 100
		}	
}

function gameLoop(state) {
	if (!state){
		return;
	}	
	for (i in Object.keys(state.players)){
		if (state.players[Object.keys(state.players)[i]].pos.x + state.players[Object.keys(state.players)[i]].vel.x > 1350){
			state.players[Object.keys(state.players)[i]].pos.x = 1349
		}else if (state.players[Object.keys(state.players)[i]].pos.x + state.players[Object.keys(state.players)[i]].vel.x < 0){
			state.players[Object.keys(state.players)[i]].pos.x = 1
		}else if (state.players[Object.keys(state.players)[i]].pos.y + state.players[Object.keys(state.players)[i]].vel.y > 814){
			state.players[Object.keys(state.players)[i]].pos.y = 812
		}else if (state.players[Object.keys(state.players)[i]].pos.y + state.players[Object.keys(state.players)[i]].vel.y < 0){
			state.players[Object.keys(state.players)[i]].pos.y = 1
		}else{
			state.players[Object.keys(state.players)[i]].pos.x += state.players[Object.keys(state.players)[i]].vel.x;
			state.players[Object.keys(state.players)[i]].pos.y += state.players[Object.keys(state.players)[i]].vel.y;
		}
		state.players[Object.keys(state.players)[i]].vel = {x: 0, y: 0}
	}
}

