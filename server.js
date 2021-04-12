const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static("frontend/public"));

const { makeid } = require('./server/utils')
// const { startGameInterval } = require('./server/gameSocket')
const { gameState, gameLoop, initGame } = require('./server/gameState')

state = {};
clientRooms = {};

io.on('connection', client => {
	//NEW GAME
	client.on('newGame', function() {

		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame();

		client.join(roomName)
		client.number = 1

		client.emit('init', 1)
	})

	//JOIN GAME
	client.on('joinGame', function(gameCode){
		
		const room = io.sockets.adapter.rooms.get(gameCode);

		let allUsers;
		let numClients;
		if (room){
			numClients = room ? room.size : 0;
		}
		if (numClients === 0){
			console.log(numClients)
			client.emit('unknownGame')
			return;
		} else if (numClients > 2) { // Define numero de players
			client.emit('tooManyPlayers')
			return;
		} 
		clientRooms[client.id] = gameCode;
		client.join(gameCode);
		client.number = numClients + 1;
		client.emit('init', 2)

		startGameInterval(gameCode)
	})

	//KEYS PRESSED
	client.on('keyDown', function(keyCode) {
		const roomName = clientRooms[client.id];
		const vel = moveClient(keyCode);
		if (vel) {
			state[roomName].players[client.number - 1].vel = vel;
		}
		startGameInterval(roomName);
	})

	client.on('ping', function() {
	    client.emit('pong');
	});
})

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/frontend/views/index.html");
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function moveClient(keyCode){
	try{
		keyCode = parseInt(keyCode)
	}catch(e){
		console.error(e)
		return;
	}

	switch (keyCode) {
		case 87: { // W up
			return { x: 0, y: -5 }
		}
		case 65: { //A left
			return { x: -5, y: 0 }
		}
		case 68: { //D right
			return { x: 5, y: 0 }
		}
		case 83: { // S down
			return { x: 0, y: 5 }
		}
	}
}


function startGameInterval(roomName) {
	const game = gameLoop(state[roomName]);
	console.log(state)
	emitGameState(roomName, state[roomName])
	state.roomName = null;
}

function emitGameState(roomName, state){
	io.sockets.in(roomName)
		.emit('gameState', JSON.stringify(state));
}