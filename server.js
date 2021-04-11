const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static("frontend/public"));

const { startGameInterval } = require('./server/gameSocket')
const { gameState, gameLoop } = require('./server/gameState')

io.on('connection', client => {
	const state = gameState();
	
	startGameInterval(client, state);
})

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/frontend/views/index.html");
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});