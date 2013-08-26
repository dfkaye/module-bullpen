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

function expand(id, parent) {
  if (id == '.') {
    return id;
  }
  
  if (id.lastIndexOf('.js') != id.length - 3) {
    id += '.js';
  }
  
  return id;
}

function require(id, name) {
  var path = expand(id);
  if (!require.cache[path]) {
    console.log('not cached: ' + path);
    require.cache[path] =  new Module(id);
    load(path);
  }
  return require.cache[path].exports;
}

require.cache = {};

function load(id, callback) {
  //callback(err, parent)
  var path = dirname + expand(id);
  
  var script = document.createElement('script');
  
  script.src = path;
  script.onload = script.onreadystatechange = function () {
    if (!script.readyState || script.readyState.match(/loaded|complete/i)) {
      script.onload = script.onreadystatechange = null;
      resolve(id);
    }
  }
  
  script.onerror = function (e) {
    console.error('error loading script: ' + e);
    //module.pathError(filename);
  }
  
  head.appendChild(script);
}

function resolve(id) {
  
  console.log('id loaded: ' + id);
  require.cache[id].loaded = true;
}


function Module(id) {
  this.id = id;
  this.filename = id + '.js';
  this.exports = {};
  this.children = [];
  this.parent;
  this.loaded = false;
}


function define(id) {
  var path = expand(id);
  if (!require.cache[path]) {
    require.cache[path] = new Module(id);
  }
  global.module = require.cache[path];
}


// start
define('.');
;(function() {

  global.define = define;
  global.require = require;
  
}());


// emulate concatenated src
define('./inline');
;(function() {

  global.console && console.log('inline defined');
  
  module.exports = inline; function inline(caller) {
    
    global.console && console.log('inline.js called by ' + caller);

  }
  
}());
