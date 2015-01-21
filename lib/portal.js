var http = require('http');

var polo = require('polo');
var apps = polo();

function Portal () {
  this.server;
  this.client;
  this.buffer;
}

Portal.prototype.startClient = function startClient(portalId) {
  apps.once('up', function(name, service) {
    if(service.portalId === portalId) {
      var options = {
        hostname: service.host,
        port: service.port,
        method: 'GET'
      };

      var req = http.request(options, function(res) {
        var data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function() {
          console.log(data);
          process.exit(0);
        });
      });

      // req.on('error', function(e) {
      //   console.log('problem with request: ' + e.message);
      // });

      req.end();
    }
  });
}

Portal.prototype.startServer = function startServer(data) {
  var portalId = Math.round(Math.random() * 10000);
  console.log("Portal Openned :", portalId);
  apps.put({
    name : 'portal-time',
    port : 1337,
    portalId : portalId
  });

  http.createServer(function(request,response){
      response.writeHeader(200, { "Content-Type": "application/octet-stream" });
      response.write(data);
      response.end();
      process.exit(0);
  }).listen(1337);
}

module.exports = Portal;