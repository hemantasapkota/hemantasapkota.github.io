


var self = module.exports = {
  __module: {
    properties: {
      promises: 'utils/promises'
    }
  },
  
  authenticate: function(username, password) {
    if(username === "demo" && password === "demo") {
      return self.promises.resolve({
        id: 1,
        username: username
      });
    } 
    
    return self.promises.reject({
      message: "Invalid username or password"
    });
  },
  
  getUserById: function(id) {
    if(id === 1) {
      return self.promises.resolve({
        id: 1,
        username: "demo"
      });
    }
    
    return self.promises.reject(new Error("Only admin is available as valid user"));
  }
};