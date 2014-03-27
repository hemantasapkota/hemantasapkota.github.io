
var scattered = {
  provides: {"controllers/setup": {}},
  args: ['controllers/log', 'npm!passport']
};


module.exports = function(log, passport) {
  var self = {
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }

        if(!user) {
          return res.redirect('/auth/login');
        }

        log.debug({user: user}, 'User authenticated');
        req.login(user, function(err) {
          if(err) {
            return next(err);
          }

          return res.redirect(decodeURIComponent(req.query.redirect || '/'));
        });
      })(req, res, next);
    },

    
    logout: function(req, res){
      req.logout();
      res.redirect('/');
    },
    
    loginPage: function(req, res){
      res.render('auth/login', {redirect: encodeURIComponent(req.query.redirect || '/')});
    },
    
    setup: function(app) {
      app.post("/auth/login", self.login);
      app.get("/auth/login", self.loginPage);
      app.get('/auth/logout', self.logout);
    }
  };

  return self;
};
module.exports.__module = scattered;
