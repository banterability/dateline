var assert = require("assertive");
var timekeeper = require("timekeeper");

var Dateline = require("../dateline");

TEST_MONTHS = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

function testMonth(monthNumber, monthAbbreviation) {
  it("maps month " + monthNumber + " to " + monthAbbreviation, function () {
    var actual = Dateline(new Date(2012, monthNumber, 1)).getAPDate();
    assert.equal(monthAbbreviation + " 1, 2012", actual);
  });
}

describe("#getAPDate", function () {
  before(function () {
    timekeeper.freeze(new Date(2013, 0, 2));
  });

  after(function () {
    timekeeper.reset();
  });

  describe("formats months according to AP style", function () {
    TEST_MONTHS.forEach(function (abbreviation, index) {
      testMonth(index, abbreviation);
    });
  });

  describe("formats years according to AP style", function () {
    describe("shows all but the current year by default", function () {
      it("shows year for past years", function () {
        var actual = Dateline(new Date(2012, 11, 31)).getAPDate();
        assert.equal("Dec. 31, 2012", actual);
      });

      it("hides year for the current year", function () {
        var actual = Dateline(new Date(2013, 11, 31)).getAPDate();
        assert.equal("Dec. 31", actual);
      });

      it("shows year for future years", function () {
        var actual = Dateline(new Date(2014, 11, 31)).getAPDate();
        assert.equal("Dec. 31, 2014", actual);
      });
    });

    describe('always show the year when "includeYear" option is passed', function () {
      it("shows year for past years", function () {
        var actual = Dateline(new Date(2012, 11, 31)).getAPDate({
          includeYear: true,
        });
        assert.equal("Dec. 31, 2012", actual);
      });

      it("shows year for the current year", function () {
        var actual = Dateline(new Date(2013, 11, 31)).getAPDate({
          includeYear: true,
        });
        assert.equal("Dec. 31, 2013", actual);
      });

      it("shows year for future years", function () {
        var actual = Dateline(new Date(2014, 11, 31)).getAPDate({
          includeYear: true,
        });
        assert.equal("Dec. 31, 2014", actual);
      });
    });
  });

  describe("special cases", function () {
    describe("dates in the last seven days", function () {
      describe("uses month and day by default", function () {
        it("shows the date one day ago", function () {
          var actual = Dateline(new Date(2013, 0, 1)).getAPDate();
          assert.equal("Jan. 1", actual);
        });

        it("shows the date two days ago", function () {
          var actual = Dateline(new Date(2012, 11, 31)).getAPDate();
          assert.equal("Dec. 31, 2012", actual);
        });

        it("shows the date three days ago", function () {
          var actual = Dateline(new Date(2012, 11, 30)).getAPDate();
          assert.equal("Dec. 30, 2012", actual);
        });

        it("shows the date four days ago", function () {
          var actual = Dateline(new Date(2012, 11, 29)).getAPDate();
          assert.equal("Dec. 29, 2012", actual);
        });

        it("shows the date five days ago", function () {
          var actual = Dateline(new Date(2012, 11, 28)).getAPDate();
          assert.equal("Dec. 28, 2012", actual);
        });

        it("shows the date six days ago", function () {
          var actual = Dateline(new Date(2012, 11, 27)).getAPDate();
          assert.equal("Dec. 27, 2012", actual);
        });

        it("shows the date seven days ago", function () {
          var actual = Dateline(new Date(2012, 11, 26)).getAPDate();
          assert.equal("Dec. 26, 2012", actual);
        });
      });

      describe('when "useDayNameForLastWeek" option is passed', function () {
        it("shows the day of the week for one day ago", function () {
          var actual = Dateline(new Date(2013, 0, 1)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Tuesday", actual);
        });

        it("shows the day of the week for two days ago", function () {
          var actual = Dateline(new Date(2012, 11, 31)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Monday", actual);
        });

        it("shows the day of the week for three days ago", function () {
          var actual = Dateline(new Date(2012, 11, 30)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Sunday", actual);
        });

        it("shows the day of the week for four days ago", function () {
          var actual = Dateline(new Date(2012, 11, 29)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Saturday", actual);
        });

        it("shows the day of the week for five days ago", function () {
          var actual = Dateline(new Date(2012, 11, 28)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Friday", actual);
        });

        it("shows the day of the week for six days ago", function () {
          var actual = Dateline(new Date(2012, 11, 27)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Thursday", actual);
        });

        it("shows the date seven days ago", function () {
          var actual = Dateline(new Date(2012, 11, 26)).getAPDate({
            useDayNameForLastWeek: true,
          });
          assert.equal("Dec. 26, 2012", actual);
        });
      });
    });
  });
});
