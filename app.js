var _ = require("lodash");
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


const sequelize = new Sequelize('app', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  sequelize.query(`SELECT * FROM users WHERE id = '${jwt_payload.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    var user = users[0];
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
   });
  });

passport.use(strategy);


app.use(passport.initialize());

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});

app.post('/registred', function (req, res) {
  querySignUp(req, res);
});

function query(req, res) {
  sequelize.query(`SELECT * FROM users WHERE name = '${req.body.username}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {

    var user = users[0];
   
    if(user.password === req.body.userpass) {
      var payload = {user: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token: token});
    // console.log(token);
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  })
  .catch((error) => {
    console.log(error);
  })
}

function querySignUp(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text, password text);")
  .then(() => {
    sequelize.query(`INSERT INTO users (name, password) VALUES ('${req.body.username}', ${req.body.userpass})`)
  })
}

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});