const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Followers = sequelize.define('followers', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
  },
  follower: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  following: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
});

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: Sequelize.TEXT,
  },
  name: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.TEXT,
  },
  avatar: {
    type: Sequelize.BLOB,
  }
})

const Posts = sequelize.define('posts', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.TEXT,
  },
  title: {
    type: Sequelize.TEXT,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
})


// Users.hasMany(Posts);
// Posts.hasOne(Users);


module.exports = {
  Followers,
  Users,
  Posts
};