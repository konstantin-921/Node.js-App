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
  sequelize.query("SELECT login FROM users WHERE id =1 ", {type: sequelize.QueryTypes.SELECT})
  .then(users => {
    for(var i = 0; i < users.length; i++) {
      var log = users[i].login;
    }
    return log;
  })
  .then((log) => {
    if(log === req.body.username) {
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