define('./remote.js');
;(function() {

  var inline = require('./inline');
  
  module.exports = remote; function remote() {
  
    inline('remote');
    console.log('remote called');
  }
}());
