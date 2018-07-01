const Sequelize = require('sequelize');

const sequelize = (function () {

  const sequelize = new Sequelize('app', 'nodejs', '1111', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    define: {
      timestamps: false
    }
  });

  return sequelize;

})()

module.exports = sequelize;