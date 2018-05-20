const express = require('express');
const app = module.exports = express();
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const strategy = require("../strategy");

app.post('/login', function (req, res) {
  query(req, res);
});

function query(req, res) {
  sequelize.query(`SELECT * FROM users WHERE name = '${req.body.username}' and password = '${req.body.userpass}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    var user = users[0];
    
    if(user.password === req.body.userpass) {
      let payload = {user: user.id};
      let token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, {expiresIn: '30h'});
      res.json({message: "ok", token: token, userId: user.id});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  })
  .catch((error) => {
    console.log(error);
  })
}