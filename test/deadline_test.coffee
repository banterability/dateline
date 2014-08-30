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

  describe 'native methods', ->
    before ->
      @dl = new Dateline()

    it 'passes through to native getDate', ->
      assert.equal new Date().getDate(), @dl.getDate()

    it 'passes through to native getDay', ->
      assert.equal new Date().getDay(), @dl.getDay()

    it 'passes through to native getFullYear', ->
      assert.equal new Date().getFullYear(), @dl.getFullYear()

    it 'passes through to native getHours', ->
      assert.equal new Date().getHours(), @dl.getHours()

    it 'passes through to native getMinutes', ->
      assert.equal new Date().getMinutes(), @dl.getMinutes()

    it 'passes through to native getMonth', ->
      assert.equal new Date().getMonth(), @dl.getMonth()

    it 'passes through to native getYear', ->
      assert.equal new Date().getYear(), @dl.getYear()
