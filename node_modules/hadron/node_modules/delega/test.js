var expect = require('chai').expect,
  delega = require('./index.js');

describe('delegateFunction', function() {
  it('should create a function that delegates to another object', function() {
    var objA = {
      foo: function() {
        return "a";
      }
    };
    
    var objB = {};

    objB.foo2 = delega.delegateFunction(objA, 'foo');
    
    expect(objB.foo2()).to.be.equal("a");
  });
});


describe('delegateToObject', function() {
  it('should create delegate a set of functions to another obj', function() {
    var objA = {
      foo: function() {
        return "a";
      },
      foo2:  function() {
        return "b";
      }
    };

    var objB = {};
    delega.delegateToObject(objB, objA, ['foo','foo2']);

    expect(objB.foo()).to.be.equal("a");
    expect(objB.foo2()).to.be.equal("b");
  });
});


describe('delegateMethod', function() {
  it('should create a method that delegates to an object property', function() {
    var objA = {
      foo: function() {
        return "a";
      }
    };

    var objB = function() {
      this.a = objA;
    };
    
    objB.prototype.foo2 = delega.delegateMethod('a', 'foo');

    expect(new objB().foo2()).to.be.equal("a");
  });
});


describe('delegateToProperty', function() {
  it('should delegate a set of methods to an object property', function() {
    var objA = {
      foo: function() {
        return "a";
      },
      foo2: function() {
        return "b";
      }
    };

    var objB = function() {
      this.a = objA;
    };

    delega.delegateToProperty(objB, 'a', ['foo', 'foo2']);

    expect(new objB().foo()).to.be.equal("a");
    expect(new objB().foo2()).to.be.equal("b");
  });
});