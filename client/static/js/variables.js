let IP = 'http://179.213.55.235:3000'

let socket = io(IP + '/')

let app;
let myId;

let gameCode = '';
let myGameState = {};
let gameState = {};



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
let mousePos = {}

let lobbyInterval;

let counter = 0;