const express = require('express');
const app = module.exports = express();


app.get('/home', function (req, res) {
  var dir = __dirname.slice(0, -5);
  res.sendFile(dir + '/public/home.html');
});