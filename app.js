const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const strategy = require("./strategy.js");
let currentUser = '';


const sequelize = new Sequelize('app', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

app.use(function(req, res, next) {
  let auth = req.get('Authorization');
  const excluded = ['/', '/login', '/secret', '/registred'];

  if(auth && excluded.indexOf(req.url) > -1) {
    let token = auth.substring(7);
    
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
})

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

app.post('/newpost', function(req, res) {
  savePost(req, res);
})

app.get('/mypost', function(req, res) {
  sendPosts(req, res);
})

app.get('/friendspost', function(req, res) {
  sendFriendsPosts(req, res);
})

app.post('/teststate', function(req, res) {
  teststate(req, res);
})

app.post('/getusername', function(req, res) {
  getusername(req, res);
})

app.post('/finduser', function(req, res) {
  findUser(req, res);
})

app.post('/follow', function(req, res) {
  followUser(req, res);
})

app.post('/deletefollow', function(req, res) {
  deletefollow(req, res);
})

app.get('/wtf', function (req, res) {
   res.send(JSON.stringify("Error"));
});

app.post('/login', function (req, res) {
   query(req, res);
});

app.post('/secret', passport.authenticate('jwt', { session: false}), function(req, res){
  res.json("Success! You can not see this without a token");
});

app.post('/registred', function (req, res) {
  querySignUp(req, res);
});

function query(req, res) {
  sequelize.query(`SELECT * FROM users WHERE name = '${req.body.username}' and password = '${req.body.userpass}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    let user = users[0];
    currentUser = user.id;
    
    if(user.password === req.body.userpass) {
      let payload = {user: user.id};
      let token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, {expiresIn: '30h'});
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  })
  .catch((error) => {
    console.log(error);
  })
}

function querySignUp(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text, password text, email text, avatar bytea);")
  .then(() => {
    sequelize.query(`INSERT INTO users (name, password, email) VALUES ('${req.body.username}', ${req.body.userpass}, '${req.body.useremail}')`)
  })
  .catch((error) => {
    console.log(error);
  })
}

function savePost(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, date text, title text, user_id integer);")
  .then(() => {
    sequelize.query(`INSERT INTO posts (content, date, title, user_id) VALUES ('${req.body.postArea}', '${req.body.postDate}', '${req.body.postTitle}', '${currentUser}')`)
  })
  .catch((error) => {
    console.log(error);
  })
}

function sendPosts(req, res) {
  sequelize.query(`SELECT * FROM posts WHERE user_id = '${currentUser}'`, {type: sequelize.QueryTypes.SELECT})
  .then((posts) => {
    res.json(posts);
  })
  .catch((error) => {
    console.log(error);
  })
}

function sendFriendsPosts(req, res) {
  sequelize.query(`SELECT *  FROM posts WHERE user_id IN (SELECT following FROM followers WHERE follower = ${currentUser})`, {type: sequelize.QueryTypes.SELECT})
    .then((users) => {
       res.json(users);
    })
    .catch((error) => {
      console.log(error);
    })
}

function findUser(req, res) {
  let letter = req.body.letter;
  sequelize.query(`SELECT name, id FROM users WHERE name LIKE '${letter}%'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })
  .catch((error) => {
    console.log(error);
  })
}

function teststate(req, res) {
  sequelize.query(`SELECT follower, following FROM followers WHERE follower = '${currentUser}' and following = '${req.body.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((followers) => {
    console.log(followers);
    if(followers[0].follower) {
      res.json(followers);
    } 
  })
  .catch((error) => {
    console.log(error);
  })
}

function followUser(req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS followers (id serial, follower integer, following integer, PRIMARY KEY(follower, following), FOREIGN KEY(follower) REFERENCES users(id), FOREIGN KEY(following) REFERENCES posts(id));")
    .then((followers) => {
        sequelize.query(`INSERT INTO followers (follower, following) VALUES ('${currentUser}', '${req.body.id}')`)
    })
    .catch((error) => {
      console.log('Error');
    })
}

function deletefollow(req, res) {
  sequelize.query(`DELETE FROM followers WHERE following = '${req.body.id}'`)
}

function getusername(req, res) {
  sequelize.query(`SELECT name FROM users WHERE id = '${req.body.id}'`, {type: sequelize.QueryTypes.SELECT})
  .then((users) => {
    res.json(users);
  })

}

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});