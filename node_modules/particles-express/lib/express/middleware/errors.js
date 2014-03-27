var path = require('path'),
  fs = require('fs');

var self = module.exports = {
  __module: {
    properties: {
      log: 'express/log', 
      config: 'config'
    },
    provides: {
      "express/middleware/register": ['express/middleware/router']
    }
  },
  
  register: function(express) {
    express.use(function(err, req, res, next) {
      self.log.error({err: err, req: req}, "There was an error while handling the request");
      
      var status = err.status || 500;
      res.status(status);

      res.format({
        html: function(){
          var viewsDir = express.get('views');
          //TODO bleah...
          var ext = express.get('view engine');

          var errView = path.join("errors", ""+status);
          fs.exists(path.join(viewsDir, errView + "." + ext), function(exists) {
            if(!exists) {
              errView = path.join("errors", "default");
            }
            res.render(errView, { error: err , url: req.url});
          });
        },

        json: function(){
          res.send({ error: err.message || "Unexpected error"});
        },

        "default": function(){
          res.send();
        }
      });
    });
  }
};