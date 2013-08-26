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
  if (path == '.') {
    return path;
  }
  
  if (path.lastIndexOf('.js') != path.length - 3) {
    path += '.js';
  }
  
  return path;
}

function require(id, name) {
  path = expand(id);
  if (!require.cache[path]) {
   console.log('not found: ' + path) 
  }
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


function define(id) {
  var path = expand(id);
  var m = require.cache[path];
  if (!m) {
    m = new Module(id);
    require.cache[path] = m;
  }
  global.module = require.cache[path];
}


define('.');

define('./inline');
;(function() {
  alert('inline')
  global.console && console.log('inline defined')
  function inline() {
    global.console && console.log('inline.js');

  }
  module.exports = inline; 
});


