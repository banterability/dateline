assert = require 'assertive'
Dateline = require '../lib'
timekeeper = require 'timekeeper'

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
