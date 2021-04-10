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
    mid.position.x = 0;
    mid.position.y = 128;
    stage.addChild(mid);

    renderer.render(stage);
}

init()
