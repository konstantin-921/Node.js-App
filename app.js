var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Sequelize = require('sequelize');

const sequelize = new Sequelize('app', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

var App = sequelize.define('users', {
  name: Sequelize.STRING,
  password: Sequelize.INTEGER
});

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/home', function (req, res) {
  res.send(JSON.stringify("Login successful!"));
});

app.get('/wtf', function (req, res) {
   res.send(JSON.stringify("Error"));
});

app.post('/login', function (req, res) {
   query(req, res);
});

app.post('/registred', function (req, res) {
  querySignUp(req, res);
});

function query(req, res) {
  sequelize.query("SELECT name, password FROM users", {type: sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
    var array = [];
    for(var i = 0; i < users.length; i++) {
      array.push(users[i]);
    }
    return array;
  })
  .then((array) => {
    for(var i = 0; i < array.length; i++){
      if(array[i].name === req.body.username && array[i].password === Number(req.body.userpass)) {
        res.send(JSON.stringify(""));
      }
    }
  })
  .catch((error) => {
    console.log(error);
  })
}

function querySignUp(req, res) {
  sequelize.sync()
  .then(users => {
    console.log(req.body);
    App.create({
      name: req.body.username,
      password: req.body.userpass
    })
  })
  .catch((error) => {
    console.log(error);
  })
}

app.listen(3001, function () {
 console.log('Example app listening on port 3001!');
});