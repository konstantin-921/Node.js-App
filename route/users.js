const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/users', function (req, res, next) {
  hash(req, res, next);
});

function hash(req, res, next) {
  let passwordFromUser = req.body.userpass;
  let salt = bcrypt.genSaltSync(10);
  let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.userpass = passwordToSave;
  addUser(req, res, next);
}

function addUser(req, res, next) {
  models.Users.findAll({
    where: { name: `${req.body.username}` },
  })
    .then((users) => {
      if (users[0] === undefined) {
        Users.create({
          password: req.body.userpass,
          name: req.body.username,
          email: req.body.useremail,
        })
          .then(() => { res.json("Successful registration!") })
          .catch((error) => {
            next(error);
          })
      } else {
        res.json({ error: 'This user already exists' });
      }
    })
    .catch((error) => {
      next(error);
    })
}

router.get('/followers', function (req, res, next) {
  let letter = req.query.letter;
  models.Users.findAll({
    attributes: ['name', 'id'],
    where: {
      name: { [Op.iLike]: `%${letter}%` },
      id: { [Op.not]: req.query.id },
    },
    raw: true,
  })
    .then((users) => {
      if (letter) {
        res.json(users);
      } else {
        const users = [];
        res.json(users);
      }
    })
    .catch((error) => {
      next(error);
    })
})

router.post('/followers', function (req, res, next) {
  models.Followers.create({ following: req.body.id, follower: req.body.userId })
    .then(() => { res.json("Success!") })
    .catch((error) => {
      next(error);
    })
})

router.delete('/followers', function (req, res, next) {
  models.Followers.destroy({ where: { following: req.body.id, follower: req.body.userId }, raw: true })
    .then(() => { res.json("Success delete!") })
    .catch((error) => {
      next(error);
    })
})

router.get('/followers/teststate', function (req, res, next) {
  models.Followers.findAll({
    attributes: ['follower', 'following'],
    raw: true,
  })
    .then((followers) => { res.json(followers) })
    .catch((error) => {
      next(error);
    })
})

