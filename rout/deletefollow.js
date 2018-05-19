const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/deletefollow', function(req, res) {
  deletefollow(req, res);
})

function deletefollow(req, res) {
  sequelize.query(`DELETE FROM followers WHERE following = '${req.body.id}'`)
  .then((followers) => {
    res.json("Success!");
  })
}