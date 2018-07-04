module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    avatar: {
      type: DataTypes.BLOB,
    }
  });

  Users.associate = function (models) {
    Users.belongsTo(models.Posts, {
      through: 'user',
      foreignKey: 'id',
      targetKey: 'user_id',
      as: 'message',
    });
    Users.belongsTo(models.Followers, {
      foreignKey: 'id',
      targetKey: 'follower',
      as: 'bindFollower',
    });
    // Users.belongsTo(models.Followers, {
    //   through: 'user',
    //   foreignKey: 'id',
    //   targetKey: 'following',
    //   as: 'bindFollowing',
    // });
  };

  return Users;
};