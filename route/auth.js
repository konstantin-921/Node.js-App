const express = require('express');
const router = module.exports = express.Router();
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const strategy = require("../strategy");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/auth/login', function (req, res) {
  query(req, res);
});

function query(req, res, next) {
  let username = req.query.username;
  let userpass = req.query.userpass;
  sequelize.query(`SELECT * FROM users WHERE name = '${username}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    var user = users[0];
    let hash = bcrypt.compareSync(userpass, user.password);
    
    if(hash && user.name === username) {
      let payload = {user: user.id};
      let token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, {expiresIn: '30h'});
      res.json({message: "ok", token: token, userId: user.id});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  })
  .catch((error) => {
    console.log(error);
    res.json({message:"Такого пользователя не существует"});
    // throw new Error ("Такого пользователя не существует");
  })
}



router.post('/auth/secret', passport.authenticate('jwt', { session: false}), function(req, res){
  res.json("Success! You can not see this without a token");
});
