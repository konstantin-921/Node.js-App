const Sequelize = require('sequelize');

const sequelize = new Sequelize('app', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false
  }
});

const models = {
  Users: sequelize.import('./users'),
  Followers: sequelize.import('./followers'),
  Posts: sequelize.import('./posts'),
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;






// const Sequelize = require('sequelize');

// const sequelize = (function () {

  // const sequelize = new Sequelize('app', 'nodejs', '1111', {
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   define: {
  //     timestamps: false
  //   }
  // });

//   return sequelize;

// })()

// module.exports = sequelize;