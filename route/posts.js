const express = require('express');
const router = module.exports = express.Router();
const sequelize = require('../models/sequelize');

router.get('/posts', function(req, res, next) {
  sendPosts(req, res, next);
});

async function sendPosts(req, res, next) {
  try {
    let id = req.query.id;
    let data = await sequelize.query(`SELECT * FROM posts WHERE user_id = ?`, {replacements: [id], type: sequelize.QueryTypes.SELECT});
    res.json(data);
  } catch(error) {
    next();
  }
}

router.post('/posts', function(req, res,next) {
  savePost(req, res, next);
});

async function savePost(req, res, next) {
  try {  
    await sequelize.query(`INSERT INTO posts (content, date, title, user_id) VALUES (:text, :date, :title, :id)`, {replacements: {text: req.body.postArea, date: req.body.postDate, title: req.body.postTitle, id: req.body.id}});
    res.json("Post successfully saved!")
  } catch(error) {
    next();
  }
}

router.get('/posts/friendsposts', function(req, res, next) {
  sendFriendsPosts(req, res, next);
})

async function sendFriendsPosts(req, res, next) {
  try {
    let id = req.query.id;
    let data = await sequelize.query(`SELECT users.name, posts.id, posts.content, posts.date, posts.user_id, posts.title  FROM users RIGHT JOIN posts ON users.id = posts.user_id WHERE posts.user_id IN (SELECT following FROM followers WHERE follower = ?)`, {replacements: [id], type: sequelize.QueryTypes.SELECT});
      res.json(data);
  } catch(error){
    next();
  }
}