const socket = io('http://localhost:3000')
socket.on('init', handleInit)

function handleInit(msg){
    console.log(msg)
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

	let w = 150;
	let h = 250;

	playerSheet['standSouth'] = [
		new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
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
	player.x = app.view.width / 2;
	player.y = app.view.height / 2;

	app.stage.appendChild(player);

	player.play();
}


function keysDown(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

function gameLoop() {
	keysDiv.innerHTML = JSON.stringify(keys);

	if (keys["87"]) {
		player.y -= 5;
	}
	if (keys["65"]) {
		player.x -= 5;
	}
	if (keys["68"]) {
		player.x += 5;
	}
	if (keys["83"]) {
		player.y += 5;
	}
}