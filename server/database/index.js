const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const {User, Role} =  require("./models");

db.user = User
db.role = Role

db.ROLES = ["user", "admin", "moderator"];
db.initial = require('./initial')

module.exports = db;

