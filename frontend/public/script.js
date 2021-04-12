const socket = io('/')
socket.on('gameState', handleInit)

function handleInit(data){
    if (JSON.parse(data).player.pos){
    	walk(JSON.parse(data).player.pos)
    }
}

let app;
let player;
let keys = {};
let keysDiv;

let playerSheet = {}

window.onload = function () {
    app = new PIXI.Application({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
        backgroundColor: 0xAAAAAA,
    })

    document.getElementById('GAME').appendChild(app.view);

    app.loader.add("viking", "./imgs/Sprites.png")
    app.loader.load(doneLoading);

    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)

    keysDiv = document.querySelector("#keys")
}

function doneLoading(e) {
	createPlayerSheet();
	createPlayer();
	app.ticker.add(gameLoop);
}

function createPlayerSheet(){
	let sheet = new PIXI.BaseTexture.from(app.loader.resources["viking"].url)
	sheet.width = 323.5;
	sheet.height = 358.1;

	let w = 70;
	let h = 90;

	playerSheet['standSouth'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	playerSheet['standWest'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
	]
	playerSheet['standEast'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
	]
	playerSheet['standNorth'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
	]
}

function createPlayer() {
	player = new PIXI.AnimatedSprite(playerSheet.standSouth);
	player.anchor.set(0.5);
	player.animationSpeed = .5
	player.loop = false;
	console.log(app.view.width / 2, app.view.height / 2)
	player.x = app.view.width / 2;
	player.y = app.view.height / 2;

	app.stage.addChild(player);
	player.play();
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

function gameLoop() {
	keysDiv.innerHTML = JSON.stringify(keys);

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

function walk(pos){
	player.x = pos.x
	player.y = pos.y
}