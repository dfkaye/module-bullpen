typeof global != 'undefined' || (window.global = window);

var dirname;
var filename = '/module.js';
var scripts = document.scripts;
var head = scripts[0].parentNode

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
    console.log('not found: ' + path);
    load(path);
  }
  return require.cache[path].exports;
}

require.cache = {};


function load(url, callback) {
  //callback(err, parent)
  url = expand(dirname + url);
  
  var script = document.createElement('script');
  
  script.src = url;
  script.onload = script.onreadystatechange = function () {
    if (!script.readyState || script.readyState.match(/loaded|complete/i)) {
      script.onload = script.onreadystatechange = null;
      resolve(url);
    }
  }
  
  script.onerror = function (e) {
    console.error('error loading script: ' + e);
    //module.pathError(filename);
  }
  
  head.appendChild(script);
}

function resolve(url) {
  
  console.log('url loaded: ' + url)
}


function Module(id) {
  
  this.id = id;
  this.filename = id + '.js';
  this.exports = {};
  this.children = [];
  this.parent;
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

// emulate concatenated src
define('./inline');
;(function() {

  global.console && console.log('inline defined');
  
  module.exports = inline; function inline(caller) {
    global.console && console.log('inline.js called by ' + caller);

  }
  
}());


