//resize game and all variables to different window widths and heights
function sizingObjects(num){
	return num * geralConstant;
}

function reverseSizingObjects(num){
	return num / geralConstant;
}

//Init the gamescreen
function initGame() {
	geralWidth = window.innerWidth < 1500 ? window.innerWidth - window.innerWidth*0.1 : 1350
	geralConstant = geralWidth/1350

    app = new PIXI.Application({
        width: geralWidth,
        height: (geralWidth) / 1.66,
        backgroundColor: 0xAAAAAA,
    })

    document.getElementById('GAME').appendChild(app.view);
    app.loader.load(doneLoading);

    console.log('game')

    updateMyGame()

    // window.addEventListener("keydown", function(data){
    // 	keysDown(data)
    // 	otherKeys(data)
    // })
    // window.addEventListener("keyup", keysUp)
    // keysDiv = document.querySelector("#keys")
}

function updateMyGame() {
	const Interval = setInterval(() => {
		socket.emit('updateClient', gameState[myId])
	}, 1000/30)
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