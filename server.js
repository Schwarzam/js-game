const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");

const { makeid } = require("./server/utils")
const { gameState, addPlayer, initGame } = require("./server/gameState")

app.use(express.static("client/static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./server/database");

require('./server/routes/user.routes')(app);
require('./server/routes/auth.routes')(app);

state = {};
clientRooms = {};

io.on('connection', client => {
	
	client.on('connection', function(name) {
		client.token = null;
		client.member = false;
		client.emit('clientId', client.id)
	})

	//NEW GAME
	client.on('createGame', function() {
		let roomName = makeid(6);
		clientRooms[client.id] = roomName;

		//Manda o endereco da sala pra quem criou
		client.emit('gameCode', roomName);

		//Inicia uma sala com um player
		state[roomName] = initGame(client.id)
		
		client.join(roomName)

		state[roomName].gameMode = 'PVP';
		clientRooms[client.id] = roomName;

		playersConnected(roomName)
	})

	//JOIN GAME
	client.on('joinGame', function(gameCode){
		const room = io.sockets.adapter.rooms.get(gameCode.trim());
		let allUsers;
		let numClients;

		if (room){
			numClients = room ? room.size : 0;
		}
		if (numClients === 0 || numClients === undefined ){
			client.emit('error', 'unknownGame')
			return;
		} else if (numClients > 6) { // Define numero de players
			client.emit('error', 'tooManyPlayers')
			return;
		} 
		clientRooms[client.id] = gameCode;

		if (state[gameCode].onGoing) {
			client.emit('error', 'tooManyPlayers')
			return;
		}

		state[gameCode] = addPlayer(state[gameCode], client.id)
		client.join(gameCode);
		client.emit('gameJoined');
	})

	client.on('startGame', function(data){
		const roomName = clientRooms[client.id];
		startGameLoop(roomName);

		client.emit('gameStarted')
	})

	client.on('updateClient', function(data){
		try{
			const roomName = clientRooms[client.id];
			state[roomName].players[client.id] = data
		}catch{
			
		}

	})

	
	client.on('ping', function() {
	    client.emit('pong');
	});
})

io.on('disconnect', client => {
	console.log(client.id)
})

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/client/htmls/index.html");
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


function startGameLoop(roomName){
	clearInterval(state[roomName].interval)
	delete state[roomName].interval

	const interval = setInterval(() => {

		io.sockets.in(roomName)
			.emit('updateGameStatus', state[roomName]);

	}, 1000/50)
}

function playersConnected(roomName){
	state[roomName].interval = setInterval(() => {
		
		io.sockets.in(roomName)
			.emit('updatePlayersLobby', state[roomName]);

	}, 1000)
}
