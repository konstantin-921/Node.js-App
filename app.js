var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Sequelize = require('sequelize');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

const sequelize = new Sequelize('app', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

var Users = sequelize.define('users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.TEXT,
  password: Sequelize.INTEGER
})

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


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
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text, password integer);")
  .then(() => {
    sequelize.query("INSERT INTO users (name, password) VALUES ('"+ req.body.username +"', '"+ req.body.userpass +"')")
  })
}

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});