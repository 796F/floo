#!/usr/bin/env node

'use strict';

var fs = require('fs');
var walk    = require('walk')
var _ = require('underscore');

var Portal = require('./lib/portal');

if(process.argv.length == 2){
  //pipe portal portal
  process.stdin.resume();
  var data = '';
  process.stdin.on('data', function(chunk) {
    data += chunk;
  });
  process.stdin.on('end', function() {
    var portal = new Portal();
    portal.startServer(data);
  });
} else if(process.argv.length == 3 && !parseInt(process.argv[2])) {
    // //portal myFile.jpg 
    // //portal /myDir
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
} else {
  //portal 1337
  var portal = new Portal();
  portal.startClient(parseInt(process.argv[2]));
}
