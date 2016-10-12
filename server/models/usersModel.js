var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "users" to db
//userRole of 1 = guest
//userRole of 2 = admin
var usersSchema = new Schema({
  first_name: String,
  last_name: String,
  nickname: String, 
  email: String,
  user_role: { type: Number, min: 1, max: 2 },
});

//the green text portion is the title of the collection inside the DB = zombWeapons
var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
