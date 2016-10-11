var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "zombWeapons" to db
var zombWeaponsSchema = new Schema({
  item_name: String,
  description: String,
  rating_damage: { type: Number, min: 0, max: 10 },
  imgur_url: String,
  user_nickname: String
});

//the green text portion is the title of the collection inside the DB = zombWeapons
var zombWeaponModel = mongoose.model('zombWeapons', zombWeaponsSchema);

module.exports = zombWeaponModel;
