const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/registred', function (req, res) {
  querySignUp(req, res);
});

function querySignUp(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text, password text, email text, avatar bytea);")
  .then(() => {
    sequelize.query(`INSERT INTO users (name, password, email) VALUES ('${req.body.username}', ${req.body.userpass}, '${req.body.useremail}')`)
    .then((followers) => {
      res.json("Success!");
    })
  })
  .catch((error) => {
    console.log(error);
  })
}
