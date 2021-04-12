const initialScreen = document.getElementById("InitialScreen");
const gameScreen = document.getElementById("gameScreen");
const newGameBtn = document.getElementById('newGameButton')
const joinGameBtn = document.getElementById('joinGameButton')
const gameCodeInput = document.getElementById('gameCodeInput')
const gameCodeDisplay = document.getElementById('gameCodeDisplay')

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);

let playerNumber;

function newGame(){
	socket.emit('newGame')
	init()
}

function joinGame(){
	const code = gameCodeInput.value;
	socket.emit('joinGame', code);
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

function handleGameCode(gameCode){
	gameCodeDisplay.innerText = gameCode
}