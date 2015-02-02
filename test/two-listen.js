var http = require('http');

var server1 = http.createServer();
var server2 = http.createServer();

try {
  server1.listen(1337, function() {
    console.log('server1', arguments)
  });
  server2.listen(1337, function() {
    console.log('server2', arguments)
  });
}catch(err) {
  console.log(err);
}
