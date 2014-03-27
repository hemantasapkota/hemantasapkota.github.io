var scattered = {
  provides: {"express/middleware/register": {after: ['express/middleware/preprocessors']}},
  args: ['express/log', 'config', 'npm!express', 'express/providers/sessionStoreProvider']
};

module.exports = function(log, config, express, sessionStoreProvider) {
  var module = {};

  module.register = function(expressApp) {

    expressApp.use(express.session({
      secret: config.get('server.sessionSecret') || "APRITISESAMO",
      store: sessionStoreProvider.getNewSessionsStore()
//      cookie : {
//        maxAge : (((60 * 1000 /* 60 seconds*/) * 60 * 60 /* 1 hour*/) * 24 /* 1 day*/ * 7)
//      },
//      maxAge:  new Date(Date.now() + 20000)
    }));
  };
  
  return module;
};
module.exports.__module = scattered;
