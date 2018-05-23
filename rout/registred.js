const express = require('express');
const app = module.exports = express();
const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

app.post('/registred', function (req, res) {
  // hash(req,res);
  querySignUp(req, res);
});

function hash(req, res) {
  let passwordFromUser = req.body.userpass;
  let salt = bcrypt.genSaltSync(10);
  let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.userpass = passwordToSave;
  querySignUp(req, res);
}

function querySignUp(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id bigserial PRIMARY KEY, password text, name text,  email text, avatar bytea);")
  .then(() => {
    sequelize.query(`INSERT INTO users (password, name, email) VALUES ('${req.body.userpass}', '${req.body.username}', '${req.body.useremail}')`)
    .then((followers) => {
      res.json("Successful registration!");
    })
  })
  .catch((error) => {
    console.log(error);
  })
}
