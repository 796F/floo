var http = require('http');
var clipboard = require("copy-paste");
var polo = require('polo');
var apps = polo();

function Portal () {
  this.server;
  this.buffer;
  this.stream;
}

Portal.prototype.startClient = function startClient(flooName) {
  var self = this;
  apps.once('up', function(name, service) {
    if(service.flooName === flooName) {
      
      var options = {
        hostname: service.host,
        port: service.port,
        method: 'GET'
      };

      var req = http.request(options, function(res) {
        
        if(self.stream) {
          res.pipe(self.stream);
        }else {
          clipboard.copy(res);
        }

        res.on('end', function() {
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

Portal.prototype.list = function list(){
  apps.once('up', function(name, service) {
    console.log(service.flooName);
  });
}

Portal.prototype.setStream = function setStream(stream) {
  this.stream = stream;
}

Portal.prototype.startServer = function startServer() {
  var self = this;

  var flooName = 'sirius-floo';

  console.log(flooName, "is now ready");
  
  apps.put({
    name : 'floo-network',
    port : 1337,
    flooName : flooName
  });

  self.server = http.createServer(function(request,response){
    response.writeHeader(200, { "Content-Type": "application/octet-stream" });
    
    if(self.stream) {
      self.stream.resume();
      self.stream.on('data', function(data) {
        response.write(data);
      });

      self.stream.on('end', function() {
        response.end();
        process.exit(0);
      });

      self.stream.on('error', function(e){
        console.log('stdin error', e);
      });
    } else {
      response.write(clipboard.paste());
      response.end();
      process.exit(0);
    }
  });
  
  self.server.listen(1337);
}

module.exports = Portal;
