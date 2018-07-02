const express = require('express');
const router = module.exports = express.Router();
const sequelize = require('../models/sequelize');
const { Posts, Users, Followers } = require('../models/models');
// const Sequelize = require('sequelize');

router.get('/posts', function (req, res, next) {
  Posts.findAll({
    where: {
      user_id: req.query.id,
    }
  })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      next(error);
    })
});

router.post('/posts', function (req, res, next) {
  Posts.create({
    content: req.body.postArea,
    date: req.body.postDate,
    title: req.body.postTitle,
    user_id: req.body.id,
  })
    .then(() => {
      res.json("Post successfully saved!");
    })
    .catch((error) => {
      next(error);
    })
});

router.get('/posts/friendsposts', function (req, res, next) {
  // Users.findAll({
  //   include: [Posts]
  // })
  //   .then(users => {
  //     res.json(users);
  //   })
  //   .catch(error => {
  //     next(error);
  //   })
  sendFriendsPosts(req, res, next);
})

async function sendFriendsPosts(req, res, next) {
  try {
    let id = req.query.id;
    let data = await sequelize.query(`SELECT users.name, posts.id, posts.content, posts.date, posts.user_id, posts.title  FROM users RIGHT JOIN posts ON users.id = posts.user_id WHERE posts.user_id IN (SELECT following FROM followers WHERE follower = ?)`, { replacements: [id], type: sequelize.QueryTypes.SELECT });
    res.json(data);
  } catch (error) {
    next(error);
  }
}