const express = require("express");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static("public"));

io.on('connection', client => {
  client.emit('init', {data: 'Hello World'})
})

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = http.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
