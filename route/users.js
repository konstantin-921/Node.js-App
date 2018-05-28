const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require('../models/sequelize');

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

async function addUser(req, res, next) {
  try {  
    let search = await sequelize.query(`SELECT *  FROM users WHERE name = '${req.body.username}' `, { type: sequelize.QueryTypes.SELECT });
    if(search[0] === undefined) {
      let data = await sequelize.query(`INSERT INTO users (password, name, email) VALUES (:userpass, :username, :useremail)`, {replacements: {userpass: req.body.userpass, username: req.body.username, useremail: req.body.useremail}});
      res.json("Successful registration!");
    } else {
      res.json({error: 'Такой пользователь уже существует'});
    }
  } catch(error){
    next(error);
  }
}



router.get('/followers', function(req, res, next) {
  findUser(req, res, next);
})

async function findUser(req, res, next) {
  try {
    let id = req.query.id;
    let letter = req.query.letter;
    let data = await sequelize.query(`SELECT name, id FROM users WHERE name ILIKE :search and NOT id = :id`, {replacements: {search : `${letter}%`, id: id}, type: sequelize.QueryTypes.SELECT});
    res.json(data);
  } catch(error) {
    next(error);
  }
}



router.post('/followers', function(req, res,next) {
  followUser(req, res, next);
})

async function followUser(req, res, next) {
  try {
    await sequelize.query(`INSERT INTO followers (follower, following) VALUES (:follower, :following)`, {replacements: {follower: req.body.userId, following: req.body.id}});
    res.json("Success!");
  } catch(error) {
    next(error);
  }
}



router.delete('/followers', function(req, res, next) {
  deletefollow(req, res, next);
})

async function deletefollow(req, res, next) {
  try {
    await sequelize.query(`DELETE FROM followers WHERE following = :following and follower = :follower`, {replacements: {following: req.body.id, follower: req.body.userId}});
    res.json("Success!");
  } catch(error) {
    next(error);
  }
}



router.get('/followers/teststate', function(req, res, next) {
  teststate(req, res, next);
})

async function teststate(req, res, next) {
  try {
    let data = await sequelize.query(`SELECT follower, following FROM followers`, {type: sequelize.QueryTypes.SELECT});
    res.json(data);
  } catch(error){
    next(error);
  }
}

