const { gameState, gameLoop } = require('./gameState')


module.exports = {
	startGameInterval
}

function startGameInterval(client, state) {
	const intervalId = setInterval(() => {
		const game = gameLoop(state);

		client.emit('gameState', JSON.stringify(state));

		//client.emit('gameOver')
		//clearInterval(intervalId)
	}, 1000 / 20) //FRAME RATE 1s/x
}