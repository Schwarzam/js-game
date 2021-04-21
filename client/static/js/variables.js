let IP = 'http://179.213.55.235:3000'

let socket = io(IP + '/')

let app;
let myId;

let gameCode = '';
let myGameState = {};
let gameState = {};


let vel = {x: 0, y: 0};
let player = {};
let bullets = {};
let myBullets = {}
let deadBullets = []

let lastFire = 0;

let keys = {};
let keysDiv;
let playerSheet = {}
let geralConstant;
let geralWidth;
let mousePos = {x: 0, y: 0};

let lobbyInterval;

let counter = 0;