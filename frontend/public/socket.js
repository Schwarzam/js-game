


socket.on('gameState', handleGameState)

socket.on('init', handleInit)
socket.on('gameCode', handleGameCode)

socket.on('unknownGame', handleUnknownGame)
socket.on('tooManyPlayers', handleTooManyPlayers)

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