const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.get('/friendspost', function(req, res) {
  sendFriendsPosts(req, res);
})

function sendFriendsPosts(req, res) {
  sequelize.query(`SELECT *  FROM posts WHERE user_id IN (SELECT following FROM followers WHERE follower = ${currentUser})`, {type: sequelize.QueryTypes.SELECT})
    .then((users) => {
       res.json(users);
    })
    .catch((error) => {
      console.log(error);
    })
}