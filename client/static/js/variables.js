let IP = 'http://localhost:3000'

let socket = io(IP + '/')

let app;
let myId;

let gameState = {};


let keys = {};
let keysDiv;
let playerSheet = {}
let geralConstant;
let geralWidth;
let mousePos = {}