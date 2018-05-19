const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const strategy = require("./strategy.js");
const login = require("./rout/login");
const secret = require("./rout/secret");
const home = require('./rout/home');
const registred = require('./rout/registred');
const newpost = require('./rout/newpost');
const mypost = require('./rout/mypost');
const friendspost = require('./rout/friendspost');
const finduser = require('./rout/finduser');
const follow = require('./rout/follow');
const deletefollow = require('./rout/deletefollow');
let currentUser = '';

app.use(function(req, res, next) {
  let auth = req.get('Authorization');
  const excluded = ['/', '/login', '/secret', '/registred'];

  if(auth && excluded.indexOf(req.url) > -1) {
    let token = auth.substring(7);
    
      jwt.verify(token, 'tasmanianDevil', {ignoreExpiration: false}, function(err, decoded) {
          if(!!(decoded.user)) {
            return next();
          } else if(err) {
            res.status(401).json({message:"token not verify"});
          }
      });
  } else {
    next();
  }
})

app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(login);
app.use(secret);
app.use(home);
app.use(registred);
app.use(newpost);
app.use(mypost);
app.use(friendspost);
app.use(finduser);
app.use(follow);
app.use(deletefollow);

app.post('/teststate', function(req, res) {
  teststate(req, res);
})

app.post('/getusername', function(req, res) {
  getusername(req, res);
})

function teststate(req, res) {
  sequelize.query(`SELECT follower, following FROM followers WHERE follower = '${currentUser}' and following = '${req.body.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((followers) => {
    console.log(followers);
    if(followers[0].follower) {
      res.json(followers);
    } 
  })
  .catch((error) => {
    console.log(error);
  })
}

function getusername(req, res) {
  sequelize.query(`SELECT name FROM users WHERE id = '${req.body.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
}

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});