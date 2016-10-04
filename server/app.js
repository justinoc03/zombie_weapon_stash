//////////////////////General Server Startup//////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser =  bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 8080;

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});

//require mongoose
var mongoose = require('mongoose');
app.use(bodyParser.json());

// require zombWeaponModel mongodb
var zombWeaponModel = require('./models/zombWeaponModel.js');

// connect to the db with db name = zwsDB
mongoose.connect('mongodb://localhost:27017/zwsDB');

//hit base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('./public/views/index.html'));
});


///////////////////////////Get Items from DB - Get Route////////////////////////////////////////
app.get('/', function(req, res){
  console.log('in getZombWeapons');
  zombWeaponModel.find({}, function(err, zombWeaponResults){
    if(err){
      console.log('error occurred', err);
      res.sendStatus(500);
    } else{
      console.log('zombWeaponResults:', zombWeaponResults);
      res.send(zombWeaponResults);
    }
  });
});


///////////////////////////Add Item to DB - Post Route////////////////////////////////////////
app.post('/addItem', function(req, res){
  console.log('in post route');

  var itemFromUser = req.body;
  console.log(itemFromUser);

  // create newItem
  var newItem = new zombWeaponModel({
    item_name: itemFromUser.item_name,
    description: itemFromUser.description,
    rating_damage: itemFromUser.rating_damage,
  }); // end newItem

  // save newItem
  newItem.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('newItem added to Stash');
      res.sendStatus(201);
    }
  }); // end newItem
}); // end post


// use public
app.use(express.static('public'));



// ///////////////////////////////Test Route/////////////////////////////////
// app.get('/test', function(req, res) {
//   console.log('in test');
//
//   var justinZomb = new zombWeaponModel({
//     item_name: "hammer",
//     description: "it hammers things",
//     rating_damage: 4
//   });
//
//     justinZomb.save(function(err) {
//       if(err){
//         console.log(err);
//         res.sendStatus(500); // nope!
//       }else{
//         console.log('justinZomb saved!');
//         res.sendStatus(201); // 201 - created
//       }
//     });
// });
