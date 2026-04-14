import {describe, it, expect, beforeAll, afterAll, vi} from "vitest";

import Dateline from "../dateline.js";

let TEST_MONTHS = [
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
    let actual = Dateline(new Date(2012, monthNumber, 1)).getAPDate();
    expect(actual).toBe(monthAbbreviation + " 1, 2012");
  });
}

describe("#getAPDate", function () {
  beforeAll(function () {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2013, 0, 2));
  });

  afterAll(function () {
    vi.useRealTimers();
  });

  describe("formats months according to AP style", function () {
    TEST_MONTHS.forEach(function (abbreviation, index) {
      testMonth(index, abbreviation);
    });
  });

  describe("formats years according to AP style", function () {
    describe("shows all but the current year by default", function () {
      it("shows year for past years", function () {
        let actual = Dateline(new Date(2012, 11, 31)).getAPDate();
        expect(actual).toBe("Dec. 31, 2012");
      });

      it("hides year for the current year", function () {
        let actual = Dateline(new Date(2013, 11, 31)).getAPDate();
        expect(actual).toBe("Dec. 31");
      });

      it("shows year for future years", function () {
        let actual = Dateline(new Date(2014, 11, 31)).getAPDate();
        expect(actual).toBe("Dec. 31, 2014");
      });
    });

    describe('always show the year when "includeYear" is true', function () {
      it("shows year for past years", function () {
        let actual = Dateline(new Date(2012, 11, 31)).getAPDate({
          includeYear: true,
        });
        expect(actual).toBe("Dec. 31, 2012");
      });

      it("shows year for the current year", function () {
        let actual = Dateline(new Date(2013, 11, 31)).getAPDate({
          includeYear: true,
        });
        expect(actual).toBe("Dec. 31, 2013");
      });

      it("shows year for future years", function () {
        let actual = Dateline(new Date(2014, 11, 31)).getAPDate({
          includeYear: true,
        });
        expect(actual).toBe("Dec. 31, 2014");
      });
    });

    describe('always hide the year when "includeYear" is false', function () {
      it("hides year for past years", function () {
        let actual = Dateline(new Date(2012, 11, 31)).getAPDate({
          includeYear: false,
        });
        expect(actual).toBe("Dec. 31");
      });

      it("hides year for the current year", function () {
        let actual = Dateline(new Date(2013, 11, 31)).getAPDate({
          includeYear: false,
        });
        expect(actual).toBe("Dec. 31");
      });

      it("hides year for future years", function () {
        let actual = Dateline(new Date(2014, 11, 31)).getAPDate({
          includeYear: false,
        });
        expect(actual).toBe("Dec. 31");
      });
    });
  });

  describe("special cases", function () {
    describe("dates in the last seven days", function () {
      describe("uses month and day by default", function () {
        it("shows the date one day ago", function () {
          let actual = Dateline(new Date(2013, 0, 1)).getAPDate();
          expect(actual).toBe("Jan. 1");
        });

        it("shows the date two days ago", function () {
          let actual = Dateline(new Date(2012, 11, 31)).getAPDate();
          expect(actual).toBe("Dec. 31, 2012");
        });

        it("shows the date three days ago", function () {
          let actual = Dateline(new Date(2012, 11, 30)).getAPDate();
          expect(actual).toBe("Dec. 30, 2012");
        });

        it("shows the date four days ago", function () {
          let actual = Dateline(new Date(2012, 11, 29)).getAPDate();
          expect(actual).toBe("Dec. 29, 2012");
        });

        it("shows the date five days ago", function () {
          let actual = Dateline(new Date(2012, 11, 28)).getAPDate();
          expect(actual).toBe("Dec. 28, 2012");
        });

        it("shows the date six days ago", function () {
          let actual = Dateline(new Date(2012, 11, 27)).getAPDate();
          expect(actual).toBe("Dec. 27, 2012");
        });

        it("shows the date seven days ago", function () {
          let actual = Dateline(new Date(2012, 11, 26)).getAPDate();
          expect(actual).toBe("Dec. 26, 2012");
        });
      });
    });

    describe("dates within a week in either direction", function () {
      describe('when "useDayNameWithinWeek" is true', function () {
        it("shows the day of the week for one day ago", function () {
          let actual = Dateline(new Date(2013, 0, 1)).getAPDate({
            useDayNameWithinWeek: true,
          });
          expect(actual).toBe("Tuesday");
        });

        it("shows the day of the week for today", function () {
          let actual = Dateline(new Date(2013, 0, 2)).getAPDate({
            useDayNameWithinWeek: true,
          });
          expect(actual).toBe("Wednesday");
        });

        it("shows the day of the week for one day ahead", function () {
          let actual = Dateline(new Date(2013, 0, 3)).getAPDate({
            useDayNameWithinWeek: true,
          });
          expect(actual).toBe("Thursday");
        });

        it("falls back to the date exactly seven days ago", function () {
          let actual = Dateline(new Date(2012, 11, 26)).getAPDate({
            useDayNameWithinWeek: true,
          });
          expect(actual).toBe("Dec. 26, 2012");
        });

        it("falls back to the date exactly seven days ahead", function () {
          let actual = Dateline(new Date(2013, 0, 9)).getAPDate({
            useDayNameWithinWeek: true,
          });
          expect(actual).toBe("Jan. 9");
        });
      });

      describe('when "useDayNameWithinWeek" is false', function () {
        it("renders the date one day ago", function () {
          let actual = Dateline(new Date(2013, 0, 1)).getAPDate({
            useDayNameWithinWeek: false,
          });
          expect(actual).toBe("Jan. 1");
        });

        it("renders the date today", function () {
          let actual = Dateline(new Date(2013, 0, 2)).getAPDate({
            useDayNameWithinWeek: false,
          });
          expect(actual).toBe("Jan. 2");
        });

        it("renders the date one day ahead", function () {
          let actual = Dateline(new Date(2013, 0, 3)).getAPDate({
            useDayNameWithinWeek: false,
          });
          expect(actual).toBe("Jan. 3");
        });

        it("renders the date exactly seven days ago", function () {
          let actual = Dateline(new Date(2012, 11, 26)).getAPDate({
            useDayNameWithinWeek: false,
          });
          expect(actual).toBe("Dec. 26, 2012");
        });

        it("renders the date exactly seven days ahead", function () {
          let actual = Dateline(new Date(2013, 0, 9)).getAPDate({
            useDayNameWithinWeek: false,
          });
          expect(actual).toBe("Jan. 9");
        });
      });
    });
  });
});
