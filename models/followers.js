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
    Followers.belongsTo(models.Users, {
      foreignKey: 'follower',
      as: 'bindFollower',
    });
    // Followers.belongsTo(models.Users, {
    //   foreignKey: 'following',
    //   as: 'bindFollowing',
    // });
  };

  return Followers;
};