const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const routesPost = require('./route/posts');
const routesUsers = require('./route/users');
const routesAuth = require('./route/auth');
const verifytoken = require('./verifytoken');

app.use(verifytoken);
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routesAuth);
app.use(routesUsers);
app.use(routesPost);


// error handling middleware
app.use(function(err, req, res, next) {
  res.send({error: err});
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});