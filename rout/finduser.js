const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/finduser', function(req, res) {
  findUser(req, res);
})

function findUser(req, res) {
  let letter = req.body.letter;
  let id = req.body.id;
  sequelize.query(`SELECT name, id FROM users WHERE name LIKE '${letter}%' and NOT id = '${id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    console.log(error);
  })
}