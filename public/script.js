const gameScreen = document.getElementById('gameScreen')

let canvas, ctx;

function init(){
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(
        512,
        384,
        {view:document.getElementById("canvas")}
    );
    var texture = PIXI.Texture.fromImage("./favicon.png");

    mid = new PIXI.Sprite(texture);
    mid.position.x = 128;
    mid.position.y = 128;
    stage.addChild(mid);

    console.log('salv')
    requestAnimationFrame(update)
}

function update() {
    renderer.render(stage);

    requestAnimationFrame(update);
}

init()
