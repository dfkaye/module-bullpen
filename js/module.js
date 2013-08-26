typeof global != 'undefined' || (window.global = window);

var dirname;
var filename = '/module.js';
var scripts = document.scripts;
var length = scripts.length;
var src;
for (var i = 0; i < length; ++i) {
  src = scripts[i].src;
  if (src.indexOf(filename) > 0 )
    dirname = src.split(filename)[0] + '/';
    break;
}

global.console && console.log(dirname + 'module.js');



function expand(path, parent) {
  
}

function require(path, name) {
  //if (!require.cache[name]) {
  return require.cache[path].exports;
}

require.cache = {};

function load(path, callback) {
  callback(err, parent)
}

function Module(id) {
  
  this.id = id;
  this.filename = id + '.js';
  this.exports = {};
  
}


function define(name) {
  if (!require.cache[name]) {
    require.cache[name] = new Module(name);
  }
  global.module = require.cache[name];
}


define('.');

define('./inline');
;(function() {
  
  module.exports = inline; function inline() {
    global.console && console.log('inline.js');

  }
  
});


