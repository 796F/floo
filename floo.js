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
    portal.startServer(flooName, function(error) {
      if(error) {
        console.log('startServer error :', error);
      }
      _exit();
    });
  }else{
    console.log('name required: `floo name some-name`');
    _exit();
  }

} else if(process.argv.length >= 3) {
  
  var command = process.argv[2];
  if(command == 'name' || command == '-n') {
    
    if(process.argv.length == 4) {
      _saveName(process.argv[3])
    }else {
      var name = nconf.get('name') || 'not set'
      console.log('floo name:', name);
      _exit();
    }

  }else if (command == 'list' || command == '-l') {
    
    portal.list();

  }else if (command == 'help' || command == '-h') {
    
    console.log([
      'usage:',
      '',
      'floo name some-name             name your floo (required!)', 
      'floo list                       list floos on network',
      ].join('\n'));

  }else {

    if(!process.stdout.isTTY) portal.setStream(process.stdout);
    portal.startClient(command, function(error) {
      if(error) console.log('startClient error :', error);
      _exit();
    });

  }
}

function _handleError(error) {
  console.log(this, error);
}

function _saveName(name) {
  nconf.set('name', name);
  nconf.save(function (err) {
    if (err) 
      console.error('config save error', err);
    else 
      console.log('your fieplace is now named', name);
    _exit();
  });
}

function _exit() {
  process.exit(0);
}
