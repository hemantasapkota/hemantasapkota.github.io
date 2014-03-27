
var scattered = {
  provides: 'express/middleware/register',
  args: ['express/log', 'config']
};

module.exports = function(log, config) {
  var module = {};

  
  module.register = function(expressApp) {
    expressApp.set('views', config.get('resources.viewsDir'));
    expressApp.set('view engine', 'jade');
    
    //cache enabled by default in prod
    //expressApp.set('view cache', true);
    expressApp.set('view options', {
      layout: false
    });
  };
  
  return module;
};
module.exports.__module = scattered;
