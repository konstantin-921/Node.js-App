var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var user = {
   name: 'Chac',
   pass: 1111
}

function checkUser(req, res) {
   if(req.body.username === user.name || req.body.userpass === user.pass) {
      console.log('Ok');
      res.redirect('/home');
   } else {
       res.redirect('/wtf');
   }
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
   res.send('Login successful!');
});

app.get('/wtf', function (req, res) {
   res.send('Login error');
});

app.post('/login', function (req, res) {

   checkUser(req, res);
   console.log(req.body);
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});