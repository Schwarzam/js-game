socket.on('clientId', setId)
socket.on('gameState', handleGameState)

socket.on('gameCode', handleGameCode)

socket.on('unknownGame', handleUnknownGame)
socket.on('tooManyPlayers', handleTooManyPlayers)

socket.on('roomPlayers', handleRoomPlayers)

socket.on('startGame', handleStartGame)

function setId(id){
	myId = id;
}

function handleUnknownGame(){
	reset();
	alert('Unknown Game')
}

function handleTooManyPlayers(){
	reset();
	alert('in Progress')
}

function reset() {
	playerNumber = null;
	gameCodeInput.value = "";
	gameCodeDisplay.innerText = "";
	initialScreen.style.display = "block";
	gameScreen.style.display = "none";
}