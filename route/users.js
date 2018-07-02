const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const { Followers, Users } = require('../models/models');
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
  Users.findAll({
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

// async function addUser(req, res, next) {
//   try {
//     let search = await sequelize.query(`SELECT *  FROM users WHERE name = '${req.body.username}' `, { type: sequelize.QueryTypes.SELECT });
//     if (search[0] === undefined) {
//       let data = await sequelize.query(`INSERT INTO users (password, name, email) VALUES (:userpass, :username, :useremail)`, { replacements: { userpass: req.body.userpass, username: req.body.username, useremail: req.body.useremail } });
//       res.json("Successful registration!");
//     } else {
//       res.json({ error: 'This user already exists' });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

router.get('/followers', function (req, res, next) {
  let letter = req.query.letter;
  Users.findAll({
    attributes: ['name', 'id'],
    where: {
      name: { [Op.iLike]: `${letter}%` },
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
  // findUser(req, res, next);
})

// async function findUser(req, res, next) {
//   try {
//     let id = req.query.id;
//     let letter = req.query.letter;
//     if (letter) {
//       const data = await sequelize.query(`SELECT name, id FROM users WHERE name ILIKE :search and NOT id = :id`, { replacements: { search: `${letter}%`, id: id }, type: sequelize.QueryTypes.SELECT });
//       res.json(data);
//     } else {
//       const data = [];
//       res.json(data);
//     }
//   } catch (error) {
//     next(error);
//   }
// }



router.post('/followers', function (req, res, next) {
  Followers.create({ following: req.body.id, follower: req.body.userId })
    .then(() => { res.json("Success!") })
    .catch((error) => {
      next(error);
    })
  // followUser(req, res, next);
})

// async function followUser(req, res, next) {
//   try {
//     await sequelize.query(`INSERT INTO followers (follower, following) VALUES (:follower, :following)`, { replacements: { follower: req.body.userId, following: req.body.id } });
//     res.json("Success!");
//   } catch (error) {
//     next(error);
//   }
// }



router.delete('/followers', function (req, res, next) {
  Followers.destroy({ where: { following: req.body.id, follower: req.body.userId }, raw: true })
    .then(() => { res.json("Success delete!") })
    .catch((error) => {
      next(error);
    })
  // deletefollow(req, res, next);
})


// async function deletefollow(req, res, next) {
//   try {
//     await sequelize.query(`DELETE FROM followers WHERE following = :following and follower = :follower`, { replacements: { following: req.body.id, follower: req.body.userId } });
//     res.json("Success!");
//   } catch (error) {
//     next(error);
//   }
// }



router.get('/followers/teststate', function (req, res, next) {
  Followers.findAll({
    attributes: ['follower', 'following'],
    raw: true,
  })
    .then((followers) => { res.json(followers) })
    .catch((error) => {
      next(error);
    })
  // teststate(req, res, next);
})

// async function teststate(req, res, next) {
//   try {
//     let data = await sequelize.query(`SELECT follower, following FROM followers`, { type: sequelize.QueryTypes.SELECT });
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// }

