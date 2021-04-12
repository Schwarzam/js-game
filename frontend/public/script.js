const socket = io('/')


function handleGameState(data){
    if (JSON.parse(data).players){
    	walk(JSON.parse(data).players[0].pos, 0)
    }if (JSON.parse(data).players[1]){
    	walk(JSON.parse(data).players[1].pos, 1)
    }
}


let app;
let player = {};
let keys = {};
let keysDiv;
let playerSheet = {}

function init() {
	initialScreen.style.display = "none";
	gameScreen.style.display = "block";

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
	createPlayer(0);
	createPlayer(1);
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

function walk(pos, n){
	player[`${n}`].x = pos.x
	player[`${n}`].y = pos.y
}