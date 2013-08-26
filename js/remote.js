define('./remote.js');
console.log('remote loaded')
;(function() {

  var inline = require('./inline');
  
  module.exports = remote; function remote(caller) {
  
    inline('remote');
    console.log('remote called by ' + caller);
  }
  
  
}());
