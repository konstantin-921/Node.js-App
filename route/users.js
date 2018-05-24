const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

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
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id bigserial PRIMARY KEY, password text, name text,  email text, avatar bytea);")
  .then(() => {
    sequelize.query(`INSERT INTO users (password, name, email) VALUES ('${req.body.userpass}', '${req.body.username}', '${req.body.useremail}')`)
    .then((followers) => {
      res.json("Successful registration!");
    })
  })
  .catch((error) => {
    console.log(error);
  })
}



router.get('/users/search', function(req, res) {
  findUser(req, res);
})

function findUser(req, res) {
  let id = req.query.id;
  let letter = req.query.letter;
  sequelize.query(`SELECT name, id FROM users WHERE name ILIKE '${letter}%' and NOT id = '${id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    console.log(error);
  })
}



router.post('/users/search', function(req, res) {
  followUser(req, res);
})

function followUser(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS followers (id bigserial, follower integer, following integer, PRIMARY KEY(follower, following), FOREIGN KEY(follower) REFERENCES users(id), FOREIGN KEY(following) REFERENCES posts(id));")
  .then((followers) => {
      sequelize.query(`INSERT INTO followers (follower, following) VALUES ('${req.body.userId}', '${req.body.id}')`)
      .then((followers) => {
        res.json("Success!");
      })
  })
  .catch((error) => {
    console.log('Error');
  })
}



router.delete('/users/search', function(req, res) {
  deletefollow(req, res);
})

function deletefollow(req, res) {
  sequelize.query(`DELETE FROM followers WHERE following = '${req.body.id}' and follower = '${req.body.userId}'`)
  .then((followers) => {
    res.json("Success!");
  })
}



router.get('/users/search/teststate', function(req, res) {
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

