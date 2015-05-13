assert = require 'assertive'
Dateline = require '../lib/dateline'
timekeeper = require 'timekeeper'

testNativeMethod = (methodName) ->
  dateObj = new Date()
  datelineObj = Dateline dateObj

  it "calls through to native #{methodName} method", ->
    assert.equal dateObj[methodName](), datelineObj[methodName]()

describe 'Dateline', ->
  before ->
    timekeeper.freeze(new Date(2013, 1, 1))

  after ->
    timekeeper.reset()

  describe 'constructor', ->
    it 'accepts a passed date object', ->
      expected = new Date(2014, 7, 28, 22, 5)
      actual = Dateline(expected)
      assert.equal expected.toDateString(), actual.toDateString()

    it 'defaults to the current date', ->
      expected = new Date()
      assert.equal expected.toDateString(), Dateline().toDateString()

  describe 'native methods', ->
    before ->
      @dl = Dateline()

    nativeMethods = [
      'getDate'
      'getDay'
      'getFullYear'
      'getHours'
      'getMilliseconds'
      'getMinutes'
      'getMonth'
      'getSeconds'
      'getTime'
      'getTimezoneOffset'
      'getUTCDate'
      'getUTCDay'
      'getUTCFullYear'
      'getUTCHours'
      'getUTCMilliseconds'
      'getUTCMinutes'
      'getUTCMonth'
      'getUTCSeconds'
      'getYear'
    ]

    for method in nativeMethods
      testNativeMethod(method)
