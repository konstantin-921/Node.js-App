module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('followers', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    follower: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    following: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });

  Followers.associate = function (models) {
    Followers.belongsToMany(models.Users, {
      through: 'follower',
      foreignKey: 'follower',
      as: 'userFollower',
    });
    Followers.belongsToMany(models.Users, {
      through: 'following',
      foreignKey: 'following',
      as: 'userFollowing',
    });
  };

  return Followers;
};