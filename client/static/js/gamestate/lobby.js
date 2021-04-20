socket.on('gameJoined', gameJoined)


function createNewGame(){
	socket.emit('createGame')
	redirectPage('playersLobby')

	updateLobbyPlayers()
}

function joinGame(){
	const code = document.getElementById('gameCodeInput').value.trim()

	socket.emit('joinGame', code)
}

function gameJoined(){
	console.log('Joined game!')
	redirectPage('playersLobby')
	updateLobbyPlayers()
}

function updateLobbyPlayers(){
	lobbyInterval = setInterval(() => {
		const lobbyPlayers = document.getElementById('lobbyPlayers')
		lobbyPlayers.innerHTML = '';

		for (i in gameState.players){
			const element = document.createElement('p')
			element.innerHTML = (gameState.players[i].name ? gameState.players[i].name : 'guest')
			lobbyPlayers.appendChild(element)
		}
	}, 500)
}