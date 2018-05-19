const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/finduser', function(req, res) {
  findUser(req, res);
})

function findUser(req, res) {
  let letter = req.body.letter;
  sequelize.query(`SELECT name, id FROM users WHERE name LIKE '${letter}%'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    console.log(error);
  })
}