const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const verifytoken = require('./verifytoken');
const login = require("./rout/login");
const secret = require("./rout/secret");
const registred = require('./rout/registred');
const newpost = require('./rout/newpost');
const mypost = require('./rout/mypost');
const friendspost = require('./rout/friendspost');
const finduser = require('./rout/finduser');
const follow = require('./rout/follow');
const deletefollow = require('./rout/deletefollow');
const teststate = require('./rout/teststate');

app.use(verifytoken);
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(login);
app.use(secret);
app.use(registred);
app.use(newpost);
app.use(mypost);
app.use(friendspost);
app.use(finduser);
app.use(follow);
app.use(deletefollow);
app.use(teststate);

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});