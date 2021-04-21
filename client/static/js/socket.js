socket.on('clientId', clientId)
socket.on('gameCode', setGameCode)
socket.on('updateGameStatus', updateGameStatus)
socket.on('error')

socket.on('gameStarted', gameStarted)
socket.on('updatePlayersLobby', updatePlayersLobby)

function error(data){
	alert(data)
}

function clientId(id){
	myId = id;

	Toastify({
	  text: "Connected to server",
	  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
	  className: "info",
	  duration: 3000,
	}).showToast();	
}

function setGameCode(code){
	gameCode = code;
}

function updateGameStatus(data){
	gameState = data
	myGameState = data.players[myId]

	updateMyBullets(data)
	walk(data)
	updateBullets(data)

	updateMyGame() //Trigger to send client update to server
}

function updatePlayersLobby(data) {
	gameState = data
}

function startGame(){	
	socket.emit('startGame')
}

function gameStarted(){
	redirectPage('game')
	initGame()
	clearInterval(lobbyInterval)

    window.addEventListener("keydown", function(data){
		keysDown(data)
	// otherKeys(data)
    })

	window.addEventListener("keyup", keysUp)

	const int = setInterval(() => {
		try{
			game = document.getElementById('GAME')
			game.addEventListener('pointerdown', fireFunction);
			game.addEventListener("mousemove", updateMousePos);	

			if (game){
				clearInterval(int)
			}
		}catch{

		}		
	}, 50)
	
}