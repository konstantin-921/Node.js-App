const express = require('express');
const router = module.exports = express.Router();
const sequelize = require('../sequelize');

router.get('/posts', function(req, res) {
  sendPosts(req, res);
});

function sendPosts(req, res) {
  let id = req.query.id;
  sequelize.query(`SELECT * FROM posts WHERE user_id = '${id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((posts) => {
    res.json(posts);
  })
  .catch((error) => {
    console.log(error);
  })
}

router.post('/posts', function(req, res) {
  savePost(req, res);
});

function savePost(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS posts (id bigserial PRIMARY KEY, content text, date text, title text, user_id integer);")
  .then(() => {
    sequelize.query(`INSERT INTO posts (content, date, title, user_id) VALUES ('${req.body.postArea}', '${req.body.postDate}', '${req.body.postTitle}', '${req.body.id}')`)
    .then((posts) => {
      res.json("Success!");
    })
  })
  .catch((error) => {
    console.log(error);
  })
}

router.post('/posts/friendsposts', function(req, res) {
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