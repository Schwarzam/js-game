const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static("frontend/public"));

const { makeid } = require('./server/utils')
// const { startGameInterval } = require('./server/gameSocket')
const { gameState, gameLoop, initGame, addPlayer } = require('./server/gameState')

state = {};
clientRooms = {};

io.on('connection', client => {
	
	client.on('clientName', function(name) {
		client.name = name;
		client.emit('clientId', client.id)
	})

	//NEW GAME
	client.on('newGame', function() {
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame(client.id);
		client.join(roomName)
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

		state[gameCode] = addPlayer(state[gameCode], client.id)

		console.log(state[gameCode].players)
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

	// client.on('geralConstant', function(geralConstant){
	// 	const roomName = clientRooms[client.id];
	// 	state[roomName].players[client.id].widthConst = geralConstant
	// })

	client.on('fireBullet', function(bullet){
		firingBullet(bullet, client)
	})

	client.on('gameStatus', function(code){
		state[code].onGoing = true
		io.sockets.in(code)
			.emit('startGame', 'start');

		startGameInterval(code);
	})

	//KEYS PRESSED 
	client.on('keyDown', function(keyCode) {
		const roomName = clientRooms[client.id];
		const vel = moveClient(keyCode);
		if (vel) {
			try{
				if (state[roomName].players[client.id].vel.x === 0){
					state[roomName].players[client.id].vel.x += vel.x;
				}
				if (state[roomName].players[client.id].vel.y === 0){
					state[roomName].players[client.id].vel.y += vel.y;
				}
				if (state[roomName].players[client.id].vel.x !== 0 && state[roomName].players[client.id].vel.y !== 0){
					state[roomName].players[client.id].vel.x = state[roomName].players[client.id].vel.x/1.4
					state[roomName].players[client.id].vel.y = state[roomName].players[client.id].vel.y/1.4
				}
			}catch(err){
				console.log(err)
			}
		}
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
	const intervalId = setInterval(() => {
		const game = gameLoop(state[roomName]);
		emitGameState(roomName, state[roomName]);
		updateBullets(roomName)
	}, 1000 / 50)
}

function emitGameState(roomName){
	io.sockets.in(roomName)
		.emit('gameState', state[roomName].players);

	if (Object.keys(state[roomName].bullets.newBullets).length > 0){
		io.sockets.in(roomName)
			.emit('newBullets', state[roomName].bullets.newBullets)
		state[roomName].bullets.newBullets = {}
	}
}

function firingBullet(bullet, client){
	const roomName = clientRooms[client.id];

	const a = Math.atan2(bullet.mouseY - y, bullet.mouseX - x);
	const id = state[roomName].bullets.numBullets

	console.log(state[roomName].players[client.id])

	newBullet = {
					id: id,
					angle: a * 180/Math.PI, 
					posX: x + Math.cos(a) * 30,
					posY: y + Math.sin(a) * 30,
					speedX: Math.cos(a) * 7,
					speedY: Math.sin(a) * 7,
				}

	console.log(newBullet, bullet, state[roomName].players[client.id].pos)

	state[roomName].bullets.newBullets[state[roomName].bullets.numBullets] = newBullet
	state[roomName].bullets.bullets[state[roomName].bullets.numBullets] = newBullet
	state[roomName].bullets.numBullets = state[roomName].bullets.numBullets + 1
}


function updateBullets(roomName){

	const keys = Object.keys(state[roomName].bullets.bullets)
	for (i in keys){

		if(state[roomName].bullets.bullets[keys[i]].dead){
				delete state[roomName].bullets.bullets[keys[i]]

		}else if (state[roomName].bullets.bullets[keys[i]].posX > 1600 || state[roomName].bullets.bullets[keys[i]].posX < -100){
			state[roomName].bullets.bullets[keys[i]].dead = true
		}else if (state[roomName].bullets.bullets[keys[i]].posY > 1600 || state[roomName].bullets.bullets[keys[i]].posY < -100){
			state[roomName].bullets.bullets[keys[i]].dead = true
		}else{
			state[roomName].bullets.bullets[keys[i]].posX += state[roomName].bullets.bullets[keys[i]].speedX;
			state[roomName].bullets.bullets[keys[i]].posY += state[roomName].bullets.bullets[keys[i]].speedY;
			
			checkIfHit(roomName, state[roomName].bullets.bullets[keys[i]].posX, state[roomName].bullets.bullets[keys[i]].posY, keys[i])
		}

		
	}
	io.sockets.in(roomName)
			.emit('bulletsState', state[roomName].bullets.bullets)
}

function checkIfHit(roomName ,BulletPosx, BulletPosy, BulletId){

	for (i in Object.keys(state[roomName].players)){
		if (BulletPosx > state[roomName].players[Object.keys(state[roomName].players)[i]].pos.x - 13 && BulletPosx < state[roomName].players[Object.keys(state[roomName].players)[i]].pos.x + 13 && BulletPosy > state[roomName].players[Object.keys(state[roomName].players)[i]].pos.y -32 && BulletPosy < state[roomName].players[Object.keys(state[roomName].players)[i]].pos.y + 32){
			state[roomName].players[Object.keys(state[roomName].players)[i]].health -= 10
			state[roomName].bullets.bullets[BulletId].dead = true
		}
		
		// state.players[Object.keys(state.players)[i]].pos.y
		// state.players[Object.keys(state.players)[i]].vel = {x: 0, y: 0}
	}
}