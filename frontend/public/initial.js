const initialScreen = document.getElementById("InitialScreen");
const gameScreen = document.getElementById("gameScreen");
const newGameBtn = document.getElementById('newGameButton')
const joinGameBtn = document.getElementById('joinGameButton')
const gameCodeInput = document.getElementById('gameCodeInput')
const gameCodeDisplay = document.getElementById('gameCodeDisplay')
const lobby = document.getElementById('lobby')
const lobbyPlayers = document.getElementById('lobbyPlayers')
const startGameButton = document.getElementById('startGame')
const insertName = document.getElementById('InsertName')
const insertNameButton = document.getElementById('insertNameButton')
const gameNameInput = document.getElementById('gameNameInput')

insertNameButton.addEventListener('click', insertNameGo);

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
startGameButton.addEventListener('click', askStartGame);

let playerNumber;
let gameCode;
let name;

let players = [];

function insertNameGo(){
	name = gameNameInput.value.trim();
	socket.emit('clientName', name)
	insertName.style.display = "none";
	initialScreen.style.display = "block";
}

function newGame(){
	socket.emit('newGame')
	initialScreen.style.display = "none";
	lobby.style.display = "block";
}

function joinGame(){
	const code = gameCodeInput.value.trim();
	socket.emit('joinGame', code);
	initialScreen.style.display = "none";
	lobby.style.display = "block";

	gameCode = code
}

function handleRoomPlayers(clients){
	players = []
	lobbyPlayers.innerHTML = '';
	for (i in clients){
		const element = document.createElement('p')
		element.innerHTML = clients[i]
		lobbyPlayers.appendChild(element)
		players.push(clients[i])
	}
}

function askStartGame(){
	socket.emit('gameStatus', gameCode);
}

function handleStartGame(){
	init()
}

// PING
var startTime;
setInterval(function() {
  startTime = Date.now();
  socket.emit('ping');
}, 2000);

socket.on('pong', function() {
  latency = Date.now() - startTime;
  document.getElementById('ping').innerHTML = latency.toString() + 'ms';
});


function handleInit(number){
	playerNumber = number;
}

function handleGameCode(gameCodeGet){
	gameCode = gameCodeGet
	gameCodeDisplay.innerText = gameCode
}