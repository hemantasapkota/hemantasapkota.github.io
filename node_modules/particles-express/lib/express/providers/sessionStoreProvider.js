


var self = module.exports = {
  __module: {
    properties: {
      express: 'npm!express'
    }
  },
  
  getNewSessionsStore: function() {
    return new self.express.session.MemoryStore();
  }
};