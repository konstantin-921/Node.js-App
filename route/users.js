const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require('../models/sequelize');

router.post('/users', function (req, res) {
  hash(req,res);
});

function hash(req, res) {
  let passwordFromUser = req.body.userpass;
  let salt = bcrypt.genSaltSync(10);
  let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.userpass = passwordToSave;
  addUser(req, res);
}

function addUser(req, res) {
    sequelize.query(`INSERT INTO users (password, name, email) VALUES (:userpass, :username, :useremail)`, {replacements: {userpass: req.body.userpass, username: req.body.username, useremail: req.body.useremail}})
    .then((followers) => {
      res.json("Successful registration!");
  })
  .catch((error) => {
    console.log(error);
  })
}



router.get('/followers', function(req, res) {
  findUser(req, res);
})

function findUser(req, res) {
  let id = req.query.id;
  let letter = req.query.letter;
  sequelize.query(`SELECT name, id FROM users WHERE name ILIKE :search and NOT id = :id`, {replacements: {search : `${letter}%`, id: id}, type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    console.log(error);
  })
}



router.post('/followers', function(req, res) {
  followUser(req, res);
})

function followUser(req, res) {
      sequelize.query(`INSERT INTO followers (follower, following) VALUES (:follower, :following)`, {replacements: {follower: req.body.userId, following: req.body.id}})
      .then((followers) => {
        res.json("Success!");
  })
  .catch((error) => {
    console.log('Error');
  })
}



router.delete('/followers', function(req, res) {
  deletefollow(req, res);
})

function deletefollow(req, res) {
  sequelize.query(`DELETE FROM followers WHERE following = :following and follower = :follower`, {replacements: {following: req.body.id, follower: req.body.userId}})
  .then((followers) => {
    res.json("Success!");
  })
}



router.get('/followers/teststate', function(req, res) {
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

