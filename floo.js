#!/usr/bin/env node

'use strict';

var Portal = require('./lib/portal');
var nconf  = require('nconf');
var fs     = require('fs');

nconf.file(require('path').resolve(__dirname, 'config.json'));

var portal = new Portal();

if(process.argv.length == 2){
  
  var flooName = nconf.get('name');

  if(flooName) {
    if(!process.stdin.isTTY) portal.setStream(process.stdin);
    portal.startServer(flooName, nconf.get('port') || 1337, _exit);
  }else{
    _exit([
      "\n\n\n\n",
      'Hey this is Mike Xia, and thanks so much for trying floo!',
      'feel free to contact me at xia.umd@gmail.com with questions/comments',
      'Now name your computer using',
      '   `floo name some-name`',
      'and enjoy using floo!!', 
      "\n\n\n\n"].join("\n"));
  }

} else if(process.argv.length >= 3) {
  
  var command = process.argv[2];
  if(command == 'name' || command == '-n') {
    
    if(process.argv.length == 4) {
      _save('name', process.argv[3])
    }else {
      var name = nconf.get('name') || 'not set'
      _exit('floo name:' + name);
    }

  }else if (command == 'list' || command == '-l') {
    
    portal.list();

  }else if (command == 'port' || command == '-p') {
    
    if(process.argv.length == 4) {
      _save('port', process.argv[3])
    }else {
      var port = nconf.get('port') || 'default 1337'
      _exit('floo port:' + port);
    }

  }else if (command == 'help' || command == '-h') {
    
    console.log([
      'usage:',
      '',
      'floo name some-name             name your floo (required!)', 
      'floo                            create a floo with your clipboard',
      'cat bacon.jpg | floo            create a floo with piped data',
      'floo list                       list floos on network',
      ].join('\n'));

  }else {

    if(!process.stdout.isTTY) portal.setStream(process.stdout);
    portal.startClient(command, _exit);

  }
}

function _save(key, value) {
  if(['name', 'list', 'help', 'port'].indexOf(value) >= 0) {
    _exit('you cannot name your floo `' + value + '` silly ... thats a command ');
  }else if(key == 'port' && parseInt(value) == 'NaN') {
    _exit('please use a number for port');
  }

  nconf.set(key, value);
  nconf.save(function (err) {
    if (err) console.log('config save error', err);
    else if (key == 'name') console.log('your fireplace is now named', value);
    else if (key == 'port') console.log('your port is set to', value)
    _exit();
  });
}

function _exit(message) {
  if(message) console.log(message);
  process.exit(0);
}
