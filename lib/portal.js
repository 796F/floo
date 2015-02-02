var http = require('http');

var polo = require('polo');
var apps = polo();

function Portal () {
  this.server;
  this.buffer;
  this.stream;
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
          process.stdout.write(data);
          process.exit(0);
        });
      });

      req.on('error', function(e) {
        console.log('Floo Network Authority :', e.message);
      });

      req.end();
    }
  });
}


Portal.prototype.setStream = function setStream(stream) {
  this.stream = stream;
  //could be a read or a write stream.  when we create a portal serving data, it is a read stream from fs or stdin.  
  //when we create a portal getting data, its a write stream, either a fs path, or stdout.  
}

Portal.prototype.streamToFS = function streamToFS(path) {
  //create a writable stream, set it to this.stream

}

Portal.prototype.startServer = function startServer(data) {
  var portalId = Math.round(Math.random() * 1000);

  apps.once('up', function(name, service) {

  });

  console.log("floo powder", portalId);
  apps.put({
    name : 'floo-network',
    port : 1337,
    portalId : portalId
  });

  this.server = http.createServer(function(request,response){
    this.stream.resume();
    response.writeHeader(200, { "Content-Type": "application/octet-stream" });
    this.stream.on('data', function(data) {
      response.write(data);
    });
    
    this.stream.on('end', function() {
      response.end();
      process.exit(0);
    }.bind(this))
  }.bind(this)).listen(1337);
}

module.exports = Portal;
