const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");

function Strategy() {

  const ExtractJwt = passportJWT.ExtractJwt;
  const JwtStrategy = passportJWT.Strategy;

  const sequelize = new Sequelize('app', 'nodejs', '1111', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  });
 
  this.jwtOptions = {}
  this.jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  this.jwtOptions.secretOrKey = 'tasmanianDevil';

  this.strategy = new JwtStrategy(this.jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    sequelize.query(`SELECT * FROM users WHERE id = '${jwt_payload.user}'`, {type: sequelize.QueryTypes.SELECT})
    .then((users) => {
      let user = users[0];
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
    });

  passport.use(this.strategy);
}

module.exports = new Strategy();

