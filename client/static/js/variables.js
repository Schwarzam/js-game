let IP = 'http://localhost:3000'

let socket = io(IP + '/')

let app;
let myId;

let gameCode = '';
let myGameState = {};
let gameState = {};

let player = {};
let bullets = {};
let myBullets = {}

let keys = {};
let keysDiv;
let playerSheet = {}
let geralConstant;
let geralWidth;
let mousePos = {}

let lobbyInterval;

let counter = 0;