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

    setTimeout(function(){
    	const game = document.getElementById('GAME')
    	game.appendChild(app.view);
    }, 1500)
    
    app.loader.load(doneLoading);
    updateMyGame()    
    // keysDiv = document.querySelector("#keys")
}

function updateMyGame() {
	const Interval = setInterval(async () => {
		myGameState.bullets = myBullets
		myMove()

		myGameState.pos.x += vel.x
		myGameState.pos.y += vel.y
		socket.emit('updateClient', {player: myGameState, deadBullets: deadBullets})
		vel = {x: 0, y: 0}
	}, 1000/50)
}

function doneLoading(e) {
	const players = gameState.players

	//Create player for each in lobby
	for (i in players) {

		const newPlayer = createPlayerSheet(i);

		createPlayer(i, players[i], newPlayer); // Pass Id and data of each player
		createScoreBoard(i, players[i]); // Pass data 
		createGun(i); // Pass Id
	}
}

function createPlayerSheet(id){
	const character = 'default'

	const newPlayer = {}
	
	newPlayer.skin = new PIXI.BaseTexture.from(IP + "/imgs/personagens/" + character + "/" + character + '.png')

	let w = 64;
	let h = 64;


	newPlayer['standSouth'] = [
		new PIXI.Texture(newPlayer.skin, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	newPlayer['standWest'] = [
		new PIXI.Texture(newPlayer.skin, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	newPlayer['standEast'] = [
		new PIXI.Texture(newPlayer.skin, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	newPlayer['standNorth'] = [
		new PIXI.Texture(newPlayer.skin, new PIXI.Rectangle(0 * w, 0, w, h))
	]
	newPlayer['dead'] = [
		new PIXI.Texture(newPlayer.skin, new PIXI.Rectangle(0 * w, 0, w, h))
	]

	playerSheet[id] = newPlayer
	return newPlayer
}

function createPlayer(id, data, newPlayer) {
	player[`${id}`] = new PIXI.AnimatedSprite(playerSheet[id].standSouth);
	player[`${id}`].anchor.set(0.5);
	player[`${id}`].animationSpeed = .5
	player[`${id}`].width = sizingObjects(64)
	player[`${id}`].height = sizingObjects(64)
	player[`${id}`].loop = false;
	player[`${id}`].x = app.view.width / 2;
	player[`${id}`].y = app.view.height / 2;

	app.stage.addChild(player[`${id}`]);

	var name = 'guest';
	if (data.name) {
		name = data.name
	}

	player[`${id}`].nameTop = new PIXI.Text(`${name}` , {
	    fontFamily: 'Snippet',
	    fontSize: sizingObjects(14),
	    fill: 'black',
	    align: 'center',
	});

	player[`${id}`].nameTop.position.set(player[`${id}`].x, player[`${id}`].y - 40);
	app.stage.addChild(player[`${id}`].nameTop);
}


function gameLoop(e) {

}


function createGun(n, url = undefined) {
	if (!url){
		url = IP + "/imgs/weapons/scout.png"
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

function createScoreBoard(i, data){
	setTimeout(function(){
			const board = document.getElementById('health')
			const individual = document.createElement('p')
			individual.style.padding = '12px'

			individual.innerHTML = `${(data.name ? data.name : 'guest')} <code id=${i}></code>`
			board.appendChild(individual)
		}, 1500)

}