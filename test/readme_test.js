import {describe, it, expect, beforeAll, afterAll, vi} from "vitest";

import Dateline from "../dateline.js";

describe("README", function () {
  let newYears, moonWalk;

  beforeAll(function () {
    newYears = Dateline(new Date(2014, 0, 1, 0, 0));
    moonWalk = Dateline(new Date(-14159040000));
  });

  describe("Usage", function () {
    it("accepts a date by components", function () {
      let expected = new Date(2014, 0, 1, 0, 0).toDateString();
      let actual = newYears.toDateString();
      expect(actual).toBe(expected);
    });

    it("accepts a date in any valid format", function () {
      let expected = new Date(-14159040000).toDateString();
      let actual = moonWalk.toDateString();
      expect(actual).toBe(expected);
    });

    it("defaults to the current date/time", function () {
      vi.useFakeTimers();

      let expected = new Date().toDateString();
      let actual = Dateline().toDateString();
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

      describe('"includeMinutesAtTopOfHour" option', function () {
        beforeAll(function () {
          vi.useFakeTimers();
          vi.setSystemTime(new Date(2016, 3, 20, 11, 0));
        });

        afterAll(function () {
          vi.useRealTimers();
        });

        it("omits minutes at the top of the hour by default", function () {
          expect(Dateline().getAPTime()).toBe("11 a.m.");
        });

        it("renders minutes at the top of the hour if option is passed", function () {
          expect(Dateline().getAPTime({includeMinutesAtTopOfHour: true})).toBe(
            "11:00 a.m.",
          );
        });
      });

      describe('"suppressAmPm" option', function () {
        it("drops the meridiem when composing a range", function () {
          let start = Dateline(new Date(2013, 7, 7, 19, 0));
          let end = Dateline(new Date(2013, 7, 7, 20, 0));
          expect(
            start.getAPTime({suppressAmPm: true}) + "-" + end.getAPTime(),
          ).toBe("7-8 p.m.");
        });

        it("drops the meridiem mid-hour", function () {
          expect(
            Dateline(new Date(2013, 7, 7, 19, 1)).getAPTime({
              suppressAmPm: true,
            }),
          ).toBe("7:01");
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

        it("includes the year for dates outside the current year", function () {
          expect(Dateline(new Date(2012, 7, 28)).getAPDate()).toBe(
            "Aug. 28, 2012",
          );
        });

        it("omits the year for dates outside the current year if option is passed", function () {
          expect(
            Dateline(new Date(2012, 7, 28)).getAPDate({includeYear: false}),
          ).toBe("Aug. 28");
        });
      });

      describe('"useDayNameWithinWeek" option', function () {
        beforeAll(function () {
          vi.useFakeTimers();
          vi.setSystemTime(new Date(2009, 5, 22));
        });

        afterAll(function () {
          vi.useRealTimers();
        });

        it("uses the day name for yesterday", function () {
          expect(
            Dateline(new Date(2009, 5, 21)).getAPDate({
              useDayNameWithinWeek: true,
            }),
          ).toBe("Sunday");
        });

        it("uses the day name for today", function () {
          expect(
            Dateline(new Date(2009, 5, 22)).getAPDate({
              useDayNameWithinWeek: true,
            }),
          ).toBe("Monday");
        });

        it("uses the day name for tomorrow", function () {
          expect(
            Dateline(new Date(2009, 5, 23)).getAPDate({
              useDayNameWithinWeek: true,
            }),
          ).toBe("Tuesday");
        });

        it("falls back to the formatted date outside the week window", function () {
          expect(
            Dateline(new Date(2009, 5, 29)).getAPDate({
              useDayNameWithinWeek: true,
            }),
          ).toBe("June 29");
        });
      });
    });
  });
});
