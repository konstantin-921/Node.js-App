const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');


app.post('/mypost', function(req, res) {
  sendPosts(req, res);
})

function sendPosts(req, res) {
  sequelize.query(`SELECT * FROM posts WHERE user_id = '${req.body.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((posts) => {
    res.json(posts);
  })
  .catch((error) => {
    console.log(error);
  })
}