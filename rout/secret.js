const express = require('express');
const app = module.exports = express();
const passport = require('passport');

app.post('/secret', passport.authenticate('jwt', { session: false}), function(req, res){
  res.json("Success! You can not see this without a token");
});