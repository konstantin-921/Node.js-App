module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('posts', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  Posts.associate = function (models) {
    Posts.belongsTo(models.Users, {
      through: 'user',
      foreignKey: 'user_id',
    });
  };

  return Posts;
};