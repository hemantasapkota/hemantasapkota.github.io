

var self = module.exports = {
  __module: {
    provides: {
      "express/middleware/register": {
        before: ['express/middleware/routes'],
        after: ['express/middleware/authentication']
      }
    }
  },

  register: function(expressApp) {
    //pass the user object into the view
    expressApp.use('/', function(req, res, next) {
      expressApp.locals.auth = {
        user: req.user
      };
      next();
    });
  }
};
