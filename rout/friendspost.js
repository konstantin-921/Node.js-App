const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/friendspost', function(req, res) {
  sendFriendsPosts(req, res);
})

function sendFriendsPosts(req, res) {
  sequelize.query(`SELECT users.name, posts.id, posts.content, posts.date, posts.user_id, posts.title  FROM users RIGHT JOIN posts ON users.id = posts.user_id WHERE posts.user_id IN (SELECT following FROM followers WHERE follower = ${req.body.id})`, {type: sequelize.QueryTypes.SELECT})
    .then((users) => {
       res.json(users);
    })
    .catch((error) => {
      console.log(error);
    })
}