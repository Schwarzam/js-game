socket.on('clientId', setId)
socket.on('gameState', handleGameState)

socket.on('gameCode', handleGameCode)

socket.on('unknownGame', handleUnknownGame)
socket.on('tooManyPlayers', handleTooManyPlayers)

socket.on('roomPlayers', handleRoomPlayers)

socket.on('startGame', handleStartGame)
socket.on('winner', handleWin)

function setId(id){
	myID = id
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

function sendMousePosition() {
	console.log(`send`)
	setInterval(function() {
	  socket.emit('mousePos', mousePos)
	}, 100);
}

function handleWin(id) {
	var winner;
	for (i in players){
		if (Object.keys(players[i])[0] === id){
			const textSample = new PIXI.Text(`${players[i][Object.keys(players[i])[0]]} won!` , {
		        fontFamily: 'Snippet',
		        fontSize: sizingObjects(50),
		        fill: 'white',
		        align: 'left',
		    });
		    textSample.position.set(50, 200);

		    app.stage.addChild(textSample);
		}
	}
}