const socket = io('/')


function handleGameState(data){
    if (JSON.parse(data).players){
    	var instructions = JSON.parse(data).players
    	
    	for (i in Object.keys(instructions)){
    		walk(instructions[Object.keys(instructions)[i]].pos, Object.keys(instructions)[i])
    	}	
    }
}

let app;
let player = {};
let keys = {};
let keysDiv;
let playerSheet = {}

function init() {
	lobby.style.display = "none";
	gameScreen.style.display = "block";

    app = new PIXI.Application({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
        backgroundColor: 0xAAAAAA,
    })

    document.getElementById('GAME').appendChild(app.view);
    app.loader.load(doneLoading);

    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)

    keysDiv = document.querySelector("#keys")
}

function doneLoading(e) {
	createPlayerSheet();

	//Create player for each in lobby
	for (i in players) {
		createPlayer(Object.keys(players[i])[0]);
	}

	app.ticker.add(gameLoop);
}

function createPlayerSheet(){
	let sheet = new PIXI.BaseTexture.from("/imgs/pixel_person.png")

	let w = 55;
	let h = 55;

	playerSheet['standSouth'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standWest'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standEast'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standNorth'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
	]
}

function createPlayer(n) {
	player[`${n}`] = new PIXI.AnimatedSprite(playerSheet.standSouth);
	player[`${n}`].anchor.set(0.5);
	player[`${n}`].animationSpeed = .5
	player[`${n}`].loop = false;

	player[`${n}`].x = app.view.width / 2;
	player[`${n}`].y = app.view.height / 2;

	app.stage.addChild(player[`${n}`]);
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

let interval = false
function gameLoop(e) {
	keysDiv.innerHTML = JSON.stringify(keys);

	// if (keys["87"] && keys["68"]){
	// 	socket.emit('keyDown', 87)
	// }
	if (keys["87"]) {
		socket.emit('keyDown', 87)
	}
	if (keys["65"]) {
		socket.emit('keyDown', 65)
	}
	if (keys["68"]) {
		socket.emit('keyDown', 68)
	}
	if (keys["83"]) {
		socket.emit('keyDown', 83)
	}

	updateBullets()
}

function walk(pos, n){
	player[`${n}`].x = pos.x
	player[`${n}`].y = pos.y
}