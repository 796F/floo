#!/usr/bin/env node

'use strict';

var fs = require('fs');
var Portal = require('./lib/portal');
var portal = new Portal();

if(process.argv.length == 2){
  
  if(!process.stdin.isTTY) {
    //pipe in
    portal.setStream(process.stdin);
    portal.startServer();
  }else {
    //clipboard
    portal.startServer();
  }
} else if(process.argv.length >= 3) {
  var command = process.argv[2];
  if(command == 'name' || command == '-n') {
    if(process.argv.length == 4) {
      var name = process.argv[3]

      // TODO : implement naming
      name = 'sirius-floo';
      
      console.log('your fieplace is now named', name);
      process.exit(0);
    }else {
      console.log('usage: floo name <your_floos_name>');
      process.exit(0);
    }
  }else if (command == 'list' || command == '-l') {
    portal.list();
  }else {
    if(!process.stdout.isTTY) {
      //get and pipe out to stdout
      portal.setStream(process.stdout);
      portal.startClient(command)
    }else {
      //get and put to clipboard
      portal.startClient(command);
    }
    
  }
}



/*


/////////////////////////////////////////////// WRITEABLE STREAM /////////////////////////////////////////////////

from http://nodejs.org/api/stream.html 
var writable = fs.createWriteStream('file.txt');

*/
