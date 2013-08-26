define('./remote.js');
;(function() {

  var inline = require('./inline');
  
  module.exports = remote; function remote(caller) {
  
    inline('remote');
    console.log('remote called by ' + caller);
  }
  
  console.log('remote loaded')

}());
