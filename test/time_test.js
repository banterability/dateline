var assert = require("assertive");

var Dateline = require("../dateline");

describe("#getAPTime", function () {
  describe("formats times according to AP style", function () {
    it("handles single digit hour in the morning", function () {
      var actual = Dateline(new Date(2013, 3, 1, 2, 4));
      assert.equal("2:04 a.m.", actual.getAPTime());
    });

    it("handles two-digit hour in the morning", function () {
      var actual = Dateline(new Date(2013, 3, 1, 10, 4));
      assert.equal("10:04 a.m.", actual.getAPTime());
    });

    it("handles single-digit hour in the afternoon", function () {
      var actual = Dateline(new Date(2013, 3, 1, 14, 4));
      assert.equal("2:04 p.m.", actual.getAPTime());
    });

    it("handles two-digit hour in the afternoon", function () {
      var actual = Dateline(new Date(2013, 3, 1, 22, 4));
      assert.equal("10:04 p.m.", actual.getAPTime());
    });
  });

  describe("special cases", function () {
    describe("top of the hour", function () {
      before(function () {
        this.datelineObj = Dateline(new Date(2013, 7, 7, 14, 0));
      });

      it("does not show minutes at the top of the hour by default", function () {
        var actual = this.datelineObj.getAPTime();
        assert.equal("2 p.m.", actual);
      });

      it("does not show minutes at the top of the hour by default", function () {
        var actual = this.datelineObj.getAPTime({includeMinutes: true});
        assert.equal("2:00 p.m.", actual);
      });
    });

    describe("special hours", function () {
      it('returns "midnight" for 12:00 a.m.', function () {
        var actual = Dateline(new Date(2013, 0, 1, 0, 0)).getAPTime();
        assert.equal("midnight", actual);
      });

      it('returns "noon" for 12:00 p.m.', function () {
        var actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime();
        assert.equal("noon", actual);
      });
    });
  });
});
