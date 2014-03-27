
var util = require('util'),
  http = require('http');

var __module = {
  provides: ['app_start', 'express/server_start'],
  args: [
    'express/log', 'config', 'utils/promises', 'npm!express',
    'svc!express/middleware/register', 'svc|sequence!express/server_start'
  ]
};

module.exports = function(log, config, promises, express,
                          registerMiddleware, startServer) {
  var self = {};

  self.express = express();
  self.server = http.createServer(self.express);

  self.app_start = function() {
    log.info("Configuring express middleware...");
    return registerMiddleware(self.express).then(function(){
      return startServer(self.server);
    });
  };

  self.server_start = function(server) {
    log.info("Starting Express app...");
    var deferred = promises.defer();
    server.listen(config.get('server.port') || 3000, config.get('server.ip') || "0.0.0.0", function() {
      log.info("Express server listening on http://%s:%d in %s mode",
        server.address().address, server.address().port, self.express.settings.env);
      deferred.resolve();
    });

    return deferred.promise;
  };

  return self;
};


module.exports.__module = __module;
