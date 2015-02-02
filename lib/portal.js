var http = require('http');
var clipboard = require("copy-paste");
var polo = require('polo');
var apps = polo();

function Portal () {
  this.stream;
}

Portal.prototype.list = function list(){
  apps.on('up', function(name, service) {
    console.log(service.flooName);
  });
}

Portal.prototype.setStream = function setStream(stream) {
  this.stream = stream;
}

Portal.prototype.startClient = function startClient(flooName, success) {
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
        }
        else { 
          clipboard.copy(res); 
        }
        res.on('end', success);
      });

      req.on('error', _error('http.request error'));
      req.end();
    }
  });
}


Portal.prototype.startServer = function startServer(flooName, port, success) {
    var self = this;
    
    var server = http.createServer(function(request,response){
      response.writeHeader(200, { "Content-Type": "application/octet-stream" });
      
      if(self.stream) {
        self.stream.resume();
        self.stream.pipe(response);

        self.stream.on('end', function() {
          response.end();
          if(success) success();
        });

        self.stream.on('error', _error('this.stream error'));
      } else {
        response.write(clipboard.paste());
        response.end();
        if(success) success();
      }
    });

    server.on('error', _error('server error'))
    
    // TODO : handle multiple floos on a single port, in case people use floo a lot :D
    server.listen(port, function() {
      console.log(flooName, "is now ready on port", port);
      apps.put({
        name : 'floo-network',
        flooName : flooName,
        port : port
      });
    });
    
}

function _error(label) {
  return function(error){
    console.log(label, error);
    process.exit(1);
  }
}

module.exports = Portal;
