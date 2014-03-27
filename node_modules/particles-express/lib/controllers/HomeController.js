
var scattered = {
  provides: {"controllers/setup": {after: "*"}},
  args: ['controllers/log']
};


module.exports = function(log) {
  var self = {
    index: function(req, res) {
      res.send('200', 'Hello Particles!');
    },

    setup: function(express) {
      log.info("Initialize Pages controller...");

      //catch all
      express.get("/", self.index);
    }
  };

  return self;
};
module.exports.__module = scattered;
