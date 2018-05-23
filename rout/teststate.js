const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/teststate', function(req, res) {
  teststate(req, res);
})

function teststate(req, res) {
  sequelize.query(`SELECT follower, following FROM followers`, {type: sequelize.QueryTypes.SELECT})
  .then((followers) => {
      res.json(followers);
  })
  .catch((error) => {
    console.log(error);
  })
}