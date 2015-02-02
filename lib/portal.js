var http = require('http');
var clipboard = require("copy-paste");
var polo = require('polo');
var apps = polo();

function Portal () {
  this.stream;
}

Portal.prototype.list = function list(){
  apps.once('up', function(name, service) {
    console.log(service.flooName);
  });
}

Portal.prototype.setStream = function setStream(stream) {
  this.stream = stream;
}

Portal.prototype.startClient = function startClient(flooName, callback) {
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
        res.on('end', callback);
      });

      req.on('error', callback);
      req.end();
    }
  });
}


Portal.prototype.startServer = function startServer(flooName, callback) {
  var self = this;

  console.log(flooName, "is now ready");

  var server = http.createServer(function(request,response){
    response.writeHeader(200, { "Content-Type": "application/octet-stream" });
    
    if(self.stream) {
      self.stream.resume();
      self.stream.pipe(response);

      self.stream.on('end', function() {
        response.end();
        if(callback) callback();
      });

      self.stream.on('error', function(e){
        console.log('stdin error', e);
      });
    } else {
      response.write(clipboard.paste());
      response.end();
      if(callback) callback();
    }
  });
  
  server.listen(1337, function(error) {
    if(!error) {
      apps.put({
        name : 'floo-network',
        port : 1337,
        flooName : flooName
      });
    }else{
      console.log('server.listen error', error);
    }
  });
}

module.exports = Portal;
