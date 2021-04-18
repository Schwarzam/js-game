const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static("client/static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./server/database");

require('./server/routes/auth.routes')(app);
require('./server/routes/user.routes')(app);

state = {};
clientRooms = {};

io.on('connection', client => {

	client.on('clientName', function(name) {
		client.name = name;
		client.token = null;
		client.member = false;

		client.emit('clientId', client.id)
	})

	//NEW GAME
	client.on('newGame', function() {
		console.log(client.id)
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame(client.id);
		client.join(roomName)

		state[roomName].gameMode = 'PVP'

		io.sockets.in(roomName)
			.emit('roomPlayers', [{[client.id]: client.name}]);
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
  response.sendFile(__dirname + "/frontend/views/index.html");
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
