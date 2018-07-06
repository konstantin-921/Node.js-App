const express = require('express');
const router = module.exports = express.Router();
const sequelize = require('../models/sequelize');
const models = require('../models/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/posts', function (req, res, next) {
  models.Posts.findAll({
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
  models.Posts.create({
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
  models.Followers.findAll({
    attributes: ['following'],
    where: {
      follower: req.query.id
    }
  }).then(response => {
    const followers = response.map(follower => follower.dataValues.following);
    models.Users.findAll({
      attributes: ['name'],
      include: [
        {
          model: models.Posts,
          as: 'message',
          where: {
            'user_id': {
              [Op.in]: followers
            }
          }
        },
      ],
    })
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        next(error);
      })

  })
})