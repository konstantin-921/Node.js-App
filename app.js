var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

function query(req, res) {
  sequelize.query("SELECT login, password FROM users WHERE id =1 ", {type: sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
    for(var i = 0; i < users.length; i++) {
      var log = users[i].login;
      var pass = users[i].password;
    }
    var array = [];
    array.push(log, pass)
    return array;
  })
  .then((array) => {
    if(array[0] === req.body.username && array[1] === Number(req.body.userpass)) {
      console.log('Go');
      res.send(JSON.stringify("Login successful!"))
   }
  })
  .catch(() => {
    console.log('Error');
    res.send(JSON.stringify("Login NOT successful!"))
  })
}

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
 res.send('Hello World!');
});

app.get('/home', function (req, res) {
  res.send(JSON.stringify("Login successful!"));
});

app.get('/wtf', function (req, res) {
   res.send(JSON.stringify("Login error"));
});

app.post('/login', function (req, res) {
   query(req, res);
   console.log(req.body);
});
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});