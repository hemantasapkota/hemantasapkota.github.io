var uuid = require('node-uuid');

var __module = {
  args: ['logger', 'npm!express'],
  provides: ['express/middleware/register']
};

module.exports = function(logger, express) {
  var module = {};
  var accessLog = logger('express/access');

  module.register = function(expressApp) {
    expressApp.use(function requestLogger(req, res, next) {
      var startTime = new Date();

      // Add a unique identifier to the request.
      var requestId = req.requestId = uuid.v4();

      // Log the request
      accessLog.info({requestId: requestId, req: req}, "Request");

      // Log responses
      req.on('end', function () {
        res.responseTime = new Date() - startTime;
        res.requestId = req.requestId;
        accessLog.info({requestId: requestId, res: res}, "Response");
      });

      next();
    });
  };
  
  return module;
};
module.exports.__module = __module;
