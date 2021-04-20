function createNewGame(){
	socket.emit('createGame')
	redirectPage('playersLobby')
}



function joinGame(){

}