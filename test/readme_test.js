import {describe, it, expect, beforeAll, afterAll, vi} from "vitest";

import Dateline from "../dateline.js";

describe("README", function () {
  var newYears, moonWalk;

  beforeAll(function () {
    newYears = Dateline(new Date(2014, 0, 1, 0, 0));
    moonWalk = Dateline(new Date(-14159040000));
  });

  describe("Usage", function () {
    it("accepts a date by components", function () {
      var expected = new Date(2014, 0, 1, 0, 0).toDateString();
      var actual = newYears.toDateString();
      expect(actual).toBe(expected);
    });

    it("accepts a date in any valid format", function () {
      var expected = new Date(-14159040000).toDateString();
      var actual = moonWalk.toDateString();
      expect(actual).toBe(expected);
    });

    it("defaults to the current date/time", function () {
      vi.useFakeTimers();

      var expected = new Date().toDateString();
      var actual = Dateline().toDateString();
      expect(actual).toBe(expected);

      vi.useRealTimers();
    });

    it("calls through to native methods", function () {
      expect(moonWalk.getFullYear()).toBe(1969);
    });

    describe("#getAPTime", function () {
      it("special-cases midnight", function () {
        expect(newYears.getAPTime()).toBe("midnight");
      });

      it("returns an AP-formatted time", function () {
        expect(moonWalk.getAPTime()).toBe("9:56 p.m.");
      });

      describe('"includeMinutes" option', function () {
        beforeAll(function () {
          vi.useFakeTimers();
          vi.setSystemTime(new Date(2016, 3, 20, 11, 0));
        });

        afterAll(function () {
          vi.useRealTimers();
        });

        it("omits minutes at the top of the hour", function () {
          expect(Dateline().getAPTime()).toBe("11 a.m.");
        });

        it("includes minutes at the top of the hour if option is passed", function () {
          expect(Dateline().getAPTime({includeMinutes: true})).toBe(
            "11:00 a.m.",
          );
        });
      });
    });

    describe("#getAPDate", function () {
      it("special-cases dates within the current year", function () {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2014, 3, 29));
        expect(newYears.getAPDate()).toBe("Jan. 1");
        vi.useRealTimers();
      });

      it("returns an AP-formatted date", function () {
        expect(moonWalk.getAPDate()).toBe("July 20, 1969");
      });

      describe('"includeYear" option', function () {
        beforeAll(function () {
          vi.useFakeTimers();
          vi.setSystemTime(new Date(2014, 7, 28));
        });

        afterAll(function () {
          vi.useRealTimers();
        });

        it("omits the year for dates in the current year", function () {
          expect(Dateline().getAPDate()).toBe("Aug. 28");
        });

        it("includes the year for dates in the current year if option is passed", function () {
          expect(Dateline().getAPDate({includeYear: true})).toBe(
            "Aug. 28, 2014",
          );
        });
      });

      describe('"useDayNameForLastWeek" option', function () {
        var myDate;

        beforeAll(function () {
          vi.useFakeTimers();
          vi.setSystemTime(new Date(2009, 5, 22));
          myDate = new Date(2009, 5, 20);
        });

        afterAll(function () {
          vi.useRealTimers();
        });

        it("omits the year for dates in the current year", function () {
          expect(Dateline(myDate).getAPDate()).toBe("June 20");
        });

        it("includes the year for dates in the current year if option is passed", function () {
          expect(Dateline(myDate).getAPDate({useDayNameForLastWeek: true})).toBe(
            "Saturday",
          );
        });
      });
    });
  });
});
