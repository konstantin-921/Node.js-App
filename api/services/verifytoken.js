const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let auth = req.get('Authorization');
  // console.log(req.path);
  // console.log(auth);
  if(auth) {
    let token = auth.substring(7);
    
      jwt.verify(token, 'tasmanianDevil', {ignoreExpiration: false}, function(err, decoded) {
          if(decoded.user) {
            next();
          } else if(err) {
            res.status(401).json({message:"token not verify"});
          }
      }); 
  } 
  else {
    next();
  }
}

