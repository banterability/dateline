import {formatHours, formatMinutes, showMinutes} from "./time";

describe("time helpers", () => {
  describe("formatHours", () => {
    test('returns "12" when 0', () => {
      expect(formatHours(0)).toBe("12");
    });
    test("returns pm when > 12", () => {
      expect(formatHours(13)).toBe("1");
      expect(formatHours(23)).toBe("11");
    });
    test("returns string", () => {
      expect(formatHours(1)).toBe("1");
      expect(formatHours(12)).toBe("12");
    });
  });

  describe("formatMinutes", () => {
    test("returns zero-padding string when < 10", () => {
      expect(formatMinutes(0)).toBe("00");
      expect(formatMinutes(9)).toBe("09");
    });
    test("returns string when >= 10", () => {
      expect(formatMinutes(10)).toBe("10");
      expect(formatMinutes(59)).toBe("59");
    });
  });

  describe("showMinutes", () => {
    describe('when "alwaysIncludeMinutes" is undefined', () => {
      test("returns true at top of hour", () => {
        expect(showMinutes(0)).toBe(true);
      });
      test("returns false at all other times", () => {
        expect(showMinutes(1)).toBe(false);
        expect(showMinutes(59)).toBe(false);
      });
    });
    describe('when "alwaysIncludeMinutes" is false', () => {
      test("returns true at top of hour", () => {
        expect(showMinutes(0, {alwaysIncludeMinutes: false})).toBe(true);
      });
      test("returns false at all other times", () => {
        expect(showMinutes(1, {alwaysIncludeMinutes: false})).toBe(false);
        expect(showMinutes(59, {alwaysIncludeMinutes: false})).toBe(false);
      });
    });
    describe('when "alwaysIncludeMinutes" is true', () => {
      test("returns true at all times", () => {
        expect(showMinutes(0, {alwaysIncludeMinutes: true})).toBe(true);
        expect(showMinutes(1, {alwaysIncludeMinutes: true})).toBe(true);
        expect(showMinutes(59, {alwaysIncludeMinutes: true})).toBe(true);
      });
    });
  });
});
