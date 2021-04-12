const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static("frontend/public"));

const { makeid } = require('./server/utils')
const { startGameInterval } = require('./server/gameSocket')
const { gameState, gameLoop } = require('./server/gameState')

state = {};
clientRooms = {};

io.on('connection', client => {
	//NEW GAME
	client.on('newGame', function() {
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = gameState();
	})

	//JOIN GAME
	client.on('joinGame', function(gameCode){
		
	})

	//KEYS PRESSED
	client.on('keyDown', function(keyCode) {
		const vel = moveClient(keyCode);
		if (vel) {
			state.player.vel = vel;
		}
		startGameInterval(client, state);
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