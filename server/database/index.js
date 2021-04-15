const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const {User, Role} =  require("./models");

db.user = User
db.role = Role

db.ROLES = ["user", "admin", "moderator"];
db.initial = require('./initial')

db.mongoose
  .connect("mongodb+srv://gustavoschwarz:asdflkjh@cluster0.oigo0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    db.initial()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = db;

