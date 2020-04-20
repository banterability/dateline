var assert = require("assertive");
var timekeeper = require("timekeeper");

var Dateline = require("../dateline");

describe("README", function () {
  before(function () {
    this.newYears = Dateline(new Date(2014, 0, 1, 0, 0));
    this.moonWalk = Dateline(new Date(-14159040000));
  });

  describe("Usage", function () {
    it("accepts a date by components", function () {
      var expected = new Date(2014, 0, 1, 0, 0).toDateString();
      var actual = this.newYears.toDateString();
      assert.equal(expected, actual);
    });

    it("accepts a date in any valid format", function () {
      var expected = new Date(-14159040000).toDateString();
      var actual = this.moonWalk.toDateString();
      assert.equal(expected, actual);
    });

    it("defaults to the current date/time", function () {
      timekeeper.freeze();

      var expected = new Date().toDateString();
      var actual = Dateline().toDateString();
      assert.equal(expected, actual);

      timekeeper.reset();
    });

    it("calls through to native methods", function () {
      assert.equal(1969, this.moonWalk.getFullYear());
    });

    describe("#getAPTime", function () {
      it("special-cases midnight", function () {
        assert.equal("midnight", this.newYears.getAPTime());
      });

      it("returns an AP-formatted time", function () {
        assert.equal("9:56 p.m.", this.moonWalk.getAPTime());
      });

      describe('"includeMinutes" option', function () {
        before(function () {
          timekeeper.freeze(new Date(2016, 3, 20, 11, 0));
        });

        after(function () {
          timekeeper.reset();
        });

        it("omits minutes at the top of the hour", function () {
          assert.equal("11 a.m.", Dateline().getAPTime());
        });

        it("incldues minutes at the top of the hour if option is passed", function () {
          assert.equal(
            "11:00 a.m.",
            Dateline().getAPTime({includeMinutes: true})
          );
        });
      });
    });

    describe("#getAPDate", function () {
      it("special-cases dates within the current year", function () {
        timekeeper.freeze(new Date(2014, 3, 29));
        assert.equal("Jan. 1", this.newYears.getAPDate());
        timekeeper.reset();
      });

      it("returns an AP-formatted date", function () {
        assert.equal("July 20, 1969", this.moonWalk.getAPDate());
      });

      describe('"includeYear" option', function () {
        before(function () {
          timekeeper.freeze(new Date(2014, 7, 28));
        });

        after(function () {
          timekeeper.reset();
        });

        it("omits the year for dates in the current year", function () {
          assert.equal("Aug. 28", Dateline().getAPDate());
        });

        it("includes the year for dates in the current year if option is passed", function () {
          assert.equal(
            "Aug. 28, 2014",
            Dateline().getAPDate({includeYear: true})
          );
        });
      });

      describe('"useDayNameForLastWeek" option', function () {
        before(function () {
          timekeeper.freeze(new Date(2009, 5, 22));
          this.myDate = new Date(2009, 5, 20);
        });

        after(function () {
          timekeeper.reset();
        });

        it("omits the year for dates in the current year", function () {
          assert.equal("June 20", Dateline(this.myDate).getAPDate());
        });

        it("includes the year for dates in the current year if option is passed", function () {
          assert.equal(
            "Saturday",
            Dateline(this.myDate).getAPDate({useDayNameForLastWeek: true})
          );
        });
      });
    });
  });
});
