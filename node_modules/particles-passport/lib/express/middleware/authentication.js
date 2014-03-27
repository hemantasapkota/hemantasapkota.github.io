
var __module = {
  provides: {
    "express/middleware/register": {
      after: ['express/middleware/static','express/middleware/preprocessors'], 
      before: ['express/middleware/router']
    }
  },
  args: ['express/log', 'npm!passport', 'npm!passport-local', 'services/authenticationManager']
};
module.exports = function(log, passport, passportLocal, authenticationManager) {
  var module = {};

  passport.use(new passportLocal.Strategy(
    function(username, password, done) {
      authenticationManager.authenticate(username, password).then(function(user) {
        done(null, user);
      }).otherwise(function(err) {
        if(err instanceof Error) {
          done(err);
        } else {
          done(null, false, err);
        }
      });
    }
  ));
    
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
    
  passport.deserializeUser(function(id, done) {
    log.debug('Deserializing user from session: ' + id);
    authenticationManager.getUserById(id).then(function(user) {
      done(null, user);
    }).otherwise(function(err) {
      done(err);
    });
  });
  
  
  module.register = function(expressApp) {
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
  };
  
  return module;
};
module.exports.__module = __module;
