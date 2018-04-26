var fs = require('fs');

var http = require('http');

var server = http.createServer(function(req, res) {

  if(req.url === '/index' || req.url === '/') {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  } else if (req.url === '/login') {
    
  }


});

server.listen(3000, '127.0.0.1');
console.log('Мы отслеживаем порт 3000');
