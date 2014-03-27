
var scattered = {
  provides: {"express/middleware/register": ['express/middleware/preprocessors']},
  args: ['express/log', 'npm!express', 'config!resources.staticUrlRoot', 'config!resources.assetsDir']
};

module.exports = function(log, express, staticUrlRoot, assetsDir) {
  var module = {};

  module.register = function(expressApp) {
    expressApp.use(staticUrlRoot, 
      express.static(assetsDir, {maxAge: (60 * 60 * 24 * 1000)}));
  };
  
  return module;
};

module.exports.__module = scattered;
