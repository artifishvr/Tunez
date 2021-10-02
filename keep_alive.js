var http = require('http');

http.createServer(function (req, res) {
  res.write("ass");
  res.end();
}).listen(8080);