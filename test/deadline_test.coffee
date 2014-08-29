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

  describe 'getAPTime', ->
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

  describe 'getAPDate', ->
    it 'formats dates according to AP style', ->
      actual1 = Dateline new Date(1992, 0, 15)
      actual2 = Dateline new Date(2005, 11, 31)
      actual3 = Dateline new Date(2009, 6, 25)
      actual4 = Dateline new Date(2013, 7, 9)
      assert.equal 'Jan. 15, 1992', actual1.getAPDate()
      assert.equal 'Dec. 31, 2005', actual2.getAPDate()
      assert.equal 'July 25, 2009', actual3.getAPDate()
      assert.equal 'Aug. 9', actual4.getAPDate()

    describe 'special cases', ->
      describe 'years', ->
        it 'shows years in the future by default', ->
          actual = Dateline new Date(2014, 11, 31)
          assert.equal 'Dec. 31, 2014', actual.getAPDate()

        it 'shows years in the past by default', ->
          actual = Dateline new Date(2012, 11, 31)
          assert.equal 'Dec. 31, 2012', actual.getAPDate()

        it 'hides the current year by default', ->
          actual = Dateline new Date(2013, 11, 31)
          assert.equal 'Dec. 31', actual.getAPDate()

        it 'shows the current year if option passed', ->
          actual = Dateline new Date(2013, 11, 31)
          assert.equal 'Dec. 31, 2013', actual.getAPDate({includeYear: true})

    describe 'abbreviating months', ->
      it 'handles January', ->
        actual = Dateline new Date(2012, 0, 1)
        assert.equal 'Jan. 1, 2012', actual.getAPDate()

      it 'handles February', ->
        actual = Dateline new Date(2012, 1, 1)
        assert.equal 'Feb. 1, 2012', actual.getAPDate()

      it 'handles March', ->
        actual = Dateline new Date(2012, 2, 1)
        assert.equal 'March 1, 2012', actual.getAPDate()

      it 'handles April', ->
        actual = Dateline new Date(2012, 3, 1)
        assert.equal 'April 1, 2012', actual.getAPDate()

      it 'handles May', ->
        actual = Dateline new Date(2012, 4, 1)
        assert.equal 'May 1, 2012', actual.getAPDate()

      it 'handles June', ->
        actual = Dateline new Date(2012, 5, 1)
        assert.equal 'June 1, 2012', actual.getAPDate()

      it 'handles July', ->
        actual = Dateline new Date(2012, 6, 1)
        assert.equal 'July 1, 2012', actual.getAPDate()

      it 'handles August', ->
        actual = Dateline new Date(2012, 7, 1)
        assert.equal 'Aug. 1, 2012', actual.getAPDate()

      it 'handles September', ->
        actual = Dateline new Date(2012, 8, 1)
        assert.equal 'Sept. 1, 2012', actual.getAPDate()

      it 'handles October', ->
        actual = Dateline new Date(2012, 9, 1)
        assert.equal 'Oct. 1, 2012', actual.getAPDate()

      it 'handles November', ->
        actual = Dateline new Date(2012, 10, 1)
        assert.equal 'Nov. 1, 2012', actual.getAPDate()

      it 'handles December', ->
        actual = Dateline new Date(2012, 11, 1)
        assert.equal 'Dec. 1, 2012', actual.getAPDate()
