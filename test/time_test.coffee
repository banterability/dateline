assert = require 'assertive'
Dateline = require '../lib'
timekeeper = require 'timekeeper'

describe 'getAPTime', ->
  before ->
    timekeeper.freeze(new Date(2013, 1, 1))

  after ->
    timekeeper.reset()

  it 'formats times according to AP style', ->
    actual1 = Dateline new Date(2013, 3, 1, 2, 4)
    actual2 = Dateline new Date(2013, 3, 1, 10, 4)
    actual3 = Dateline new Date(2013, 3, 1, 14, 4)
    actual4 = Dateline new Date(2013, 3, 1, 22, 4)
    assert.equal '2:04 a.m.', actual1.getAPTime()
    assert.equal '10:04 a.m.', actual2.getAPTime()
    assert.equal '2:04 p.m.', actual3.getAPTime()
    assert.equal '10:04 p.m.', actual4.getAPTime()

  it 'adds periods to times of day', ->
    actual1 = Dateline new Date(2013, 1, 1, 11, 11)
    actual2 = Dateline new Date(2013, 1, 1, 23, 11)
    assert.equal '11:11 a.m.', actual1.getAPTime()
    assert.equal '11:11 p.m.', actual2.getAPTime()

  describe 'special cases', ->
    it 'does not show minutes at the top of the hour', ->
      actual = Dateline new Date(2013, 7, 7, 14, 0)
      assert.equal '2 p.m.', actual.getAPTime()

    it 'returns "midnight" for 12:00 a.m.', ->
      actual = Dateline new Date(2013,0,1,0,0)
      assert.equal 'midnight', actual.getAPTime()

    it 'returns "noon" for 12:00 p.m.', ->
      actual = Dateline new Date(2013,0,1,12,0)
      assert.equal 'noon', actual.getAPTime()
