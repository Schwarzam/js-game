const socket = io('/')


function handleGameState(data){
    if (data){
    	var instructions = JSON.parse(data)
    	
    	for (i in Object.keys(instructions)){
    		walk(instructions[Object.keys(instructions)[i]], Object.keys(instructions)[i])
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
	// createGun()

	app.ticker.add(gameLoop);
}

function createPlayerSheet(){
	let south = new PIXI.BaseTexture.from("/imgs/p_default_frente.png")
	let north = new PIXI.BaseTexture.from("/imgs/p_default_costa.png")
	let east = new PIXI.BaseTexture.from("/imgs/p_default_direita.png")
	let west = new PIXI.BaseTexture.from("/imgs/p_default_esquerda.png")

	let w = 64;
	let h = 64;

	playerSheet['standSouth'] = [
		new PIXI.Texture(south, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standWest'] = [
		new PIXI.Texture(west, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standEast'] = [
		new PIXI.Texture(east, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standNorth'] = [
		new PIXI.Texture(north, new PIXI.Rectangle(0 * w, 0, w, h))
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

function createGun() {
	let gun = new PIXI.BaseTexture.from("/imgs/scout.png")

	let gun1 = new PIXI.AnimatedSprite([new PIXI.Texture(gun, new PIXI.Rectangle(0, 0, 64, 64))]);
	console.log(myId)
	gun1.x = player[myId].x 
	gun1.y = player[myId].y

	app.stage.addChild(gun1);
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
}

function walk(obj, n){
	if (obj.pos.x - player[`${n}`].x > 0){
		player[`${n}`].textures = playerSheet['standEast']
	}
	if (obj.pos.x - player[`${n}`].x < 0){
		player[`${n}`].textures = playerSheet['standWest']
	}
	if (obj.pos.y - player[`${n}`].y < 0){
		player[`${n}`].textures = playerSheet['standNorth']
	}
	if (obj.pos.y - player[`${n}`].y > 0){
		player[`${n}`].textures = playerSheet['standSouth']
	}

	player[`${n}`].x = obj.pos.x
	player[`${n}`].y = obj.pos.y

}