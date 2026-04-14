import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  vi,
} from "vitest";

import Dateline from "../dateline.js";

describe("#getAPTime", function () {
  describe("formats times according to AP style", function () {
    it("handles single digit hour in the morning", function () {
      let actual = Dateline(new Date(2013, 3, 1, 2, 4));
      expect(actual.getAPTime()).toBe("2:04 a.m.");
    });

    it("handles two-digit hour in the morning", function () {
      let actual = Dateline(new Date(2013, 3, 1, 10, 4));
      expect(actual.getAPTime()).toBe("10:04 a.m.");
    });

    it("handles single-digit hour in the afternoon", function () {
      let actual = Dateline(new Date(2013, 3, 1, 14, 4));
      expect(actual.getAPTime()).toBe("2:04 p.m.");
    });

    it("handles two-digit hour in the afternoon", function () {
      let actual = Dateline(new Date(2013, 3, 1, 22, 4));
      expect(actual.getAPTime()).toBe("10:04 p.m.");
    });
  });

  describe("special cases", function () {
    describe("top of the hour", function () {
      beforeAll(function () {
        vi.spyOn(console, "warn").mockImplementation(function () {});
      });

      afterAll(function () {
        vi.restoreAllMocks();
      });

      it("does not show minutes at the top of the hour by default", function () {
        let datelineObj = Dateline(new Date(2013, 7, 7, 14, 0));
        expect(datelineObj.getAPTime()).toBe("2 p.m.");
      });

      it("shows minutes at the top of the hour when includeMinutes is passed", function () {
        let datelineObj = Dateline(new Date(2013, 7, 7, 14, 0));
        expect(datelineObj.getAPTime({includeMinutes: true})).toBe("2:00 p.m.");
      });
    });

    describe("special hours", function () {
      it('returns "midnight" for 12:00 a.m.', function () {
        let actual = Dateline(new Date(2013, 0, 1, 0, 0)).getAPTime();
        expect(actual).toBe("midnight");
      });

      it('returns "noon" for 12:00 p.m.', function () {
        let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime();
        expect(actual).toBe("noon");
      });
    });

    describe('"includeMinutesAtTopOfHour" option', function () {
      describe("at the top of the hour", function () {
        it("suppresses minutes when the option is missing", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 0)).getAPTime();
          expect(actual).toBe("7 a.m.");
        });

        it("renders minutes when the option is true", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 0)).getAPTime({
            includeMinutesAtTopOfHour: true,
          });
          expect(actual).toBe("7:00 a.m.");
        });

        it("suppresses minutes when the option is false", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 0)).getAPTime({
            includeMinutesAtTopOfHour: false,
          });
          expect(actual).toBe("7 a.m.");
        });
      });

      describe("mid-hour", function () {
        it("renders minutes when the option is missing", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime();
          expect(actual).toBe("7:01 a.m.");
        });

        it("renders minutes when the option is true", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime({
            includeMinutesAtTopOfHour: true,
          });
          expect(actual).toBe("7:01 a.m.");
        });

        it("renders minutes when the option is false", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime({
            includeMinutesAtTopOfHour: false,
          });
          expect(actual).toBe("7:01 a.m.");
        });
      });

      describe("at noon", function () {
        it('returns "noon" when the option is missing', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime();
          expect(actual).toBe("noon");
        });

        it('returns "noon" when the option is true', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime({
            includeMinutesAtTopOfHour: true,
          });
          expect(actual).toBe("noon");
        });

        it('returns "noon" when the option is false', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime({
            includeMinutesAtTopOfHour: false,
          });
          expect(actual).toBe("noon");
        });
      });
    });

    describe('"suppressAmPm" option', function () {
      describe("mid-hour", function () {
        it("renders the meridiem when the option is missing", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime();
          expect(actual).toBe("7:01 a.m.");
        });

        it("drops the meridiem when the option is true", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime({
            suppressAmPm: true,
          });
          expect(actual).toBe("7:01");
        });

        it("renders the meridiem when the option is false", function () {
          let actual = Dateline(new Date(2013, 7, 7, 7, 1)).getAPTime({
            suppressAmPm: false,
          });
          expect(actual).toBe("7:01 a.m.");
        });
      });

      describe("at noon", function () {
        it('returns "noon" when the option is missing', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime();
          expect(actual).toBe("noon");
        });

        it('returns "noon" when the option is true', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime({
            suppressAmPm: true,
          });
          expect(actual).toBe("noon");
        });

        it('returns "noon" when the option is false', function () {
          let actual = Dateline(new Date(2013, 0, 1, 12, 0)).getAPTime({
            suppressAmPm: false,
          });
          expect(actual).toBe("noon");
        });
      });
    });

    describe('"includeMinutes" deprecation warning', function () {
      let warnSpy;

      beforeEach(function () {
        warnSpy = vi.spyOn(console, "warn").mockImplementation(function () {});
      });

      afterEach(function () {
        warnSpy.mockRestore();
      });

      it("warns when the deprecated option is passed", function () {
        Dateline(new Date(2013, 7, 7, 14, 0)).getAPTime({includeMinutes: true});
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy.mock.calls[0][0]).toContain("includeMinutes");
        expect(warnSpy.mock.calls[0][0]).toContain("includeMinutesAtTopOfHour");
      });

      it("warns on every call", function () {
        let d = Dateline(new Date(2013, 7, 7, 14, 0));
        d.getAPTime({includeMinutes: true});
        d.getAPTime({includeMinutes: true});
        d.getAPTime({includeMinutes: true});
        expect(warnSpy).toHaveBeenCalledTimes(3);
      });

      it("does not warn when the option is not passed", function () {
        Dateline(new Date(2013, 7, 7, 14, 0)).getAPTime();
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it("does not warn when the replacement option is used", function () {
        Dateline(new Date(2013, 7, 7, 14, 0)).getAPTime({
          includeMinutesAtTopOfHour: true,
        });
        expect(warnSpy).not.toHaveBeenCalled();
      });
    });
  });
});
