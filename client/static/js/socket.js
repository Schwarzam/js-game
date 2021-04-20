socket.on('clientId', clientId)
// socket.on('gameCode', setGameCode)
socket.on('updateGameStatus', updateGameStatus)

function clientId(id){
	myId = id;
}

// function setGameCode(){
// 	gameState
// }

function updateGameStatus(data){
	console.log(data)
	gameState = data
}