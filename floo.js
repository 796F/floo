#!/usr/bin/env node

'use strict';

var fs = require('fs');
var walk    = require('walk')
var _ = require('underscore');
var clipboard = require("copy-paste");
var Portal = require('./lib/portal');
var argv = require('optimist').argv;

/*

  handle piping large files.  

  

*/




debugger;
if(process.argv.length == 2){
  //pipe
  process.stdin.resume();
  var data = '';
  process.stdin.on('data', function(chunk) {
    data += chunk;
  });
  process.stdin.on('end', function() {
    var portal = new Portal();
    portal.setStream(process.stdin);
    portal.startServer();
  }else {

    /*****
     * Floo run without pipe or arguments.  Tell user how to use.  
     *****/

     console.log('try this ... echo "hello world" | floo');    
  }
} else if(process.argv.length == 3 && !parseInt(process.argv[2])) {
<<<<<<< HEAD
    
=======

    // //portal myFile.jpg 
    // //portal /myDir
>>>>>>> 331cda11d3e2d7fc2d4bbda218c7c00a21a78816
    // if(fs.lstatSync(process.argv[2]).isDirectory()) {
    //   var walker = walk.walk(process.argv[2], { followLinks: false });
    //   var files = [];
    //   walker.on('file', function(root, stat, next) {
    //     files.push(root + '/' + stat.name);
    //     next();
    //   });
    //   walker.on('end', function() {
    //     console.log(files);
    //   });
    // }else {
    //   console.log('send', process.argv[2], ' thorugh portal!');
    // }
} else if(process.argv.length == 3 && parseInt(process.argv[2])) {
  //portal 1337
  var portal = new Portal();
<<<<<<< HEAD
  portal.startClient(parseInt(process.argv[2]));

} else if(process.argv.length == 3 && process.argv[2] == '--clipboard') {
  console.log('directly from clipboard')
=======
  if(!process.stdout.isTTY) {
    
    /*****
     * Floo is trying to pipe out.  Create a portal, and tell the portal the stream is stdout
     *****/

     portal.setStream(process.stdout);
     portal.startClient(parseInt(process.argv[2]));
  }else{
    
    /*****
     * Floo is trying to write to a file.  Create a write stream and pass it to the portal.
     *****/

     var writable = fs.createWriteStream( process.argv[3] );
     portal.setStream(writable);
     portal.startClient(process.argv[2])
  }
>>>>>>> 331cda11d3e2d7fc2d4bbda218c7c00a21a78816
}



/*

<<<<<<< HEAD
//////////////////////////////////////////// DETECTING PIPE ////////////////////////////////////////////////////

if (process.stdin.isTTY) {
  // handle shell arguments
} else {
  // handle piped content (see Jerome’s answer)
}

var data = '';
function withPipe(data) {
   console.log('content was piped');
   console.log(data.trim());
}
function withoutPipe() {
   console.log('no content was piped');
}

var self = process.stdin;
self.on('readable', function() {
    var chunk = this.read();
    if (chunk === null) {
        withoutPipe();
    } else {
       data += chunk;
    }
});
self.on('end', function() {
   withPipe(data);
});


=======
>>>>>>> 331cda11d3e2d7fc2d4bbda218c7c00a21a78816
/////////////////////////////////////////////// HANDLING OPTIONS /////////////////////////////////////////////////

#!/usr/bin/env node

var colors = require('colors'),
    httpServer = require('../lib/http-server'),
    portfinder = require('portfinder'),
    opener = require('opener'),
    argv = require('optimist')
      .boolean('cors')
      .argv;

if (argv.h || argv.help) {
  console.log([
    "usage: http-server [path] [options]",
    "",
    "options:",
    "  -p                 Port to use [8080]",
    "  -a                 Address to use [0.0.0.0]",
    "  -d                 Show directory listings [true]",
    "  -i                 Display autoIndex [true]",
    "  -e --ext           Default file extension if none supplied [none]",
    "  -s --silent        Suppress log messages from output",
    "  --cors             Enable CORS via the 'Access-Control-Allow-Origin' header",
    "  -o                 Open browser window after staring the server",
    "  -c                 Cache time (max-age) in seconds [3600], e.g. -c10 for 10 seconds.",
    "                     To disable caching, use -c-1.",
    "",
    "  -S --ssl           Enable https.",
    "  -C --cert          Path to ssl cert file (default: cert.pem).",
    "  -K --key           Path to ssl key file (default: key.pem).",
    "",
    "  -h --help          Print this list and exit."
  ].join('\n'));
  process.exit();
<<<<<<< HEAD
}

var port = argv.p || parseInt(process.env.PORT, 10),
    host = argv.a || '0.0.0.0',
    log = (argv.s || argv.silent) ? (function () {}) : console.log,
    ssl = !!argv.S || !!argv.ssl,
    requestLogger;

if (!argv.s && !argv.silent) {
  requestLogger = function(req) {
    log('[%s] "%s %s" "%s"', (new Date).toUTCString(), req.method.cyan, req.url.cyan, req.headers['user-agent']);
  }
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, port) {
    if (err) throw err;
    listen(port);
  });
} else {
  listen(port);
}

=======
}

var port = argv.p || parseInt(process.env.PORT, 10),
    host = argv.a || '0.0.0.0',
    log = (argv.s || argv.silent) ? (function () {}) : console.log,
    ssl = !!argv.S || !!argv.ssl,
    requestLogger;

if (!argv.s && !argv.silent) {
  requestLogger = function(req) {
    log('[%s] "%s %s" "%s"', (new Date).toUTCString(), req.method.cyan, req.url.cyan, req.headers['user-agent']);
  }
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, port) {
    if (err) throw err;
    listen(port);
  });
} else {
  listen(port);
}

>>>>>>> 331cda11d3e2d7fc2d4bbda218c7c00a21a78816
function listen(port) {
  var options = {
    root: argv._[0],
    cache: argv.c,
    showDir: argv.d,
    autoIndex: argv.i,
    ext: argv.e || argv.ext,
    logFn: requestLogger
  };

  if (argv.cors) {
    options.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    };
  }

  if (ssl) {
    options.https = {
      cert: argv.C || argv.cert || 'cert.pem',
      key: argv.K || argv.key || 'key.pem'
    };
  }

  var server = httpServer.createServer(options);
  server.listen(port, host, function() {
    var uri = [ssl ? 'https' : 'http', '://', host, ':', port].join('');
    log('Starting up http-server, serving '.yellow
      + server.root.cyan
      + ((ssl) ? ' through'.yellow + ' https'.cyan : '')
      + ' on: '.yellow
      + uri.cyan);

    log('Hit CTRL-C to stop the server');
    if (argv.o) {
      opener(uri);
    }
  });
}

if (process.platform !== 'win32') {
  //
  // Signal handlers don't work on Windows.
  //
  process.on('SIGINT', function () {
    log('http-server stopped.'.red);
    process.exit();
  });
}


<<<<<<< HEAD
*/
=======
*/
>>>>>>> 331cda11d3e2d7fc2d4bbda218c7c00a21a78816
