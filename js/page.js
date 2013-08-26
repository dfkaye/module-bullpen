define('./page.js');
require('./inline');
//require('./remote');

;(function() {
  
  var inline, remote;
  
  inline = require('./inline');
  
  // exports should be a function that intercepts eager calls and queues them
  // so they can be called when exports is explicitly defined
  
  inline();
  
  //remote = require('./remote');

  module.exports = s; function s() {
    
  }
  
  global.console && console.log('page.js');

}());
