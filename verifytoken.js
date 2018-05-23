const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let auth = req.get('Authorization');
  const excluded = ['/', '/login', '/secret', '/registred'];

  if(auth && excluded.indexOf(req.url) > -1) {
    let token = auth.substring(7);
    console.log(token);
    
      jwt.verify(token, 'tasmanianDevil', {ignoreExpiration: false}, function(err, decoded) {
          if(!!(decoded.user)) {
            return next();
          } else if(err) {
            res.status(401).json({message:"token not verify"});
          }
      });
  } else {
    next();
  }
}

