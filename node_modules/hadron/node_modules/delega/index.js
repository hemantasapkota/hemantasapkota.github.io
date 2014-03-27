var delega = module.exports = {
  delegateFunction: function(toObj, method) {
    return function() {
      return toObj[method].apply(toObj, arguments);
    };
  },

  delegateToObject: function(fromObj, toObj, methods) {
    methods.forEach(function(method) {
      fromObj[method] = delega.delegateFunction(toObj, method);
    });
  },

  delegateMethod: function(property, method) {
    return function() {
      return this[property][method].apply(this[property], arguments);
    };
  },

  delegateToProperty: function(clazz, property, methods) {
    methods.forEach(function(method) {
      clazz.prototype[method] = delega.delegateMethod(property, method);
    });
  }
};

