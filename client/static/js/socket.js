socket.on('clientId', clientId)
// socket.on('gameCode', setGameCode)
socket.on('updateGameStatus', updateGameStatus)

function clientId(id){
	myId = id;

	Toastify({
	  text: "Connected to server",
	  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
	  className: "info",
	  duration: 3000,
	}).showToast();	
}

// function setGameCode(){
// 	gameState
// }

function updateGameStatus(data){
	console.log(data)
	gameState = data
}