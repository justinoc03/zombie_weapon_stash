var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "users" to db
var usersSchema = new Schema({
  first_name: String,
  last_name: String,
  nickname: String,
});

//the green text portion is the title of the collection inside the DB = zombWeapons
var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
