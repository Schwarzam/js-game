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
		startGameLoop(roomName)
		client.join(roomName)

		state[roomName].gameMode = 'PVP'
		clientRooms[client.id] = client.id
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
			client.emit('unknownGame')
			return;
		} else if (numClients > 10) { // Define numero de players
			client.emit('tooManyPlayers')
			return;
		} 
		clientRooms[client.id] = gameCode;

		if (state[gameCode].onGoing) {
			client.emit('tooManyPlayers')
			return;
		}
		client.join(gameCode);
		client.number = numClients + 1;

		var arr = []
		for (let item of io.sockets.adapter.rooms.get(gameCode.trim()).values()){
			io.sockets.sockets.forEach(function(each) {
				if (each.id === item){
					arr.push({[each.id] : each.name});
				}
			})
		}

		io.sockets.in(gameCode)
			.emit('roomPlayers', arr);
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
	const interval = setInterval(() => {

		io.sockets.in(roomName)
			.emit('updateGameStatus', state[roomName]);

	}, 1000/30)
}
