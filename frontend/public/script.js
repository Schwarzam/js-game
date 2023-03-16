const socket = io('/')

function handleGameState(data){
    if (data){
    	var instructions = data
    	
    	for (i in Object.keys(instructions)){
    		walk(instructions[Object.keys(instructions)[i]], Object.keys(instructions)[i])
    		displayHealth(instructions[Object.keys(instructions)[i]], Object.keys(instructions)[i])

    		console.log(instructions[Object.keys(instructions)[i]])
    		if (instructions[Object.keys(instructions)[i]].dead){
				playerDead = true
    			player[`${Object.keys(instructions)[i]}`].textures = playerSheet['dead']
    		}
    	}	
    }
}

let app;
let player = {};
let keys = {};
let keysDiv;
let playerSheet = {}
let geralConstant;
let geralWidth;

let mousePos = {}

function sizingObjects(num){
	return num * geralConstant;
}

function reverseSizingObjects(num){
	return num / geralConstant;
}

function init() {
	sendMousePosition()

	lobby.style.display = "none";
	gameScreen.style.display = "block";

	geralWidth = window.innerWidth < 1500 ? window.innerWidth - window.innerWidth*0.1 : 1350
	geralConstant = geralWidth/1350

	socket.emit('geralConstant', geralConstant)

    app = new PIXI.Application({
        width: geralWidth,
        height: (geralWidth) / 1.66,
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
		createPlayer(Object.keys(players[i])[0], players[i]);
		createScoreBoard(players[i]);
		createGun(Object.keys(players[i])[0]);
	}
	
	app.ticker.add(gameLoop);
}

function createPlayerSheet(){
	let south = new PIXI.BaseTexture.from("/imgs/p_default_frente.png")
	let north = new PIXI.BaseTexture.from("/imgs/p_default_costa.png")
	let east = new PIXI.BaseTexture.from("/imgs/p_default_direita.png")
	let west = new PIXI.BaseTexture.from("/imgs/p_default_esquerda.png")
	let dead = new PIXI.BaseTexture.from("/imgs/dead.png")

	console.log(sizingObjects(64))
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
	playerSheet['dead'] = [
		new PIXI.Texture(dead, new PIXI.Rectangle(0 * w, 0, w, h))
	]
}

function createPlayer(n, data) {
	player[`${n}`] = new PIXI.AnimatedSprite(playerSheet.standSouth);
	player[`${n}`].anchor.set(0.5);
	player[`${n}`].animationSpeed = .5
	player[`${n}`].width = sizingObjects(64)
	player[`${n}`].height = sizingObjects(64)

	player[`${n}`].loop = false;

	player[`${n}`].x = app.view.width / 2;
	player[`${n}`].y = app.view.height / 2;

	app.stage.addChild(player[`${n}`]);


	player[`${n}`].nameTop = new PIXI.Text(`${data[Object.keys(data)[0]]}` , {
	    fontFamily: 'Snippet',
	    fontSize: sizingObjects(14),
	    fill: 'black',
	    align: 'center',
	});
	player[`${n}`].nameTop.position.set(player[`${n}`].x, player[`${n}`].y - 40);

	app.stage.addChild(player[`${n}`].nameTop);
}

function createGun(n, url = undefined) {
	if (!url){
		url = "/imgs/weapons/scout.png"
	}

	let gun = new PIXI.BaseTexture.from(url)

	player[`${n}`].gun = new PIXI.AnimatedSprite([new PIXI.Texture(gun, new PIXI.Rectangle(0, 0, 64, 64))]);
	player[`${n}`].gun.width = sizingObjects(64)
	player[`${n}`].gun.height = sizingObjects(64)
	player[`${n}`].gun.x = player[`${n}`].x 
	player[`${n}`].gun.y = player[`${n}`].y + 10

	player[`${n}`].gun.anchor.set(0.5)
	player[`${n}`].gun.scale.x = -1;

	app.stage.addChild(player[`${n}`].gun);
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
	keys[e.keyCode] = false;
}

let interval = false
function gameLoop(e) {
	if (!playerDead){
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
}

function walk(obj, n){
	if (sizingObjects(obj.pos.x) - player[`${n}`].x > 0){
		player[`${n}`].textures = playerSheet['standEast']
	}
	if (sizingObjects(obj.pos.x) - player[`${n}`].x < 0){
		player[`${n}`].textures = playerSheet['standWest']
	}
	if (sizingObjects(obj.pos.y) - player[`${n}`].y < 0){
		player[`${n}`].textures = playerSheet['standNorth']
	}
	if (sizingObjects(obj.pos.y) - player[`${n}`].y > 0){
		player[`${n}`].textures = playerSheet['standSouth']
	}

	player[`${n}`].x = sizingObjects(obj.pos.x)
	player[`${n}`].y = sizingObjects(obj.pos.y)

	try{
		player[`${n}`].gun.x = player[`${n}`].x
		player[`${n}`].gun.y = player[`${n}`].y 

		player[`${n}`].gun.angle = Math.atan2(obj.mousePos.y - player[`${n}`].y, obj.mousePos.x - player[`${n}`].x) * 180 / Math.PI;

		player[`${n}`].nameTop.position.set(player[`${n}`].x -20, player[`${n}`].y - 40);
	}catch{
		
	}
}

function createScoreBoard(data){
	console.log(data[Object.keys(data)[0]], data)
	const board = document.getElementById('health')
	const individual = document.createElement('p')
	individual.style.padding = '12px'

	individual.innerHTML = `${data[Object.keys(data)[0]]} <code id=${Object.keys(data)[0]}></code>`
	board.appendChild(individual)
}

function displayHealth(data, id){
	// console.log(data)
	document.getElementById(id).innerHTML = data.health
}


