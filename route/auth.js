const express = require('express');
const router = module.exports = express.Router();
const jwt = require('jsonwebtoken');
const sequelize = require('../models/sequelize');
const strategy = require("../api/services/strategy");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/auth/login', function (req, res, next) {
  query(req, res, next);
});

async function query(req, res, next) {
  try {
    let username = req.query.username;
    let userpass = req.query.userpass;
    let data = await sequelize.query(`SELECT * FROM users WHERE name = :name`, { replacements: { name: username }, type: sequelize.QueryTypes.SELECT });
    let user = data[0];
    let hash = bcrypt.compareSync(userpass, user.password);

    if (hash && user.name === username) {
      let payload = { user: user.id };
      let token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, { expiresIn: '30h' });
      res.json({ message: "ok", token: token, userId: user.id });
    } else {
      res.json({ message: "Password is incorrect" });
    }
  } catch (error) {
    res.json({ message: "This user does not exist" });
    next(error);
  }
}



router.post('/auth/secret', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  try {
    res.json("Success! You can not see this without a token");
  } catch (error) {
    next(error);
  }
});
