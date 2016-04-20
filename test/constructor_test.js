var assert = require('assertive');
var timekeeper = require('timekeeper');

var Dateline = require('../dateline');

var NATIVE_METHODS = [
  'getDate',
  'getDay',
  'getFullYear',
  'getHours',
  'getMilliseconds',
  'getMinutes',
  'getMonth',
  'getSeconds',
  'getTime',
  'getTimezoneOffset',
  'getUTCDate',
  'getUTCDay',
  'getUTCFullYear',
  'getUTCHours',
  'getUTCMilliseconds',
  'getUTCMinutes',
  'getUTCMonth',
  'getUTCSeconds',
  'getYear'
]

function testNativeMethod(methodName){
  var dateObj = new Date();
  var datelineObj = Dateline(dateObj);

  it('calls through to native #' + methodName, function(){
    assert.equal(dateObj[methodName](), datelineObj[methodName]());
  });
}

describe('constructor', function(){
  before(function(){
    timekeeper.freeze(new Date(2013, 1, 1));
  });

  after(function(){
    timekeeper.reset();
  });

  describe('initialization', function(){
    it('accepts a passed date object', function(){
      var expected = new Date(2014, 7, 28, 22, 5);
      var actual = Dateline(expected);
      assert.equal(expected.toDateString(), actual.toDateString());
    });

    it('defaults to the current date', function(){
      var expected = new Date();
      var actual = Dateline();
      assert.equal(expected.toDateString(), actual.toDateString());
    });
  });

  describe('native methods', function(){
    before(function(){
      this.datelineObj = Dateline();
    });

    NATIVE_METHODS.forEach(function(method){
      testNativeMethod(method);
    });
  });
});
