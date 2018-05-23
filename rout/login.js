const express = require('express');
const app = module.exports = express();
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const strategy = require("../strategy");
const bcrypt = require('bcrypt');

app.post('/login', function (req, res) {
  query(req, res);
});

function query(req, res) {
  sequelize.query(`SELECT * FROM users WHERE name = '${req.body.username}' and password = '${req.body.userpass}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    var user = users[0];
    
    let salt = bcrypt.genSaltSync(10);
    console.log(bcrypt.hashSync(req.body.userpass, salt));
     
    
    
    if(user.password === req.body.userpass && user.name === req.body.username) {
      let payload = {user: user.id};
      let token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, {expiresIn: '30h'});
      res.json({message: "ok", token: token, userId: user.id});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  })
  .catch((error) => {
    res.json({message:"Такого пользователя не существует"});
    console.log(error);
  })
}